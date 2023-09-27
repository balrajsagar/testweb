export const PENDING = "PENDING"
export const COMPLETED = "COMPLETED"
export const MANAGE_TASKS = "MANAGE_TASKS"
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export const ALLMESSAGES = 'ALLMESSAGES'

export const pendingTasks = (pending) => {
    return {
        type: PENDING,
        payload: pending
    };
};

export const allMessages = (allMessages) => {
    return {
        type: ALLMESSAGES,
        payload: allMessages
    };
  };

export const completedTasks = (completed) => {
    return {
        type: COMPLETED,
        payload: completed
    };
};

export const manageTasks = (manageTasks) => {
    return {
        type: MANAGE_TASKS,
        payload: manageTasks
    };
};
export function isLoading() {
    return { type: IS_LOADING };
  }
  export function isLoaded() {
    return { type: IS_LOADED }
  }