import { type } from "@testing-library/user-event/dist/type";
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

export const startSaveNote = (activeNote) => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;
    const { id, ...note } = activeNote;

    if (!note.url) delete note.url;

    const collectionRef = doc(db, `${uid}/journal/notes/${id}`);
    updateDoc(collectionRef, note)
      .then(() => {
        dispatch(refreshNote(id, note));
      })
      .catch((err) => {
        Swal.fire("Error", err.code ? err.code : err.toString(), "error");
      })
      .finally(() => {
        dispatch(finishEditing());
        Swal.fire(
          "Saved",
          `The note "${note.title}" has been saved successfully.`,
          "success"
        );
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

export const finishEditing = () => ({
  type: types.notesFinishEditing,
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
