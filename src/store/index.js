import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "store/reducers/authReducer";
import { uiReducer } from "store/reducers/uiReducer";
import { notesReducer } from "store/reducers/notesReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer,
  },
});