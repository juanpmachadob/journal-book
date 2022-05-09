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

export const startLoginWithEmailPassword = (email, password) => {
  return (dispatch) => {
    const auth = getAuth(firebaseApp);
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        // dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => {
        // TODO: Swal messages
        console.log("Error", e);
      });
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    const auth = getAuth(firebaseApp);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user, { displayName: name });
        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => {
        console.log("Error ocurred", e);
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    const auth = getAuth(firebaseApp);
    signInWithPopup(auth, googleAuthProvider)
      .then(({ user }) => {
        // dispatch(login(user.uid, user.displayName));
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
        // dispatch(login(user.uid, user.displayName));
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
