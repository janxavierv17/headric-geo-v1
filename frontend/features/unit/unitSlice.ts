import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultFormData, UnitFormData } from "../../lib/formSchema";

type InitialState = {
	form: UnitFormData;
};

const initialState: InitialState = {
	form: defaultFormData,
};

export const unitSlice = createSlice({
	name: "unit",
	initialState: initialState,
	reducers: {
		setUnitDetails: (state, action: PayloadAction<UnitFormData>) => {
			state.form = { ...action.payload };
		},
	},
});

export const { setUnitDetails } = unitSlice.actions;

export default unitSlice.reducer;
