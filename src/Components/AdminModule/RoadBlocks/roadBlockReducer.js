import { TOBEASSIGNED, IS_LOADED, IS_LOADING, ROADBLOCK_LIST, TO_BE_ASSIGNED } from "./actions";

export const initialState = {
    toBeAssigned: [],
    assigned: [],
    roadBlocks: []
};

export function roadBlockReducer(state = initialState, action) {

    switch (action.type) {
        case TOBEASSIGNED:
            return {
                ...state,
                toBeAssigned: action.payload
            };
        case TO_BE_ASSIGNED:
            return {
                ...state,
                assigned: action.payload
            };
        case ROADBLOCK_LIST:
            return {
                ...state,
                roadBlocks: action.payload
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
