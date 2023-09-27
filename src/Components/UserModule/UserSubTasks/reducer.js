import { MANAGE_SUB_TASKS, IS_LOADING, IS_LOADED, ALLMESSAGES  } from "./actions";

export const initialState = {
    manageSubTasks: [],
    allMessages: [],
};

export function subtasksReducer(state = initialState, action) {
    switch (action.type) {
        case MANAGE_SUB_TASKS:
            return {
                ...state,
                manageSubTasks: action.payload
            };
            case ALLMESSAGES:
            return {
                ...state,
                allMessages: action.payload
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
    