export const  GROUP_NAME= "GROUP_NAME";
export const GROUP_LIST = "GROUP_LIST";
export const TASK_COMMENTS = "TASK_COMMENTS";
export const COMMENT = "COMMENT";
export const GROUP_EMAIL = "GROUP_EMAIL";
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
//Group Name
export const groupName = (groupName) => {
    return {
        type: GROUP_NAME,
        payload: groupName
    };
};
//Group Members
export const groupList = (groupList) => {
    return {
        type: GROUP_LIST,
        payload: groupList
    };
};
export const groupEmail = (groupEmail) => {
    return {
        type: GROUP_EMAIL,
        payload: groupEmail
    };
};
//Group comments
export const taskComments = (comments) => {
    return {
        type: TASK_COMMENTS,
        payload: comments
    };
};
//Write Comment
export const comment = (comment) => {
    return {
        type: COMMENT,
        payload: comment
    };
};

export function isLoading() {
    return { type: IS_LOADING };
  }
  export function isLoaded() {
    return { type: IS_LOADED }
  }