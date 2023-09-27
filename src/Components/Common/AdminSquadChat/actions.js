export const TASK_COMMENTS = "TASK_COMMENTS";
export const COMMENT = "COMMENT";
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
//User comments
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