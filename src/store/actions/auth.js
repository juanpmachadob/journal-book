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
  githubAuthProvider,
} from "services/firebase";
import { types } from "types";
import { finishLoading, startLoading } from "store/actions/ui";
import { notesLogoutCleaning } from "store/actions/notes";
import { handleErrorMessage } from "helpers/errorHandler";

export const startLoginWithEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth(firebaseApp);
    signInWithEmailAndPassword(auth, email, password)
      .catch((err) => {
        const msg = handleErrorMessage(err);
        Swal.fire("Error", msg, "error");
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
        const msg = handleErrorMessage(err);
        Swal.fire("Error", msg, "error");
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
        const msg = handleErrorMessage(err);
        Swal.fire("Error", msg, "error");
      })
      .finally(() => dispatch(finishLoading()));
  };
};

export const startGithubLogin = () => {
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth(firebaseApp);
    signInWithPopup(auth, githubAuthProvider)
      .catch((err) => {
        const msg = handleErrorMessage(err);
        Swal.fire("Error", msg, "error");
      })
      .finally(() => dispatch(finishLoading()));
  };
};

export const login = (uid, displayName, photoUrl) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
    photoUrl
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
        const msg = handleErrorMessage(err);
        Swal.fire("Error", msg, "error");
      });
  };
};

export const logout = () => ({
  type: types.logout,
});
