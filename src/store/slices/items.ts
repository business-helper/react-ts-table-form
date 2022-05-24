import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IItem } from "types";
import { getAllItemsReq } from "providers/item";

const initialState: IItem[] = [];

export const getAllItems = createAsyncThunk("/items/getItems", () =>
  getAllItemsReq()
);

export const itemsSlice = createSlice({
  name: "items",
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

export const itemsReducer = itemsSlice.reducer;
