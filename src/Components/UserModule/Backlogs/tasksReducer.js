import { TEMPLATE, TARGET_DATE, COMPLETED, ALLMESSAGES, IS_LOADED, UNASSIGNED_TASKS, PROJECTS, IS_LOADING, EPIC, PENDING_TASKS, MODULES, SPRINT, EPICID, ACTIVE_SPRINT, INVOVLED_EMPLOYEES, SPRINT_SELECTED, EMPLOYEES, CURRENT_SPRINT_TASKS, WORKING_HOURS, WORKING_DAYS, SELECT_USER, SELECT_DEVICE_ID, USERS, SELECT_PLAYER_ID, SELECT_STORY } from "./actions";

const initialValue = {
    value: "",
    errorStatus: false,
    errorMessage: "Please Enter valid ",
};
export const initialState = {
    modules: [],
    sprintSelected: initialValue,
    epicIdSelected: initialValue,
    epicSelected: initialValue,
    completedTasks: [],
    pendingTasks: [],
    unassignedTasks: [],
    allMessages: [],
    workingHours: [],
    workingDays: [],
    sprints: [],
    employees: [],
    currentTasks: [],
    involvedEmployees: [],
    activeSprint: {},
    projects: [],
    targetDate: initialValue,
    template: [],
    users: [],
    device_id: "",
    player_id: "",
    userSelected: "",
    selectedIndex: 0,
    storySelected: 0,



};

export function tasksReducer(state = initialState, action) {

    switch (action.type) {
        case TEMPLATE:
            return {
                ...state,
                template: action.payload
            };
        case MODULES:
            return {
                ...state,
                modules: action.payload
            };
        case PROJECTS:
            return {
                ...state,
                projects: action.payload
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

        case ALLMESSAGES:
            return {
                ...state,
                allMessages: action.payload
            };
        case WORKING_HOURS:
            return {
                ...state,
                workingHours: action.payload
            };
        case WORKING_DAYS:
            return {
                ...state,
                workingDays: action.payload
            };
        case INVOVLED_EMPLOYEES:
            return {
                ...state,
                involvedEmployees: action.payload
            };
        case ACTIVE_SPRINT:
            return {
                ...state,
                activeSprint: action.payload
            };
        case USERS:
            return { ...state, users: state.users.concat(action.payload) };
        case SELECT_USER:
            return {
                ...state,
                userSelected: action.payload
            };
        case SELECT_DEVICE_ID:
            return {
                ...state,
                device_id: action.payload
            };
        case SELECT_PLAYER_ID:
            return {
                ...state,
                player_id: action.payload
            };
        case SELECT_STORY:
            return {
                ...state,
                storySelected: action.payload
            };
        case SPRINT_SELECTED:
            return {
                ...state,
                sprintSelected: {
                    ...state.sprintSelected,
                    value: action.payload,
                    errorStatus: false,
                },
            }
        case EPIC:
            return {
                ...state,
                epicSelected: {
                    ...state.epicSelected,
                    value: action.payload,
                    errorStatus: false,
                },
            }
        case EPICID:
            return {
                ...state,
                epicIdSelected: {
                    ...state.epicIdSelected,
                    value: action.payload,
                    errorStatus: false,
                },
            }
        case SPRINT:
            return {
                ...state,
                sprints: action.payload
            };
        case COMPLETED:
            return {
                ...state,
                completedTasks: action.payload
            };
        case CURRENT_SPRINT_TASKS:
            return {
                ...state,
                currentTasks: action.payload
            };
        case PENDING_TASKS:
            return {
                ...state,
                pendingTasks: action.payload
            };
        case UNASSIGNED_TASKS:
            return {
                ...state,
                unassignedTasks: action.payload
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
        default:
            return state;
    }
}