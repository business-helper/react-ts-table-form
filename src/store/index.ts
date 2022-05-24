import { configureStore } from "@reduxjs/toolkit";

import { itemsReducer, formsReducer } from "./slices";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    forms: formsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
