import {
    IS_LOADED,
    IS_LOADING,
    SECTION,
    GET_USER,
    EMPLOYEES,
    MODULES,
    SPRINT,
    CALENDARDASHSTORY,
    EVENTS,
    ALLPROJETS,
  } from "./action";
  
  export const initialState = {
    isLoading: false,
    employees: [],
    user:[],
    section: [],
    modules: [],
    sprint: {},
    calendarDashStory: [],
    events: [],
    allProjects: [],
  };
  
  export function reducer(state, action) {
    switch (action.type) {
      case IS_LOADING:
        return { ...state, isLoading: true };
      case IS_LOADED:
        return {
          ...state,
          isLoading: false,
        };
        case EVENTS : 
        return {
          ...state,
          events: action.payLoad,
        }
        case ALLPROJETS :
          return {
            ...state,
            allProjects: action.payLoad,
          }
        case CALENDARDASHSTORY :
          return {
                ...state,
                calendarDashStory: action.payLoad,
        };
        case SPRINT :
          return {
                ...state,
                sprint: action.payLoad,
        };
        case SECTION :
        return {
              ...state,
              section: action.payLoad,
      };
        case EMPLOYEES:
            return {
                ...state,
                employees: action.payload
            };
            case MODULES:
            return {
                ...state,
                modules: action.payLoad
            };
      case GET_USER :
        return {...state, user : state.user.concat(action.payLoad)}
      default:
        return state;
    }
  }
  