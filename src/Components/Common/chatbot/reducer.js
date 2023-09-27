import {
    TITLE,
  } from "./action";
  

  export const initialState = {
    title: "Agile Assistant",
  };

  
  export function reducer(state, action) {
    switch (action.type) {
        case TITLE :
        return {
          ...state,
          title: {
              ...state.title,
              value: action.payLoad,
              errorStatus: false,
          },
      };
      default:
        return state;
    }
  }
  