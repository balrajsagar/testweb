import { IS_LOADED, IS_LOADING, MODIFY_ROADBLOCK, SELECTED, ROADBLOCK_TITLE, TASK_TITLE, TASK_DESCRIPTION, HOURS,  DAYS, SELECT_USER, SELECT_DEPENDENCY, USERS, DEPENDENCY_USER, SELECT_SEVERITY, SELECT_PRIORITY ,SELECT_STORY, ACCEPTANCE_CRITERIA } from "./actions";
import { validateName } from '../validators'
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
    users: [selectUser],
    dependencyUser: [selectDependency],
    roadblockTitle: initialValue,
    taskTitle: initialValue,
    taskDescription: initialValue,
    days: initialEstimation,
    hours: initialEstimation,
    userSelected: initialValue,
    dependencySelected: "",
    prioritySelected: initialValue,
    severitySelected: initialValue,
    selectedIndex: 0,
    acceptanceCriteria:initialValue,
    storySelected:"",
  };

export function roadblockReducer(state = initialState, action) {
    switch (action.type) {
      case ROADBLOCK_TITLE:
          if(validateName(action.payload)){
            return {
                ...state,
                roadblockTitle: {
                  ...state.roadblockTitle,
                  value: action.payload,
                  errorStatus: false,
              },
              };
          }else{
            return {
                ...state,
                roadblockTitle: {
                  ...state.roadblockTitle,
                  value: action.payload,
                  errorStatus: true,
                    errormessage: "please enter valid title"
              },
              };
          }
        
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
                    userSelected: {
                        ...state.userSelected,
                        value: action.payload,
                        errorStatus: false,
                    },
            };
        case SELECT_DEPENDENCY:
            return {
                ...state,
                dependencySelected: action.payload
            };
            case SELECT_SEVERITY:
                return {
                    ...state,
                    severitySelected: {
                        ...state.severitySelected,
                        value: action.payload,
                        errorStatus: false,
                    },
            };
            case SELECT_PRIORITY:
                return {
                    ...state,
                    prioritySelected: {
                        ...state.prioritySelected,
                        value: action.payload,
                        errorStatus: false,
                    },
            };
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
        case SELECT_STORY:
            return {
                ...state,
                storySelected: action.payload
            };
            case MODIFY_ROADBLOCK:
                return {
                    ...state,
                    taskTitle: {
                        ...state.taskTitle,
                        value: action.payload.taskTitle,
                        errorStatus: false
                    },
                    roadblockTitle: {
                        ...state.roadblockTitle,
                        value: action.payload.roadblockTitle,
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
                    userSelected: {
                        ...state.userSelected,
                        value: action.payload.userSelected,
                        // errorStatus: false
                    },
                    storyPoints: {
                        ...state.storyPoints,
                        value: action.payload.storyPoints,
                        errorStatus: false
                    },
                    severitySelected: {
                        ...state.severitySelected,
                        value: action.payload.severitySelected,
                        // errorStatus: false
                    },
                    prioritySelected: {
                        ...state.prioritySelected,
                        value: action.payload.prioritySelected,
                        // errorStatus: false
                    },
                    acceptanceCriteria: {
                        ...state.acceptanceCriteria,
                        value: action.payload.acceptanceCriteria,
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