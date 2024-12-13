/* eslint-disable @typescript-eslint/no-explicit-any */
import MapboxGeoCoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";
export const geoCoder = () => {
	const geoCoderSearch = new MapboxGeoCoder({ accessToken: mapboxgl.accessToken, mapboxgl: mapboxgl as any });
	return geoCoderSearch;
};
