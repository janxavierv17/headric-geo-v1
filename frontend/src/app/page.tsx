"use client";

import "mapbox-gl/dist/mapbox-gl.css";

import mapboxgl, { LngLatLike } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

export default function Home() {
	const mapContainerRef = useRef();
	const markerRef = useRef<mapboxgl.Marker | null>(null);
	const mapRef = useRef<mapboxgl.Map | null>(null);
	const [lngLat, setLngLat] = useState<LngLatLike>([151.1993, -33.916]);

	useEffect(() => {
		mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

		const map = (mapRef.current = new mapboxgl.Map({
			container: mapContainerRef.current || "",
			center: lngLat,
			zoom: 18,
		}));

		map.addControl(new mapboxgl.NavigationControl());
		map.on("mousedown", (event) => {
			setLngLat([event.lngLat.lng, event.lngLat.lat]);
		});

		// Initialize the marker with the popup using setDOMContent
		const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`<h1>Hello, world!</h1>`);
		markerRef.current = new mapboxgl.Marker().setLngLat(lngLat).setPopup(popup).addTo(mapRef.current);

		return () => {
			mapRef?.current?.remove();
		};
	}, []);

	return (
		<>
			<div style={{ height: "100vh", width: "100vw" }} ref={mapContainerRef} className="map-container" />
		</>
	);
}
