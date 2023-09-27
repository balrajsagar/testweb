import { validateName, validateDescription } from '../validators';
import { TEMPLATE,TARGET_DATE,IS_LOADED, IS_LOADING, SELECTED, TASK_DESCRIPTION,PRIORITY_LEVEL, TASK_TITLE,EPIC, SELECT_USER, USERS,PROJECTS, MANAGE_TASKS, MODIFY_MAIN_TASK,ALLMESSAGES, ACCEPTANCE_CRITERIA,SELECT_STORY, SELECT_DEVICE_ID, SELECT_PLAYER_ID} from "./actions";

const initialValue = {
    value: "",
    errorStatus: false,
    errorMessage: "Please Enter valid ",
};
const descriptionValue = {
    // value: "As a [person],____ I [want to],____ [so that]____",
    value: "",
    errorStatus: false,
    errorMessage: "Please Enter valid ",
};
export const initialState = {
    manageTasks: [],
    projects:[],
    users: [],
    taskTitle: initialValue,
    acceptanceCriteria:initialValue,
    device_id:"",
    player_id:"",
    userSelected: "",
    storySelected:"",
    epicSelected:"",
    prioritySelected:"",
    selectedIndex: 0,
    allMessages: [],
    taskDescription: descriptionValue,
    targetDate: initialValue,
    template: [],
};

export function tasksReducer(state = initialState, action) {
    switch (action.type) {
        case TEMPLATE:
            return {
                ...state,
                template: action.payload
            };
        case MANAGE_TASKS:
            return {
                ...state,
                manageTasks: action.payload
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
        case USERS:
            return { ...state, users: state.users.concat(action.payload) };
        case TASK_TITLE:
            if (validateName(action.payload)) {
            return {
                ...state,
                taskTitle: {
                    ...state.taskTitle,
                    value: action.payload,
                    errorStatus: false,
                },
            };}else{
                return {
                ...state,
                taskTitle: {
                    ...state.taskTitle,
                    value: action.payload,
                    errorStatus: true,
                    errormessage:"please enter the user story "
                },
           }; }
            case ACCEPTANCE_CRITERIA:
                if(validateName(action.payload)){
            return {
                ...state,
                acceptanceCriteria: {
                    ...state.acceptanceCriteria,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        }else{
            return {
                ...state,
                acceptanceCriteria: {
                    ...state.acceptanceCriteria,
                    value: action.payload,
                    errorStatus: true,
                    errormessage:"please enter acceptance criteria "
                },
            };
        }
        case TASK_DESCRIPTION:
            if(validateDescription(action.payload)){
            return {
                ...state,
                taskDescription: {
                    ...state.taskDescription,
                    value: action.payload,
                    errorStatus: false,
                },
            };}else{
                return {
                    ...state,
                    taskDescription: {
                        ...state.taskDescription,
                        value: action.payload,
                        errorStatus: true,
                        errormessage:"Please go with this format (As a [person],____ I [want to],____ [so that]____)"
                    },
                };
            }
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
            case EPIC:
            return {
                ...state,
                epicSelected: action.payload
            };
            case PRIORITY_LEVEL:
                return {
                    ...state,
                    prioritySelected: action.payload
                };
            case MODIFY_MAIN_TASK:
                return {
                    ...state,
                    taskId: {
                        ...state.taskId,
                        value: action.payload.taskId,
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
                    storyPoints: {
                        ...state.storyPoints,
                        value: action.payload.storyPoints,
                        errorStatus: false
                    },
                    priorityLevel: {
                        ...state.priorityLevel,
                        value: action.payload.priorityLevel,
                        errorStatus: false
                    },
                    targetDate: {
                        ...state.targetDate,
                        value: action.payload.targetDate,
                        errorStatus: false
                    },
                    id: {
                        ...state.id,
                        value: action.payload.id,
                        errorStatus: false
                    },
                    acceptanceCriteria: {
                        ...state.acceptanceCriteria,
                        value: action.payload.acceptanceCriteria,
                        errorStatus: false
                    },
                    moduleId: {
                        ...state.moduleId,
                        value: action.payload.moduleId,
                        errorStatus: false
                    },
                    ideaId: {
                        ...state.ideaId,
                        value: action.payload.ideaId,
                        errorStatus: false
                    },
                    device_id: action.payload.device_id,
                    player_id: action.payload.player_id,
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
