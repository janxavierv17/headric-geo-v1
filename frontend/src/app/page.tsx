"use client";

import { useEffect, useRef } from "react";
import mapboxgl, { Map as MapboxMap, Marker } from "mapbox-gl";
import { useAddressesQuery } from "../../features/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { currentProximity } from "../../features/address/addressSlice";
import { v4 as uuIdv4 } from "uuid";
import { useRouter } from "next/navigation";
import { links } from "@/components/ui/navBar";
import { UnitList } from "@/components/ui/unitList";

export default function Home() {
	mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
	const mapContainerRef = useRef<HTMLDivElement | null>(null);
	const mapRef = useRef<MapboxMap | null>(null);
	const { data } = useAddressesQuery();
	const dispatch = useAppDispatch();
	const markersRef = useRef<Map<string, Marker>>(new Map());
	const coordinates = useAppSelector((state) => {
		if (state.address.feature?.geometry.type === "Point") {
			return state.address.feature?.geometry?.coordinates;
		}
	});
	const coord = coordinates as [number, number];
	const router = useRouter();

	useEffect(() => {
		if (coord && mapRef.current) {
			mapRef.current.flyTo({
				center: coord,
			});

			const markerId = `marker-${uuIdv4()}`;
			const popupContent = `
					  <div class="p-3">
						<div class="flex gap-2">
							<button
								id="add-${markerId}"
								class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
								${markersRef.current.has(markerId) ? 'style="display:none"' : ""}
							>
								Add Marker
							</button>
							<button
								id="remove-${markerId}"
								class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
								${markersRef.current.has(`${markerId}`) ? 'style="display:none"' : ""}
							>
								Remove Marker
							</button>
						</div>
					  </div>
					`;

			const popup = new mapboxgl.Popup({
				offset: 25,
				closeButton: true,
				closeOnClick: false,
			}).setHTML(popupContent);

			const marker = new mapboxgl.Marker().setLngLat(coord).setPopup(popup).addTo(mapRef.current);
			markersRef.current.set(markerId, marker);

			popup.on("open", () => {
				const addButton = document.getElementById(`add-${markerId}`);
				const removeButton = document.getElementById(`remove-${markerId}`);

				addButton?.addEventListener("click", () => {
					router.push(links.apartment);
				});

				removeButton?.addEventListener("click", () => {
					const marker = markersRef.current.get(markerId);
					if (marker) {
						marker.remove();
						markersRef.current.delete(markerId);
						removeButton.style.display = "none";
						addButton!.style.display = "block";
					}
				});
			});
		}
	}, [coord, router]);

	// Initialize map
	useEffect(() => {
		if (mapContainerRef.current && !mapRef.current) {
			mapRef.current = new mapboxgl.Map({
				container: mapContainerRef.current,
				style: "mapbox://styles/mapbox/streets-v12",
				center: [151.2093, -33.8688],
				zoom: 10,
			});
			// Update proximity when map moves
			const updateProximity = () => {
				const visibleBounds = mapRef.current?.getBounds();
				if (visibleBounds) {
					const latLng: [number, number] = [
						(visibleBounds.getEast() + visibleBounds.getWest()) / 2,
						(visibleBounds.getNorth() + visibleBounds.getSouth()) / 2,
					];

					dispatch(currentProximity(latLng));
				}
			};
			mapRef.current.on("moveend", updateProximity);
			mapRef.current.on("load", updateProximity);
		}

		return () => {
			if (mapRef.current) {
				mapRef.current.remove();
				mapRef.current = null;
			}
		};
	}, [dispatch]);

	// Handle data loading and map interactions
	useEffect(() => {
		const map = mapRef.current;
		if (!data || !map) return;

		const bounds = new mapboxgl.LngLatBounds();

		const initializeMapData = () => {
			// Add GeoJSON source
			if (!map.getSource("addressData")) {
				map.addSource("addressData", {
					type: "geojson",
					data: data,
				});

				// Add circle layer
				map.addLayer({
					id: "address-points",
					type: "circle",
					source: "addressData",
					paint: {
						"circle-color": "#FF5733",
						"circle-radius": 6,
					},
				});

				// Add markers with popups
				data.features.forEach((feature: GeoJSON.Feature) => {
					if (feature.geometry.type === "Point") {
						const coordinates = feature.geometry.coordinates as [number, number];
						const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
							`<h3>${feature.properties?.name}</h3><p>${feature.properties?.description}</p>`
						);
						new mapboxgl.Marker().setLngLat(coordinates).setPopup(popup).addTo(map);
						bounds.extend(coordinates);
					}
				});

				// Fit map bounds to GeoJSON data
				if (!bounds.isEmpty()) {
					map.fitBounds(bounds, { padding: 50 });
				}
			}
		};

		if (map.loaded()) {
			initializeMapData();
		} else {
			map.on("load", initializeMapData);
		}
	}, [data]);

	return (
		<div className="flex flex-row-reverse">
			<div ref={mapContainerRef} className="map-container relative h-[90vh] w-screen z-0" />
			<div className="h-[90vh] grid grid-cols-1 sm:grid-cols-2 pl-8 pr-3 gap-1 overflow-scroll">
				<UnitList />
			</div>
		</div>
	);
}
