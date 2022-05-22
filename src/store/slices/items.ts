import { createSlice } from "@reduxjs/toolkit";
import { IItem } from "types";
import type { RootState } from "store";

const initialState: IItem[] = [];

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
});

// export const { updateFormStatus } = contactSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.items;

export default contactSlice.reducer;
