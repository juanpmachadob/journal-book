import { types } from "../types";

const initialState = {
  notes: [],
  active: null,
  editing: false,
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesActive:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };

    case types.notesNext:
      const nextIndex = state.notes.findIndex(
        (note) => note.id === action.payload
      );
      return {
        ...state,
        active:
          state.notes[
            nextIndex + 1 > state.notes.length - 1 ? 0 : nextIndex + 1 || 0
          ],
      };

    case types.notesPrevious:
      const previousIndex = state.notes.findIndex(
        (note) => note.id === action.payload
      );
      return {
        ...state,
        active:
          state.notes[
            previousIndex - 1 < 0 ? state.notes.length - 1 : previousIndex - 1
          ],
      };

    case types.notesAddNew:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
        editing: true,
      };

    case types.notesLoad:
      return {
        ...state,
        notes: action.payload.sort((a, b) => b.date - a.date),
      };

    case types.notesStartEditing:
      return {
        ...state,
        editing: true,
      };

    case types.notesCancelEditing:
      return {
        ...state,
        editing: false,
        active: state.notes.find((note) => note.id === action.payload),
      };

    case types.notesUpdate:
      return {
        ...state,
        editing: false,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload.note : note
        ),
      };

    case types.notesDelete:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };

    case types.notesLogoutCleaning:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
