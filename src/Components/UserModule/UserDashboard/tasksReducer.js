import { WORKING_DAYS, WORKING_HOURS } from '../Modules/actions';
import { TO_DO, DOING, ROADBLOCK, DONE, TASKS_COUNT, TASK_STATUS, TASK_DESCRIPTION, USER_ROADBLOCKS, ALLMESSAGES } from './actions'

export const initialState = {
  todo: [],
  doing: [],
  done: [],
  roadblock: [],
  userRoadblock:[],
  tasksCount: {},
  taskStatus: 0,
  allMessages: [],
  workingHours: [],
  workingDays: [],
  taskDescription: ""
};
export function tasksReducer(state = initialState, action) {

  switch (action.type) {
    case TO_DO:
      return {
        ...state,
        todo: action.payload
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
    default:
      return state;
  }
}


