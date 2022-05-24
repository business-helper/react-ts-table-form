import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IForm } from "types";
import { getFormInfoReq } from "providers/meta";

const initialState: IForm[] = [];

export const getFormInfo = createAsyncThunk("/formInfo", () =>
  getFormInfoReq()
);

export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFormInfo.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getFormInfo.rejected, (state, action) => {
        return [];
      });
  },
});

export const formsReducer = formsSlice.reducer;
