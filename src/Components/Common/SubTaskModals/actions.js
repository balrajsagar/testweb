export const MANAGE_SUB_TASKS = "MANAGE_SUB_TASKS"
export const MODIFY_SUB_TASK = "MODIFY_SUB_TASK"
export const TASK_TITLE = "TASK_TITLE"
export const TASK_DESCRIPTION = "TASK_DESCRIPTION"
export const DAYS = "DAYS"
export const HOURS = "HOURS"
export const USERS = "USERS"
export const SELECT_USER ="SELECT_USER"
export const SELECTED = "SELECTED"
export const DEPENDENCY_USER = "DEPENDENCY_USER"
export const SELECT_DEPENDENCY ="SELECT_DEPENDENCY"
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export const ALLMESSAGES = 'ALLMESSAGES'
export const TARGET_DATE='TARGET_DATE'


export const allMessages = (allMessages) => {
    return {
        type: ALLMESSAGES,
        payload: allMessages
    };
  };
  
  export const targetDate = (date) => {
    return {
        type: TARGET_DATE,
        payload: date
    };
  };
export function setModifySubTask(mainTaskId,subTaskId,taskTitle,taskDescription,days,hours) {
    return {
      type: MODIFY_SUB_TASK,
      payload: {mainTaskId,subTaskId,taskTitle,taskDescription,days,hours}
    }
}

export const manageSubTasks = (manageSubTasks) => {
    return {
        type: MANAGE_SUB_TASKS,
        payload: manageSubTasks
    };
};

export const taskTitle = (taskTitle) => {
    return {
        type: TASK_TITLE,
        payload: taskTitle
    };
};

export const taskDescription = (taskDescription) => {
    return {
        type: TASK_DESCRIPTION,
        payload: taskDescription
    };
};

export const days = (days) => {
    return {
        type: DAYS,
        payload: days
    };
};

export const hours = (hours) => {
    return {
        type: HOURS,
        payload: hours
    };
};

export const users = (users) => {
    return {
        type: USERS,
        payload: users
    };
};
export function userSelected(user){
    return { type:SELECT_USER,
    payload:user}
 }
 export const dependencyUser = (dependency) => {
    return {
        type: DEPENDENCY_USER,
        payload: dependency
    };
};
export function dependencySelected(dependency){
    return { type:SELECT_DEPENDENCY,
    payload:dependency}
 }
export function isLoading() {
    return { type: IS_LOADING };
  }
  export function isLoaded() {
    return { type: IS_LOADED }
  }