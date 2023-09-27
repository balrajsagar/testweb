import {ALLGROUPMESSAGES, ALLMESSAGESUSER, ALLMESSAGES, NEW_PROJECT,IS_LOADING,IS_LOADED,SET_REDIRECT, ALL_PROJECTS } from "./actions";


export const initialState = {
    redirect:false,
    newProject:'',
    allProjects: [],
    allMessages: [],
    allMessagesUser: [],
    allGroupMessages: [],
   };

export function dashboardReducer(state = initialState, action) {

    switch (action.type) {
        case ALLGROUPMESSAGES:
            return {
                ...state,
                allGroupMessages: action.payload
            };
        case ALLMESSAGESUSER:
            return {
                ...state,
                allMessagesUser: action.payload
            };
        case ALLMESSAGES:
            return {
                ...state,
                allMessages: action.payload
            };
        case ALL_PROJECTS:
            return {
                ...state,
                allProjects: action.payload
            };
        case NEW_PROJECT:
            return {
                ...state,
                newProject: action.payload
            };
            case SET_REDIRECT:
            return {
                ...state,
            redirect: action.payload
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