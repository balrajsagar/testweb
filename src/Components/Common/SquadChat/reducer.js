import { IS_LOADED, IS_LOADING, COMMENT, TASK_COMMENTS } from "./actions";

export const initialState = {
    taskComments:[],
    comment:"",
  };
  export function chatReducer(state = initialState, action) {
    switch (action.type) {
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