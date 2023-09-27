import { IS_LOADED, IS_LOADING, MODIFY_PROJECT, PROJECTS, PROJECT_DESCRIPTION, PROJECT_TITLE } from "./actions";

const initialValue = {
    value: "",
    errorStatus: false,
    errorMessage: "Please Enter valid ",
};
export const initialState = {
    projects: [],
    projectTitle: initialValue,
    projectDescription: initialValue,
    projectId:initialValue,
};

export function ideaReducer(state = initialState, action) {

    switch (action.type) {
        case PROJECTS:
            return {
                ...state,
                projects: action.payload
            };
        case PROJECT_TITLE:
            return {
                ...state,
                projectTitle: {
                    ...state.projectTitle,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case PROJECT_DESCRIPTION:
            return {
                ...state,
                projectDescription: {
                    ...state.projectDescription,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case MODIFY_PROJECT:
            return {
                ...state,
                projectTitle: {
                    ...state.projectTitle,
                    value: action.payload.projectTitle,
                    errorStatus: false
                },
                projectDescription: {
                    ...state.projectDescription,
                    value: action.payload.projectDescription,
                    errorStatus: false,
                },
                projectId: {
                    ...state.projectId,
                    value: action.payload.projectId,
                    errorStatus: false,
                },
            }
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
