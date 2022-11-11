import Swal from "sweetalert2";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import {
  firebaseApp,
  googleAuthProvider,
  facebookAuthProvider,
} from "services/firebase";
import { types } from "types";
import { finishLoading, startLoading } from "actions/ui";
import { notesLogoutCleaning } from "actions/notes";

export const startLoginWithEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth(firebaseApp);
    signInWithEmailAndPassword(auth, email, password)
      .catch((err) => {
        Swal.fire("Error", err.code ? err.code : err.toString(), "error");
      })
      .finally(() => dispatch(finishLoading()));
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth(firebaseApp);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user, { displayName: name });
        dispatch(login(user.uid, user.displayName));
      })
      .catch((err) => {
        Swal.fire("Error", err.code ? err.code : err.toString(), "error");
      })
      .finally(() => dispatch(finishLoading()));
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth(firebaseApp);
    signInWithPopup(auth, googleAuthProvider)
      .catch((err) => {
        Swal.fire("Error", err.code ? err.code : err.toString(), "error");
      })
      .finally(() => dispatch(finishLoading()));
  };
};

export const startFacebookLogin = () => {
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth(firebaseApp);
    signInWithPopup(auth, facebookAuthProvider)
      .catch((err) => {
        Swal.fire("Error", err.code ? err.code : err.toString(), "error");
      })
      .finally(() => dispatch(finishLoading()));
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startLogout = () => {
  return (dispatch) => {
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => {
        dispatch(logout());
        dispatch(notesLogoutCleaning());
      })
      .catch((err) => {
        Swal.fire("Error", err.code ? err.code : err.toString(), "error");
      });
  };
};

export const logout = () => ({
  type: types.logout,
});
