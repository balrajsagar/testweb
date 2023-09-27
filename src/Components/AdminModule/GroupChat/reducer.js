import { EDIT_GROUP, EMPLOYEES, IS_LOADING, IS_LOADED, GROUP_TITLE, DETAILS, ALLMESSAGES } from './action'

export const initialState = {
    employees: [],
    title:"",
    details: [],
    allMessages: [],
}

export function reducer(state = initialState, action) {
// eslint-disable-next-line
    switch (action.type) {
        case EDIT_GROUP:
            return {
                ...state,
                id: {
                    ...state.id,
                    value: action.payload.id,
                    errorStatus: false
                },
                title: {
                    ...state.title,
                    value: action.payload.title,
                    errorStatus: false
                },
            }
        case ALLMESSAGES:
            return {
                ...state,
                allMessages: action.payload
            };
        case DETAILS:
            return {
                ...state,
                details: action.payload
            };
        case GROUP_TITLE:
            return {
                ...state,
                title: action.payload
            };
        case EMPLOYEES:
            return {
                ...state,
                employees: action.payload
            };
            case IS_LOADING:
            return { ...state, isLoading: true };
        case IS_LOADED:
            return {
                ...state,
                isLoading: false,
            };
        }
}