import { CONSOLIDATED_TODO, PRIVATE_TODO, IS_LOADING, IS_LOADED } from "./actions";

export const initialState = {
    consolidatedToDo: [],
    privateToDo:[],
};
export function consolidatedToDoReducer(state = initialState, action) {

    switch (action.type) {
        case CONSOLIDATED_TODO:
            return {
                ...state,
                consolidatedToDo: action.payload
            };
        case PRIVATE_TODO:
            return {
                ...state,
                privateToDo: action.payload
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
