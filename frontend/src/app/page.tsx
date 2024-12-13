"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useAddressesQuery } from "../../features/api/apiSlice";
import { geoCoder } from "../../lib/mapbox/geoCoder";
import { SearchInput } from "@/components/ui/searchInput";

export default function Home() {
	mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
	const [proximity, setProximity] = useState<[number, number]>();
	const mapContainerRef = useRef<HTMLDivElement | null>(null);
	const mapRef = useRef<MapboxMap | null>(null);
	const { data } = useAddressesQuery();

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
					setProximity([
						(visibleBounds.getEast() + visibleBounds.getWest()) / 2,
						(visibleBounds.getNorth() + visibleBounds.getSouth()) / 2,
					]);
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
	}, []);

	// Handle data loading and map interactions
	useEffect(() => {
		const map = mapRef.current;
		if (!data || !map) return;

		const geocoder = geoCoder();
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

				// Add geocoder control
				map.addControl(geocoder);
			}
		};

		if (map.loaded()) {
			initializeMapData();
		} else {
			map.on("load", initializeMapData);
		}

		// Listen for the result event from the geocoder
		geocoder.on("result", (event) => {
			const result = event.result;
			new mapboxgl.Marker({ color: "#FF0000" })
				.setLngLat(result.center)
				.setPopup(new mapboxgl.Popup().setHTML(`<h3>${result.place_name}</h3>`))
				.addTo(map);
		});

		return () => {
			geocoder.off("result", (event) => {
				console.log(event.result);
			});
		};
	}, [data]);

	return (
		<>
			<div
				ref={mapContainerRef}
				className="map-container relative h-screen w-screen z-0"
				style={{ height: "100vh" }} // Explicit height
			/>
			<div className="absolute z-10 top-3 left-3 w-1/5">
				<SearchInput proximity={proximity} />
			</div>
		</>
	);
}
