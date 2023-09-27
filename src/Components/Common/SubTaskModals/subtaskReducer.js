import { IS_LOADED, IS_LOADING, SELECTED,TARGET_DATE, TASK_DESCRIPTION, TASK_TITLE, SELECT_USER, USERS, MODIFY_SUB_TASK, MANAGE_SUB_TASKS, HOURS, DAYS, DEPENDENCY_USER, SELECT_DEPENDENCY, ALLMESSAGES  } from "./actions";

const initialValue = {
    value: "",
    errorStatus: false,
    errorMessage: "Please Enter valid ",
};
const initialEstimation = {
    value: 0,
    errorStatus: false,
    errorMessage: "Please Enter valid ",
};
const selectUser = { id: 0, name: "Select User", status: 0 };
const selectDependency = { id: 0, name: "Select Dependency", status: 0 };
export const initialState = {
    manageSubTasks: [],
    users: [selectUser],
    dependencyUser: [selectDependency],
    taskTitle: initialValue,
    days: initialEstimation,
    hours: initialEstimation,
    userSelected: "",
    dependencySelected: "",
    selectedIndex: 0,
    taskDescription: initialValue,
    allMessages: [],
    targetDate: initialValue,

};

export function subtasksReducer(state = initialState, action) {
    switch (action.type) {
        case MANAGE_SUB_TASKS:
            return {
                ...state,
                manageSubTasks: action.payload
            };
            case ALLMESSAGES:
                return {
                    ...state,
                    allMessages: action.payload
                };
                case TARGET_DATE:
            return {
                ...state,
                targetDate: {
                    ...state.date,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case USERS:
            return { ...state, users: state.users.concat(action.payload) };
        case DEPENDENCY_USER:
            return { ...state, dependencyUser: state.dependencyUser.concat(action.payload) };
        case TASK_TITLE:
            return {
                ...state,
                taskTitle: {
                    ...state.taskTitle,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case TASK_DESCRIPTION:
            return {
                ...state,
                taskDescription: {
                    ...state.taskDescription,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case DAYS:
            return {
                ...state,
                days: {
                    ...state.days,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case HOURS:
            return {
                ...state,
                hours: {
                    ...state.hours,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case SELECT_USER:
            return {
                ...state,
                userSelected: action.payload
            };
        case SELECT_DEPENDENCY:
            return {
                ...state,
                dependencySelected: action.payload
            };
        case MODIFY_SUB_TASK:
            return {
                ...state,
                subTaskId: {
                    ...state.subTaskId,
                    value: action.payload.subTaskId,
                    errorStatus: false
                },
                taskTitle: {
                    ...state.taskTitle,
                    value: action.payload.taskTitle,
                    errorStatus: false
                },
                taskDescription: {
                    ...state.taskDescription,
                    value: action.payload.taskDescription,
                    errorStatus: false
                },
                days: {
                    ...state.days,
                    value: action.payload.days,
                    errorStatus: false
                },
                hours: {
                    ...state.hours,
                    value: action.payload.hours,
                    errorStatus: false
                },
            }
        case SELECTED:
            return { ...state, selectedIndex: action.payload };
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
