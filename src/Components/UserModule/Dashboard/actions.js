export const NEW_PROJECT = "NEW_PROJECT"
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export const SET_REDIRECT='SET_REDIRECT'
export const ALL_PROJECTS = "ALL_PROJECTS";
export const ALLMESSAGES = "ALLMESSAGES";
export const ALLMESSAGESUSER = "ALLMESSAGESUSER";
export const ALLGROUPMESSAGES = 'ALLGROUPMESSAGES'

export const allGroupMessages = (allGroupMessages) => {
    // console.log(allMessages)
    return {
        type: ALLGROUPMESSAGES,
        payload: allGroupMessages
    };
  };
export const allMessagesUser = (allMessagesUser) => {
    // console.log(allMessages)
    return {
        type: ALLMESSAGESUSER,
        payload: allMessagesUser
    };
  };
export const allMessages = (allMessages) => {
    // console.log(allMessages)
    return {
        type: ALLMESSAGES,
        payload: allMessages
    };
  };

export const allProjects = (projects) => {
    // console.log(allMessages)
    return {
        type: ALL_PROJECTS,
        payload:projects
    };
  };


export const newProject = (new_project) => {
    return {
        type: NEW_PROJECT,
        payload: new_project
    };
};
export const setRedirect = (redirect) => {
    return {
        type: SET_REDIRECT,
        payload:redirect
    };
};
export function isLoading() {
    return { type: IS_LOADING };
}
export function isLoaded() {
    return { type: IS_LOADED }
}