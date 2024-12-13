import { createSlice } from "@reduxjs/toolkit";

export const addressSlice = createSlice({
	name: "address",
	initialState: [{}],
	reducers: {
		getSearchedAddresses: (state) => state,
	},
});

export const { getSearchedAddresses } = addressSlice.actions;

export default addressSlice.reducer;
