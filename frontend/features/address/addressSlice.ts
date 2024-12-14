import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InititalState = {
	feature: GeoJSON.FeatureCollection["features"][number] | null;
};

const initialState: InititalState = {
	feature: null,
};

export const addressSlice = createSlice({
	name: "address",
	initialState: initialState,
	reducers: {
		getSearchedAddresses: (state) => state,
		feature: (state, action: PayloadAction<GeoJSON.FeatureCollection>) => {
			state.feature = action.payload.features[0];
		},
	},
});

export const { getSearchedAddresses, feature } = addressSlice.actions;

export default addressSlice.reducer;
