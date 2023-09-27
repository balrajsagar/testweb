export const MANAGE_TASKS = "MANAGE_TASKS"
export const MODIFY_MAIN_TASK = "MODIFY_MAIN_TASK"
export const TASK_TITLE = "TASK_TITLE"
export const ACCEPTANCE_CRITERIA = "ACCEPTANCE_CRITERIA"
export const TASK_DESCRIPTION = "TASK_DESCRIPTION"
export const USERS = "USERS"
export const SELECT_USER ="SELECT_USER"
export const SELECT_DEVICE_ID = "SELECT_DEVICE_ID"
export const SELECT_STORY ="SELECT_STORY"
export const SELECTED = "SELECTED"
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export const ALLMESSAGES = 'ALLMESSAGES'
export const PROJECTS = "PROJECTS"
export const PRIORITY_LEVEL='PRIORITY_LEVEL'
export const EPIC='EPIC'
export const TARGET_DATE='TARGET_DATE'
export const TEMPLATE = "TEMPLATE"
export const AGILE_PROJECTS ="AGILE_PROJECTS"
export const AGILE_PROJECT_SELECTED ="AGILE_PROJECT_SELECTED"


export const template = (template) => {
    return {
        type: TEMPLATE,
        payload: template
    };
};
export function setModifyMainTask(taskId,taskTitle,taskDescription,ideaId,moduleId,acceptanceCriteria,storyPoints,id,priorityLevel,targetDate,device_id) {
    return {
      type: MODIFY_MAIN_TASK,
      payload: {taskId,taskTitle,taskDescription,ideaId,moduleId,acceptanceCriteria,storyPoints,id,priorityLevel,targetDate,device_id}
    }
}

export const allMessages = (allMessages) => {
    return {
        type: ALLMESSAGES,
        payload: allMessages
    };
  };

export const manageTasks = (manageTasks) => {
    return {
        type: MANAGE_TASKS,
        payload: manageTasks
    };
};

export const taskTitle = (taskTitle) => {
    return {
        type: TASK_TITLE,
        payload: taskTitle
    };
};
export const acceptanceCriteria = (acceptanceCriteria) => {
    return {
        type: ACCEPTANCE_CRITERIA,
        payload: acceptanceCriteria
    };
};

export const taskDescription = (taskDescription) => {

    return {
        type: TASK_DESCRIPTION,
        payload: taskDescription
    };
};
export const targetDate = (date) => {
    return {
        type: TARGET_DATE,
        payload: date
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
 export function userDeviceSelected(device_id){
    return { type:SELECT_DEVICE_ID,
    payload:device_id}
 }
 export function storySelected(story){
    return { type:SELECT_STORY,
    payload:story}
 }
 export function epicSelected(epic){
    return { type:EPIC,
    payload:epic}
 }
 export function agileProjectSelected(agileProjectSelected){
    return { type:AGILE_PROJECT_SELECTED,
    payload:agileProjectSelected}
 }
 export function prioritySelected(priority){
    return { type:PRIORITY_LEVEL,
    payload:priority}
 }
export function isLoading() {
    return { type: IS_LOADING };
  }
  export function isLoaded() {
    return { type: IS_LOADED }
  }
  export const projects = (projects) => {
    return {
        type: PROJECTS,
        payload: projects
    }
}
export const agileProjects = (agileProjects) => {
    return {
        type: AGILE_PROJECTS,
        payload: agileProjects
    };
};