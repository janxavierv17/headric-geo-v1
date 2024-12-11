"use client";

import { useEffect, useRef } from "react";
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import MapboxGeoCoder from "@mapbox/mapbox-gl-geocoder";
import { useAddressesQuery } from "../../features/api/apiSlice";

export default function Home() {
	// const [data, setData] = useState<GeoJSON.FeatureCollection>();
	const mapContainerRef = useRef<HTMLDivElement | null>(null);
	const mapRef = useRef<MapboxMap | undefined>(undefined);

	const { data, error, isLoading } = useAddressesQuery();

	useEffect(() => {
		if (!data) return;

		mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

		const map = (mapRef.current = new mapboxgl.Map({
			container: mapContainerRef.current || "",
			center: [151.2093, -33.8688], // Initial center (Sydney, Australia)
			zoom: 10, // Adjust zoom level as needed
		}));

		// map.jumpTo({ center: [-65.017, -16.457] });

		const geocoder = new MapboxGeoCoder({
			accessToken: mapboxgl.accessToken,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			mapboxgl: mapboxgl as any,
		});

		// Add GeoJSON data to the map
		map.on("load", () => {
			// Add the GeoJSON source
			map.addSource("addressData", {
				type: "geojson",
				data: data,
			});

			// Add a layer for displaying the GeoJSON data (e.g., points)
			map.addLayer({
				id: "address-points",
				type: "circle",
				source: "addressData",
				paint: {
					"circle-color": "#FF5733", // Customize color of the circle
					"circle-radius": 6, // Adjust size of the circle
				},
			});

			// Add popups and markers for each feature in the GeoJSON
			data.features.forEach((feature: GeoJSON.Feature) => {
				if (feature.geometry.type === "Point") {
					const [lng, lat] = feature.geometry.coordinates;

					const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
						`<h3>${feature?.properties?.name}</h3><p>${feature?.properties?.description}</p>`
					);

					new mapboxgl.Marker().setLngLat([lng, lat]).setPopup(popup).addTo(map);
				}
			});

			// Adjust the map to fit the bounds of the GeoJSON data
			const bounds = new mapboxgl.LngLatBounds();
			data.features.forEach((feature: GeoJSON.Feature) => {
				if (feature.geometry.type === "Point") {
					const [lng, lat] = feature.geometry.coordinates; // Safe now
					bounds.extend([lng, lat]);
				}
			});
			map.fitBounds(bounds, { padding: 50 });

			// Add geocoder control
			map.addControl(geocoder);
		});

		// Listen for the result event from the geocoder
		geocoder.on("result", (event) => {
			const result = event.result;
			new mapboxgl.Marker({ color: "#FF0000" })
				.setLngLat(result.center)
				.setPopup(new mapboxgl.Popup().setHTML(`<h3>${result.place_name}</h3>`))
				.addTo(map);
		});

		return () => {
			mapRef?.current?.remove();
		};
	}, [data]); // Rerun this effect when data changes
	return (
		<>
			<div style={{ height: "100vh", width: "100vw" }} ref={mapContainerRef} className="map-container" />
		</>
	);
}
