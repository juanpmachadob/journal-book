import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "reducers/authReducer";
import { uiReducer } from "reducers/uiReducer";
import { notesReducer } from "reducers/notesReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer,
  },
});