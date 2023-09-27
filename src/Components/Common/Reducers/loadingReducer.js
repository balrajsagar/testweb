import { IS_LOADED, IS_LOADING } from "../Actions/actions"

const loadingStatus = { status: false }

export function loadingReducer(state = loadingStatus, action) {
    switch (action.type) {
        case IS_LOADING:
            return { ...state, status: true }
        case IS_LOADED:
            return { ...state, status: false }
        default:
            return { ...state }
    }

}
