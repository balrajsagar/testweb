import { validateName } from "../validators";
import { IS_LOADED, IS_LOADING, MODIFY_MODULE, MODULES, MODULE_TITLE, TARGET_DATE,START_DATE, PROJECTS } from "./actions";

const initialValue = {
    value: "",
    errorStatus: false,
    errorMessage: "Please Enter valid ",
};
export const initialState = {
    projects:[],
    modules: [],
    moduleTitle: initialValue,
    moduleId: initialValue,
    date: initialValue, //targetDate
    startDate:initialValue,
    sprint_status:initialValue
};

export function moduleReducer(state = initialState, action) {

    switch (action.type) {
        case PROJECTS:
            return {
                ...state,
                projects: action.payload
            };
        case MODULES:
            return {
                ...state,
                modules: action.payload
            };
        case MODULE_TITLE:
            if (validateName(action.payload)) {
                return {
                    ...state,
                    moduleTitle: {
                        ...state.moduleTitle,
                        value: action.payload,
                        errorStatus: false,
                    },
                };
            } else {
                return {
                    ...state,
                    moduleTitle: {
                        ...state.moduleTitle,
                        value: action.payload,
                        errorStatus: true,
                        errormessage:"please enter valid sprint name"
                    },
                };
            }
        case TARGET_DATE:
            return {
                ...state,
                date: {
                    ...state.date,
                    value: action.payload,
                    errorStatus: false,
                },
            };
            case START_DATE:
            return {
                ...state,
                startDate: {
                    ...state.startDate,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case MODIFY_MODULE:
            // console.log(action.payload)
            return {
                ...state,
                moduleTitle: {
                    ...state.moduleTitle,
                    value: action.payload.moduleTitle,
                    errorStatus: false
                },
                moduleId: {
                    ...state.moduleId,
                    value: action.payload.moduleId,
                    errorStatus: false
                },
                startDate: {
                    ...state.startDate,
                    value: action.payload.startDate,
                    errorStatus: false
                },
                date: {
                    ...state.date,
                    value: action.payload.date,
                    errorStatus: false
                },
                sprint_status: {
                    ...state.sprint_status,
                    value: action.payload.sprint_status,
                    errorStatus: false
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
