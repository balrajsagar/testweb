import { TIMESHEET, IS_LOADING , IS_LOADED } from "./actions";

export const initialState1 = {
    timesheet: [],
};

export function timeReducer(state = initialState1, action) {

    switch (action.type) {
        case TIMESHEET:
            return {
                ...state,
                timesheet: action.payload
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
