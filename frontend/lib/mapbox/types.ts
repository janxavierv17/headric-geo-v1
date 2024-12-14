export type MapboxSuggestions = {
	suggestions: Array<{
		name: string;
		mapbox_id: string;
		feature_type: string;
		address: string;
		full_address: string;
		place_formatted: string;
		context: Array<{
			id: string;
			text: string;
			wikidata?: string;
			short_code?: string;
			country: { name: string; country_code: string; country_code_alpha_3: string };
			postcode: { id: string; name: string };
			place: { id: string; name: string };
			locality: { id: string; name: string };
			street: { name: string };
		}>;
		language: string;
		maki: string;
		poi_category: Array<string>;
		poi_category_ids: Array<string>;
		brand: Array<string>;
		brand_id: Array<string>;
		external_ids: Array<{ dataplor: string }>;
		metadata: object;
		distance: number;
	}>;
};

export type MapboxSuggestion = MapboxSuggestions["suggestions"][number];
export type Mapbox_id = MapboxSuggestion["mapbox_id"];
export type Mapbox_name = MapboxSuggestion["name"];
