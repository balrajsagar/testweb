import { SPRINTS, IS_LOADING, IS_LOADED, USER_STORIES, ALLMESSAGES, ARCHIVE_SUBTASKS } from "./actions";


export const initialState = {
    completedSprints: [],
    completedUserStories: [],
    archiveSubTasks: [],
    allMessages: [],
};

export function tasksReducer(state = initialState, action) {

    switch (action.type) {
        case ALLMESSAGES:
            // console.log(action.payload)
            return {
                ...state,
                allMessages: action.payload
            };
        case SPRINTS:
            return {
                ...state,
                completedSprints: action.payload
            };
        case USER_STORIES:
            return {
                ...state,
                completedUserStories: action.payload
            };
        case ARCHIVE_SUBTASKS:
            return {
                ...state,
                archiveSubTasks: action.payload
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