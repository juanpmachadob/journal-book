import { types } from "types";

const initialState = {
  loading: false,
  msgError: "",
  mobileSidebarOpen: false
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiSetError:
      return {
        ...state,
        msgError: action.payload,
      };

    case types.uiRemoveError:
      return {
        ...state,
        msgError: "",
      };

    case types.uiStartLoading:
      return {
        ...state,
        loading: true,
      };

    case types.uiFinishLoading:
      return {
        ...state,
        loading: false,
      };

    case types.uiMobileSidebarToggle:
      return {
        ...state,
        mobileSidebarOpen: !state.mobileSidebarOpen,
      }

    default:
      return state;
  }
};
