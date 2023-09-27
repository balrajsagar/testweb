import {IS_LOADED,IS_LOADING,MURAL_TITLE,MURAL_BOARDS} from "./actions";
const initialValue = {
    value: "",
    errorStatus: false,
    errorMessage: "Please Enter valid ",
};


export const initialState = {
    muralTitle: initialValue,
    muralboards:[]
  };

export function tasksReducer(state = initialState, action) {

    switch (action.type) {
        case MURAL_TITLE:
            return{
                ...state,
                muralTitle: {
                    ...state.muralTitle,
                    value: action.payload,
                    errorStatus: false,
                }
            }
            case MURAL_BOARDS:
                return{
                    ...state,
                    muralboards:action.payload

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