export const EMPLOYEES = "EMPLOYEES"
export const GROUP_TITLE = "GROUP_TITLE"
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export const DETAILS = 'DETAILS'
export const COMMENT = 'COMMENT'
export const TASK_COMMENTS = 'TASK_COMMENTS'
export const GROUP_NAME = 'GROUP_NAME'
export const GROUP_LIST = 'GROUP_LIST'
export const GROUP_EMAIL = 'GROUP_EMAIL'
export const EDIT_GROUP = 'EDIT_GROUP'

export const setEditGroup = (id,title) =>{
    return {
        type: EDIT_GROUP,
        payload: {id,title}
    };
}
export const groupEmail = (groupEmail) => {
    return {
        type: GROUP_EMAIL,
        payload: groupEmail
    };
};
export const groupList = (groupList) => {
    return {
        type: GROUP_LIST,
        payload: groupList
    };
};
export const groupName = (groupName) => {
    return {
        type: GROUP_NAME,
        payload: groupName
    };
};
export const taskComments = (taskComments) => {
    return {
        type: TASK_COMMENTS,
        payload: taskComments
    };
};
export const comment = (comment) => {
    return {
        type: COMMENT,
        payload: comment
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