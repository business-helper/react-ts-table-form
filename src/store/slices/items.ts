import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IItem } from "types";
import type { RootState } from "store";
import { getAllItemsReq } from "providers/item";

const initialState: IItem[] = [];

export const getAllItems = createAsyncThunk("/items/getItems", () =>
  getAllItemsReq()
);

export const itemsSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllItems.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getAllItems.rejected, (state, action) => {
        return [];
      });
  },
});

// export const { updateFormStatus } = contactSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.items;

export default itemsSlice.reducer;
