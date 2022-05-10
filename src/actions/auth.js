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
} from "../firebase/config";
import { types } from "../types";
import { finishLoading, startLoading } from "./ui";

export const startLoginWithEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth(firebaseApp);
    signInWithEmailAndPassword(auth, email, password)
      .catch(({ code }) => {
        // TODO: Swal messages
        Swal.fire("Error", code, "error");
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
      .catch(({ code }) => {
        Swal.fire("Error", code, "error");
      })
      .finally(() => dispatch(finishLoading()));
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth(firebaseApp);
    signInWithPopup(auth, googleAuthProvider)
      .catch(({ code }) => {
        Swal.fire("Error", code, "error");
      })
      .finally(() => dispatch(finishLoading()));
  };
};

export const startFacebookLogin = () => {
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth(firebaseApp);
    signInWithPopup(auth, facebookAuthProvider)
      .catch(({ code }) => {
        Swal.fire("Error", code, "error");
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
      })
      .catch(({ code }) => {
        Swal.fire("Error", code, "error");
      });
  };
};

export const logout = () => ({
  type: types.logout,
});
