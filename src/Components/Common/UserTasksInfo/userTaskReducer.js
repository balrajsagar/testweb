import { SUBTASKS, MAINTASKS, PROJECTS, ROADBLOCKS, ALLMESSAGES, ALLROADBLOCKMESSAGES, MAINTASKMESSAGES, IS_LOADING, IS_LOADED, ROADBLOCK_DESCRIPTION, ROADBLOCK_STATUS  } from "./actions";

export const initialState = {
    manageSubTasks: [],
    manageTasks: [],
    projects: [],
    roadblocks: [],
    roadblockStatus: 0,
    allMessages: [],
    allRoadBlockMessages: [],
    mainTaskMessages: [],
    roadblockDescription: ""
};
export function userTaskReducer(state = initialState, action) {

    switch (action.type) {
        case SUBTASKS:
            return {
                ...state,
                manageSubTasks: action.payload
            };
            case MAINTASKMESSAGES:
            return {
                ...state,
                mainTaskMessages: action.payload
            };
            case ALLROADBLOCKMESSAGES:
            return {
                ...state,
                allRoadBlockMessages: action.payload
            };
            case ALLMESSAGES:
            return {
                ...state,
                allMessages: action.payload
            };
            case MAINTASKS:
            return {
                ...state,
                manageTasks: action.payload
            };
            case PROJECTS:
            return {
                ...state,
                projects: action.payload
            };
            case ROADBLOCKS:
            return {
                ...state,
                roadblocks: action.payload
            };
            case ROADBLOCK_STATUS:
        return {
          ...state,
          roadblockStatus: action.payload
        };
        case ROADBLOCK_DESCRIPTION:
        return {
          ...state,
          roadblockDescription: action.payload
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