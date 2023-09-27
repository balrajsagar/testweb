export const ROADBLOCK_TITLE = "ROADBLOCK_TITLE";
export const TASK_TITLE = "TASK_TITLE"
export const TASK_DESCRIPTION = "TASK_DESCRIPTION"
export const DAYS = "DAYS"
export const HOURS = "HOURS"
export const USERS = "USERS"
export const SELECTED = "SELECTED"
export const SELECT_USER ="SELECT_USER"
export const DEPENDENCY_USER = "DEPENDENCY_USER"
export const SELECT_DEPENDENCY ="SELECT_DEPENDENCY"
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export const MODIFY_ROADBLOCK = "MODIFY_ROADBLOCK"
export const SELECT_SEVERITY = "SELECT_SEVERITY"
export const SELECT_PRIORITY = "SELECT_PRIORITY"
export const ACCEPTANCE_CRITERIA = "ACCEPTANCE_CRITERIA"
export const SELECT_STORY ="SELECT_STORY"
//Group Name

export function setModifyRoadBlock(taskTitle,roadblockTitle,days,hours,userSelected,severitySelected,prioritySelected) {
    return {
      type: MODIFY_ROADBLOCK,
      payload: {taskTitle,roadblockTitle,days,hours,userSelected,severitySelected,prioritySelected}
    }
}

export const roadBlockTitle = (title) => {
    return {
        type: ROADBLOCK_TITLE,
        payload: title
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
 export function severitySelected(severity){
    return { type:SELECT_SEVERITY,
    payload:severity}
 }
 export function prioritySelected(priority){
    return { type:SELECT_PRIORITY,
    payload:priority}
 }

 export function isLoading() {
    return { type: IS_LOADING };
  }
  export function isLoaded() {
    return { type: IS_LOADED }
  }
  export const acceptanceCriteria = (acceptanceCriteria) => {
    return {
        type: ACCEPTANCE_CRITERIA,
        payload: acceptanceCriteria
    };
};

export function storySelected(story){
    return { type:SELECT_STORY,
    payload:story}
 }