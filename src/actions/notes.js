import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";

import { db } from "../firebase/config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types";

export const startNewNote = () => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      date: new Date().getTime(),
      title: "",
      body: "",
    };

    const collectionRef = collection(db, `${uid}/journal/notes`);
    addDoc(collectionRef, newNote)
      .then(({ id }) => {
        dispatch(activeNote(id, newNote));
        dispatch(addNewNote(id, newNote));
      })
      .catch((err) => {
        Swal.fire("Error", err.code ? err.code : err.toString(), "error");
      });
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (uid) => {
  return (dispatch) => {
    loadNotes(uid)
      .then((notes) => {
        dispatch(setNotes(notes));
      })
      .catch((err) => {
        Swal.fire("Error", err.code ? err.code : err.toString(), "error");
      });
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNote = ({ id, ...note }) => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!note.url) delete note.url;

    const collectionRef = doc(db, `${uid}/journal/notes/${id}`);
    updateDoc(collectionRef, note)
      .then(() => {
        dispatch(refreshNote(id, note));
        Swal.fire(
          "Saved",
          `The note "${note.title}" has been saved successfully.`,
          "success"
        );
      })
      .catch((err) => {
        Swal.fire("Error", err.code ? err.code : err.toString(), "error");
      });
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

export const cancelEditing = (id) => ({
  type: types.notesCancelEditing,
  payload: id
});


export const startUploading = (file) => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().notes;

    Swal.fire({
      title: "Uploading image",
      text: "Please, wait...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    fileUpload(file, uid, note.id)
      .then((url) => {
        const updatedNote = { ...note, url };
        dispatch(startSaveNote(updatedNote));
        dispatch(activeNote(note.id, updatedNote));
      })
      .catch((err) => {
        Swal.fire("Error", err.code ? err.code : err.toString(), "error");
      });
  };
};

export const startDeleting = (id) => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;
    const noteRef = doc(db, `${uid}/journal/notes/${id}`);
    deleteDoc(noteRef)
      .then(() => {
        dispatch(deleteNote(id));
        Swal.fire(
          "Deleted",
          `The note has been deleted successfully.`,
          "success"
        );
      })
      .catch((err) => {
        Swal.fire("Error", err.code ? err.code : err.toString(), "error");
      });
  };
};

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const notesLogoutCleaning = () => ({
  type: types.notesLogoutCleaning,
});

export const nextNote = (id) => ({
  type: types.notesNext,
  payload: id,
});

export const previousNote = (id) => ({
  type: types.notesPrevious,
  payload: id,
});
