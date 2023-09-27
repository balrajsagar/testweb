export const EMPLOYEES = "EMPLOYEES"
export const GROUP_TITLE = "GROUP_TITLE"
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export const DETAILS = 'DETAILS'
export const ALLMESSAGES = 'ALLMESSAGES'
export const EDIT_GROUP = 'EDIT_GROUP'

export const setEditGroup = (id,title) =>{
    return {
        type: EDIT_GROUP,
        payload: {id,title}
    };
}
export const allMessages = (allMessages) => {
    return {
        type: ALLMESSAGES,
        payload: allMessages
    };
};
export const details = (details) => {
    return {
        type: DETAILS,
        payload: details
    };
};
export const title = (title) => {
    return {
        type: GROUP_TITLE,
        payload: title
    };
};
export const employees = (employees) => {
    return {
        type: EMPLOYEES,
        payload: employees
    };
};
export function isLoading() {
    return { type: IS_LOADING };
}
export function isLoaded() {
    return { type: IS_LOADED }
}