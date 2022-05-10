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

    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload],
      };

    case types.notesStartEditing:
      return {
        ...state,
        editing: true,
      };

    case types.notesFinishEditing:
      return {
        ...state,
        editing: false,
      };

    case types.notesUpdate:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload.note : note
        ),
      };

    case types.notesDelete:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((note) => note.id !== action.payload)
      }

    default:
      return state;
  }
};
