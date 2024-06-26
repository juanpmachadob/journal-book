import { types } from "types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
        photoUrl: action.payload.photoUrl,
      };

    case types.logout:
      return {};

    default:
      return state;
  }
};
