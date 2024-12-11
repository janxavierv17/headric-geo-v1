import { createSlice } from "@reduxjs/toolkit";

export const addressSlice = createSlice({
	name: "address",
	initialState: [{}],
	reducers: {
		getAllAddresses: (state) => state,
	},
});

export const { getAllAddresses } = addressSlice.actions;

export default addressSlice.reducer;
