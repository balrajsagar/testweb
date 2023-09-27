import { SELECTED, SELECT_USER, USERS, IS_LOADING , IS_LOADED} from "./action";

const selectUser = { id: 0, name: "Select RO", status: 0 };
export const initialState = {
    users: [selectUser],
    userSelected: "",
    selectedIndex: 0,
};

export function roReducer(state = initialState, action) {
    switch (action.type) {
        case USERS:
            return { ...state, users: state.users.concat(action.payload) };
        case SELECT_USER:
            return {
                ...state,
                userSelected: action.payload
            };
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