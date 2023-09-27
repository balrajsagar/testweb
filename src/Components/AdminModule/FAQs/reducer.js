import {
    IS_LOADED,
    IS_LOADING,
    SECTION,
    APPDETAILS,
    APP,
    ALLAPP,
    QUES,
    ANS,
    REDIRECT,
    EDIT_FAQ,
  } from "./action";
  
  const initialValue = {
    value: "",
    errorStatus: false,
    errormessage: "Please enter valid ",
};

  export const initialState = {
    addredirect:initialValue,
    isLoading: false,
    section: initialValue,
    app: initialValue,
    appDetails: [],
    allApp: [],
    ques: initialValue,
    ans: initialValue,
  };

  
  export function reducer(state, action) {
    switch (action.type) {
      case EDIT_FAQ:
        return {
            ...state,
            id: {
                ...state.id,
                value: action.payload.id,
                errorStatus: false
            },
            ques: {
                ...state.ques,
                value: action.payload.ques,
                errorStatus: false
            },
            ans: {
              ...state.ans,
              value: action.payload.ans,
              errorStatus: false
          },
        }
        case QUES :
        return {
          ...state,
          ques: {
              ...state.ques,
              value: action.payLoad,
              errorStatus: false,
          },
      };
      case ANS :
        return {
          ...state,
          ans: {
              ...state.ans,
              value: action.payLoad,
              errorStatus: false,
          },
      };
      case REDIRECT: //page navigation
            return {...state,
              addredirect: {
                ...state.addredirect,
                value: action.payLoad,
                errorStatus: false,
              },
            }
      case IS_LOADING:
        return { ...state, isLoading: true };
      case IS_LOADED:
        return {
          ...state,
          isLoading: false,
        };
        case SECTION :
        return {
          ...state,
          section: {
              ...state.section,
              value: action.payLoad,
              errorStatus: false,
          },
      };
      case APP :
        return {
          ...state,
          app: {
              ...state.app,
              value: action.payLoad,
              errorStatus: false,
          },
      };
      case APPDETAILS :
        return {
          ...state,
          appDetails: {
              ...state.appDetails,
              allApp: action.payLoad,
          },
      };
      case ALLAPP :
        return {
          ...state,
          allApp: {
              ...state.allApp,
              allApp: action.payLoad,
          },
      };
      default:
        return state;
    }
  }
  