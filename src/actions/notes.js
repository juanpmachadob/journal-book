import { addDoc, doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";

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

    const collectionRef = doc(db, `${uid}/journal/notes`);
    const document = await addDoc(collectionRef, newNote);
    dispatch(activeNote(document.id, newNote));
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

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { id, ...note } = getState().notes.active;

    if (!note.url) delete note.url;

    const collectionRef = doc(db, `${uid}/journal/notes/${id}`);
    const document = await updateDoc(collectionRef, note);
    dispatch(refreshNote(id, note));
    dispatch(finishEditing());
    Swal.fire("Saved", `The note '${note.title}' has been saved successfully.`, "success");
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdate,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

export const startEditing = () => ({
  type: types.notesStartEditing,
});

export const finishEditing = () => ({
  type: types.notesFinishEditing,
});