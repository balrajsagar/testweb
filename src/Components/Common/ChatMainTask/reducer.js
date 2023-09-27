import { IS_LOADED, IS_LOADING,COMMENT, GROUP_EMAIL, GROUP_LIST, GROUP_NAME, TASK_COMMENTS } from "./actions";

export const initialState = {
    groupName:"",
    groupList:"",
    groupEmail: "",
    taskComments:[],
    comment:"",
  };
  export function chatReducer(state = initialState, action) {
    switch (action.type) {
      case GROUP_NAME:
        return {
          ...state,
          groupName: action.payload
        };
        case GROUP_LIST:
        return {
          ...state,
          groupList: action.payload
        };
        case GROUP_EMAIL:
        return {
          ...state,
          groupEmail: action.payload
        };
        case TASK_COMMENTS:
        return {
          ...state,
          taskComments: action.payload
        };
        case COMMENT:
        return {
          ...state,
          comment: action.payload
        };
        case IS_LOADING:
            return { ...state, isLoading: true };
        case IS_LOADED:
            return {
                ...state,
                isLoading: false,
            };
      default:
        return state;
    }
  }