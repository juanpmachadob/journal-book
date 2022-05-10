import { addDoc, collection } from "firebase/firestore";

import { db } from "../firebase/config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      date: new Date().getTime(),
      title: "",
      body: "",
    };

    const doc = await addDoc(collection(db, uid, "journal/notes"), newNote);
    dispatch(activeNote(doc.id, newNote));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});
