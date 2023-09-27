import { COMMENT, GROUP_LIST, GROUP_NAME, TASK_COMMENTS } from "./actions";

export const initialState = {
    groupName:"",
    groupList:"",
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
      default:
        return state;
    }
  }