import {
    IS_LOADED,
    IS_LOADING,
    APPDETAILS,
  } from "./action";
  
  // eslint-disable-next-line
  const initialValue = {
    value: "",
    errorStatus: false,
    errormessage: "Please enter valid ",
};

  export const initialState = {
    isLoading: false,
    appDetails: [],
  };

  
  export function reducer(state, action) {
    switch (action.type) {
      case IS_LOADING:
        return { ...state, isLoading: true };
      case IS_LOADED:
        return {
          ...state,
          isLoading: false,
        };
      case APPDETAILS :
        return {
              ...state,
              appDetails: action.payLoad,
      };
      default:
        return state;
    }
  }
  