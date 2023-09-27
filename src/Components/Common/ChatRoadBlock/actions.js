export const  GROUP_NAME= "GROUP_NAME";
export const GROUP_LIST = "GROUP_LIST";
export const TASK_COMMENTS = "TASK_COMMENTS";
export const COMMENT = "COMMENT";
export const GROUP_EMAIL = "GROUP_EMAIL";
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
// group emails
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