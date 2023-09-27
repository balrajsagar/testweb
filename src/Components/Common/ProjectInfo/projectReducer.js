import { IS_LOADED, IS_LOADING, MANAGE_TASKS, MODULES, SUB_TASKS, ROADBLOCKS, ALLMESSAGES, MAINTASKMESSAGES, ROADBLOCKMESSAGES } from "./actions";

export const initialState = {
    modules: [],
    manageSubTasks: [],
    manageTasks: [],
    allMessages:[],
    mainTaskMessages:[],
    roadBlockMessages:[],
    roadblocks: []
};
export function projectReducer(state = initialState, action) {

    switch (action.type) {
        case ROADBLOCKMESSAGES:
            return {
                ...state,
                roadBlockMessages: action.payload
            };
            case MAINTASKMESSAGES:
            return {
                ...state,
                mainTaskMessages: action.payload
            };
            case ALLMESSAGES:
            return {
                ...state,
                allMessages: action.payload
            };
        case MODULES:
            return {
                ...state,
                modules: action.payload
            };
        case MANAGE_TASKS:
            return {
                ...state,
                manageTasks: action.payload
            };
        case SUB_TASKS:
            return {
                ...state,
                manageSubTasks: action.payload
            };
        case ROADBLOCKS:
            return {
                ...state,
                roadblocks: action.payload
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
