import { TASKS_COUNT } from "../../UserModule/UserDashboard/actions";
import {THANKS_POINTS,AWARDS,SELECT_AWARD,AWARD_DESCRIPTION, IS_LOADED, IS_LOADING, MANAGE_TASKS, PROJECTS, ROAD_BLOCKS, SUB_TASKS, ALLMESSAGES, MAINTASKMESSAGES, ROADBLOCKMESSAGES } from "./action";
// eslint-disable-next-line
const initialValue = {
    value: "",
    errorStatus: false,
    errorMessage: "Please Enter valid ",
  };
export const initialState = {
    projects: [],
    subTasks: [],
    manageTasks: [],
    roadBlocks: [],
    tasksCount: {},
    allMessages:[],
    mainTaskMessages:[],
    roadBlockMessages:[],
    awardSelected: initialValue,
    awardDescription:initialValue,
    awards: [],
    thanksPoints: []
};
export function empInfoReducer(state = initialState, action) {

    switch (action.type) {
        case ROADBLOCKMESSAGES:
            return {
                ...state,
                roadBlockMessages: action.payload
            };
            case MAINTASKMESSAGES:
            return {
                ...state,
                mainTaskMessages: action.payload
            };
            case ALLMESSAGES:
            return {
                ...state,
                allMessages: action.payload
            };
        case PROJECTS:
            return {
                ...state,
                projects: action.payload
            };
        case MANAGE_TASKS:
            return {
                ...state,
                manageTasks: action.payload
            };
        case SUB_TASKS:
            return {
                ...state,
                subTasks: action.payload
            };
        case ROAD_BLOCKS:
            return {
                ...state,
                roadBlocks: action.payload
            };
        case TASKS_COUNT:
            return {
                ...state,
                tasksCount: action.payload
            };

            case AWARDS:
                return {
                    ...state,
                    awards: action.payload
                };
                case THANKS_POINTS:
                return {
                    ...state,
                    thanksPoints: action.payload
                };
                case SELECT_AWARD:
                    return {
                        ...state,
                        awardSelected: {
                            ...state.awardSelected,
                            value: action.payload,
                            errorStatus: false,
                        },
                };
                case AWARD_DESCRIPTION:
                    return {
                        ...state,
                        awardDescription: {
                            ...state.awardDescription,
                            value: action.payload,
                            errorStatus: false,
                        },
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
