"use server";
import { v4 as uuIdv4 } from "uuid";

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_TOKEN;
const MAPBOX_SESION_TOKEN = uuIdv4();

export async function fetchGeoCode(search_text: string, proximity: [number, number]) {
	const geocodeURI = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURI(search_text)}.json&proximity=${
		proximity[0]
	}%2C${proximity[1]}&access_token=${process.env.MAPBOX_TOKEN}`;
	const response = await fetch(geocodeURI);

	const data = await response.json();
	return data;
}

export async function searchAndSuggestions(search_text: string, proximity: [number, number]) {
	const mapBoxSearchURI = `https://api.mapbox.com/search/searchbox/v1/suggest?country=au&q=${encodeURI(
		search_text
	)}&proximity=${proximity[0]}%2C${
		proximity[1]
	}&access_token=${MAPBOX_ACCESS_TOKEN}&session_token=${MAPBOX_SESION_TOKEN}`;

	const response = await fetch(mapBoxSearchURI);
	const data = await response.json();

	console.log(`Data for ${search_text}`, data);
	return data;
}
