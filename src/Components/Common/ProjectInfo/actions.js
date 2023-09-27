export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export const MODULES = "MODULES";
export const MANAGE_TASKS = "MANAGE_TASKS";
export const SUB_TASKS = "SUB_TASKS";
export const ROADBLOCKS = "ROADBLOCKS"
export const ALLMESSAGES = 'ALLMESSAGES'
export const MAINTASKMESSAGES = 'MAINTASKMESSAGES'
export const ROADBLOCKMESSAGES = 'ROADBLOCKMESSAGES'

export const allMessages = (allMessages) => {
    return {
        type: ALLMESSAGES,
        payload: allMessages
    };
  };

  export const mainTaskMessages = (mainTaskMessages) => {
    return {
        type: MAINTASKMESSAGES,
        payload: mainTaskMessages
    };
  };

  export const roadBlockMessages = (roadBlockMessages) => {
    return {
        type: ROADBLOCKMESSAGES,
        payload: roadBlockMessages
    };
  };

export const modules = (modules) => {
    return {
        type: MODULES,
        payload: modules
    };
};
export const subTasks = (subTasks) => {
    return {
        type: SUB_TASKS,
        payload: subTasks
    };
};
export const manageTasks = (manageTasks) => {
    return {
        type: MANAGE_TASKS,
        payload: manageTasks
    };
};
export const roadblocks = (roadblocks) => {
    return {
        type: ROADBLOCKS,
        payload: roadblocks
    };
};
export function isLoading() {
    return { type: IS_LOADING };
}
export function isLoaded() {
    return { type: IS_LOADED }
}