export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export const MANAGE_SUB_TASKS = "MANAGE_SUB_TASKS"
export const ALLMESSAGES = 'ALLMESSAGES'
export const manageSubTasks = (manageSubTasks) => {
    return {
        type: MANAGE_SUB_TASKS,
        payload: manageSubTasks
    };
};

export const allMessages = (allMessages) => {
  return {
      type: ALLMESSAGES,
      payload: allMessages
  };
};

export function isLoading() {
    return { type: IS_LOADING };
  }
  export function isLoaded() {
    return { type: IS_LOADED }
  }