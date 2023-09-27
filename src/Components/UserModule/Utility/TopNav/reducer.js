import {  ALLMESSAGES, IS_LOADED, IS_LOADING, ADMINDETAILS } from "./actions";

// const initialValue = {
//     value: "",
//     errorStatus: false,
//     errorMessage: "Please Enter valid ",
// };
export const initialState = {
    allMessages: [],
    adminDetails: []
};

export function empReducer(state = initialState, action) {

    switch (action.type) {
        case ALLMESSAGES:
            return {
                ...state,
                allMessages: action.payload
            };
        case ADMINDETAILS:
            return {
                ...state,
                adminDetails: action.payload
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
