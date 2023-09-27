import { IS_LOADED, IS_LOADING, MODULES, MODULE_TITLE, INVOVLED_EMPLOYEES, TO_DO, DOING, ROADBLOCK, DONE, TASKS_COUNT, TASK_STATUS, TASK_DESCRIPTION, USER_ROADBLOCKS, ALLMESSAGES, ACTIVE_SPRINT, SELECT_SPRINT, ACTIVE_USER_STORY, TO_DO_FILTER, DOING_FILTER, DONE_FILTER, ROADBLOCK_FILTER, WORKING_HOURS } from "./actions";

const initialValue = {
    value: "",
    errorStatus: false,
    errorMessage: "Please Enter valid ",
};
export const initialState = {
    modules: [],
    activeSprint:{},
    moduleTitle: initialValue,
    involvedEmployees: [],
    todo: [],
    doing: [],
    workingHours: [],
    workingDays: [],
    done: [],
    todoFilter: [],
    doingFilter: [],
    doneFilter: [],
    roadblockFilter: [],
    roadblock: [],
    userRoadblock: [],
    tasksCount: {},
    taskStatus: 0,
    allMessages: [],
    taskDescription: "",
    sprintSelected:initialValue,
    activeUserStory:[{openStatus:false}]
};

export function moduleReducer(state = initialState, action) {
    switch (action.type) {
        case MODULES:
            return {
                ...state,
                modules: action.payload
            };
            case ACTIVE_USER_STORY:
                return {
                    ...state,
                    activeUserStory: action.payload
                };
        case INVOVLED_EMPLOYEES:
            return {
                ...state,
                involvedEmployees: action.payload
            };
        case MODULE_TITLE:
            return {
                ...state,
                moduleTitle: {
                    ...state.moduleTitle,
                    value: action.payload,
                    errorStatus: false,
                },
            };
            case SELECT_SPRINT:
            return {
                ...state,
                sprintSelected: action.payload
            };
            case ACTIVE_SPRINT:
                return {
                    ...state,
                    activeSprint: action.payload
                };
        case TO_DO:
            return {
                ...state,
                todo: action.payload
            };
        case ALLMESSAGES:
            // console.log(action.payload)
            return {
                ...state,
                allMessages: action.payload
            };
        case WORKING_HOURS:
            return {
                ...state,
                workingHours: action.payload
            };
        case WORKING_HOURS:
            return {
                ...state,
                workingDays: action.payload
            };
        case DOING:
            return {
                ...state,
                doing: action.payload
            };
        case DONE:
            return {
                ...state,
                done: action.payload
            };
        case ROADBLOCK:
            return {
                ...state,
                roadblock: action.payload
            };
            case TO_DO_FILTER:
                return {
                    ...state,
                    todoFilter: action.payload
                };
            case DOING_FILTER:
                return {
                    ...state,
                    doingFilter: action.payload
                };
            case DONE_FILTER:
                return {
                    ...state,
                    doneFilter: action.payload
                };
            case ROADBLOCK_FILTER:
                return {
                    ...state,
                    roadblockFilter: action.payload
                };
        case TASKS_COUNT:
            return {
                ...state,
                tasksCount: action.payload
            };
        case TASK_STATUS:
            return {
                ...state,
                taskStatus: action.payload
            };
        case TASK_DESCRIPTION:
            return {
                ...state,
                taskDescription: action.payload
            };
        case USER_ROADBLOCKS:
            return {
                ...state,
                userRoadblock: action.payload
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
