import { EDIT_GROUP, GROUP_LIST ,GROUP_NAME, TASK_COMMENTS, EMPLOYEES, IS_LOADING, IS_LOADED, GROUP_TITLE, DETAILS, COMMENT, GROUP_EMAIL } from './action'

export const initialState = {
    employees: [],
    title:"",
    details: [],
    comment:"",
    taskComments:[],
    groupName: "",
    groupList: "",
    groupEmail: "",
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
        case GROUP_EMAIL:
            return {
                ...state,
                groupEmail: action.payload
            };
        case GROUP_LIST:
            return {
                ...state,
                groupList: action.payload
            };
        case GROUP_NAME:
            return {
                ...state,
                groupName: action.payload
            };
        case TASK_COMMENTS:
            return {
                ...state,
                taskComments: action.payload
            };
        case COMMENT:
            return {
                ...state,
                comment: action.payload
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