export const SPRINTS = "SPRINTS"
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export const USER_STORIES='USER_STORIES'
export const ALLMESSAGES = "ALLMESSAGES";
export const ARCHIVE_SUBTASKS="ARCHIVE_SUBTASKS"

export const allMessages = (allMessages) => {
    // console.log(allMessages)
    return {
        type: ALLMESSAGES,
        payload: allMessages
    };
  };


export const completedSprints = (sprints) => {
    return {
        type: SPRINTS,
        payload: sprints
    };
};
export const completedUserStories = (stories) => {
    return {
        type: USER_STORIES,
        payload: stories
    };
};
export const completedSubTasks = (tasks) => {
    return {
        type: ARCHIVE_SUBTASKS,
        payload: tasks
    };
};

export function isLoading() {
    return { type: IS_LOADING };
}
export function isLoaded() {
    return { type: IS_LOADED }
}