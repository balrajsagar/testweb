import { EMPLOYEES, IS_LOADING, IS_LOADED, GROUP_TITLE, DETAILS, ADMINGROUPS, ALLMESSAGES,ADMINGROUPSMSG } from './action'

export const initialState = {
    employees: [],
    title:"",
    details: [],
    adminGroups: [],
    adminGroupsMsg: [],
    allMessages: [],
}

export function reducer(state = initialState, action) {
// eslint-disable-next-line
    switch (action.type) {
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
            case ADMINGROUPSMSG:
            return {
                ...state,
                adminGroupsMsg: action.payload
            };  
        case ADMINGROUPS:
            return {
                ...state,
                adminGroups: action.payload
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