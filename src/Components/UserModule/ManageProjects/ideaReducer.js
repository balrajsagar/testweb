import { CHECK_CURRENT_SPRINT, IS_LOADED, IS_LOADING, MODIFY_PROJECT, PROJECTS, PROJECT_DESCRIPTION, PROJECT_TITLE, UNCOMPLETED_STORIES, TARGET_DATE } from "./actions";
import { PROJECT } from '../../Common/Headers';

import { validateName } from '../../Common/validators'
const initialValue = {
    value: "",
    errorStatus: false,
    errorMessage: "Please Enter valid ",
};
export const initialState = {
    projects: [],
    projectTitle: initialValue,
    projectDescription: initialValue,
    targetDate: initialValue,
    projectId: initialValue,
    uncompletedStories: [],
    currentSprintEpics: []
};

export function ideaReducer(state = initialState, action) {

    switch (action.type) {
        case PROJECTS:
            return {
                ...state,
                projects: action.payload
            };
        case CHECK_CURRENT_SPRINT:
            return {
                ...state,
                currentSprintEpics: action.payload
            };
        case UNCOMPLETED_STORIES:
            return {
                ...state,
                uncompletedStories: action.payload
            }
        case PROJECT_TITLE:
            if (validateName(action.payload)) {
                return {
                    ...state,
                    projectTitle: {
                        ...state.projectTitle,
                        value: action.payload,
                        errorStatus: false,
                    },
                };
            } else {
                return {
                    ...state,
                    projectTitle: {
                        ...state.projectTitle,
                        value: action.payload,
                        errorStatus: true,
                        errormessage: `please enter the ${PROJECT} name `
                    },
                };
            }
        case PROJECT_DESCRIPTION:
            if (validateName(action.payload)) {
                return {
                    ...state,
                    projectDescription: {
                        ...state.projectDescription,
                        value: action.payload,
                        errorStatus: false,
                    },
                };
            } else {
                return {
                    ...state,
                    projectDescription: {
                        ...state.projectDescription,
                        value: action.payload,
                        errorStatus: true,
                        errormessage: `please enter the ${PROJECT} description/summary `
                    },
                };
            }
            case TARGET_DATE:
                if (action.payload !== '') {
                    return {
                        ...state,
                        targetDate: {
                            ...state.targetDate,
                            value: action.payload,
                            errorStatus: false,
                        },
                    };
                } else {
                    return {
                        ...state,
                        targetDate: {
                            ...state.targetDate,
                            value: action.payload,
                            errorStatus: true,
                            errormessage: `please select ${TARGET_DATE} `
                        },
                    };
                }
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
                targetDate: {
                    ...state.targetDate,
                    value: action.payload.targetDate,
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
