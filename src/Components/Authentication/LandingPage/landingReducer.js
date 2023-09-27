import { STR_PROPERTIES, IS_LOADED, IS_LOADING, WEB_PROPERTIES } from "./actions";
export const initialState = {
    properties: {},
    webProperties: {}
};

export function landingReducer(state = initialState, action) {

    switch (action.type) {
        case STR_PROPERTIES:
            return {
                ...state,
                properties: action.payload
            };
        case WEB_PROPERTIES:
            return {
                ...state,
                webProperties: action.payload
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