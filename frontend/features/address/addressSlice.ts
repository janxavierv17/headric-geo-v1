import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InititalState = {
	feature: GeoJSON.FeatureCollection["features"][number] | null;
	currentProximity: [number, number] | null;
};

const initialState: InititalState = {
	feature: null,
	currentProximity: null,
};

export const addressSlice = createSlice({
	name: "address",
	initialState: initialState,
	reducers: {
		getSearchedAddresses: (state) => state,
		feature: (state, action: PayloadAction<GeoJSON.FeatureCollection>) => {
			state.feature = action.payload.features[0];
		},
		currentProximity: (state, action: PayloadAction<[number, number]>) => {
			state.currentProximity = action.payload;
		},
	},
});

export const { getSearchedAddresses, feature, currentProximity } = addressSlice.actions;

export default addressSlice.reducer;
