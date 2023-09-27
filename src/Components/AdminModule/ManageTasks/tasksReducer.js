import { COMPLETED, IS_LOADED, IS_LOADING, MANAGE_TASKS, PENDING } from "./actions";

// const initialValue = {
//     value: "",
//     errorStatus: false,
//     errorMessage: "Please Enter valid ",
// };
export const initialState = {
    pendingTasks: [],
    completedTasks: [],
    manageTasks: []
};

export function tasksReducer(state = initialState, action) {

    switch (action.type) {
        case PENDING:
            return {
                ...state,
                pendingTasks: action.payload
            };
        case COMPLETED:
            return {
                ...state,
                completedTasks: action.payload
            };
        case MANAGE_TASKS:
            return {
                ...state,
                manageTasks: action.payload
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
