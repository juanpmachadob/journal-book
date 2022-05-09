import { getAuth, signInWithPopup, signOut } from "firebase/auth";

import {
  firebaseApp,
  googleAuthProvider,
  facebookAuthProvider,
} from "../firebase/config";
import { types } from "../types";

export const startGoogleLogin = () => {
  return (dispatch) => {
    const auth = getAuth(firebaseApp);
    signInWithPopup(auth, googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => {
        console.log("Error ocurred", e);
      });
  };
};

export const startFacebookLogin = () => {
  return (dispatch) => {
    const auth = getAuth(firebaseApp);
    signInWithPopup(auth, facebookAuthProvider)
      .then(({ user }) => {
        console.log("Loading", user.uid, user.displayName);
        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => {
        console.log("Error ocurred", e);
      });
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
  return async (dispatch) => {
    const auth = getAuth(firebaseApp);
    await signOut(auth);
    dispatch(logout());
  };
};

export const logout = () => ({
  type: types.logout,
});
