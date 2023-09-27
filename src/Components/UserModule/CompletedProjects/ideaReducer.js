import { PROJECTS, IS_LOADING , IS_LOADED } from "./actions";

export const initialState = {
    projects: [],
};

export function ideaReducer(state = initialState, action) {

    switch (action.type) {
        case PROJECTS:
            return {
                ...state,
                projects: action.payload
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
