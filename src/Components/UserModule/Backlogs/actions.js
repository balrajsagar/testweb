export const SPRINT = "SPRINT"
export const MODULES = "MODULES"
export const COMPLETED = "COMPLETED"
export const PENDING_TASKS = "PENDING_TASKS"
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export const SPRINT_SELECTED = "SPRINT_SELECTED"
export const ALLMESSAGES = 'ALLMESSAGES'
export const EMPLOYEES = "EMPLOYEES"
export const EPICID="EPICID"
export const CURRENT_SPRINT_TASKS="CURRENT_SPRINT_TASKS"
export const INVOVLED_EMPLOYEES='INVOVLED_EMPLOYEES'
export const ACTIVE_SPRINT = "ACTIVE_SPRINT"
export const UNASSIGNED_TASKS="UNASSIGNED_TASKS"
export const PROJECTS = "PROJECTS"
export const EPIC = "EPIC"
export const TARGET_DATE='TARGET_DATE'
export const TEMPLATE = "TEMPLATE"
export const WORKING_HOURS = "WORKING_HOURS"
export const WORKING_DAYS = 'WORKING_DAYS'
export const USERS = "USERS"
export const SELECT_PLAYER_ID = "SELECT_PLAYER_ID"
export const SELECT_USER ="SELECT_USER"
export const SELECT_DEVICE_ID = "SELECT_DEVICE_ID"
export const SELECT_STORY = "SELECT_STORY"



export const template = (template) => {
    return {
        type: TEMPLATE,
        payload: template
    };
};
export const involvedEmployees = (employees) => {
    return {
        type: INVOVLED_EMPLOYEES,
        payload: employees
    };
};


export const targetDate = (date) => {
    return {
        type: TARGET_DATE,
        payload: date
    };
  };

export const activeSprint = (sprint) => {
    // console.log(sprint)
    return {
        type: ACTIVE_SPRINT,
        payload: sprint
    };
};

export const workingHours = (workingHours) => {
    return {
        type: WORKING_HOURS,
        payload: workingHours
    };
  };
  
  export const workingDays = (workingdays) => {
    return {
        type: WORKING_DAYS,
        payload: workingdays
    };
  };

export const allMessages = (allMessages) => {
    return {
        type: ALLMESSAGES,
        payload: allMessages
    };
};

export const employees = (employees) => {
    return {
        type: EMPLOYEES,
        payload: employees
    };
};

export const sprints = (sprint) => {
    return {
        type: SPRINT,
        payload: sprint
    };
};

export const sprintSelected = (sprint) => {
    return {
        type: SPRINT_SELECTED,
        payload: sprint
    };
};

export const epicIdSelected = (epicId) => {
    return {
        type: EPICID,
        payload: epicId
    };
};

export const completedTasks = (completed) => {
    return {
        type: COMPLETED,
        payload: completed
    };
};

export const pendingTasks = (pendingTasks) => {
    return {
        type: PENDING_TASKS,
        payload: pendingTasks
    };
};
export const unAssignedTasks = (unassignedTasks) => {
    return {
        type: UNASSIGNED_TASKS,
        payload: unassignedTasks
    };
};


export const currentSptintTasks = (currentTasks) => {
    return {
        type: CURRENT_SPRINT_TASKS,
        payload: currentTasks
    };
};
export const modules = (modules) => {
    return {
        type: MODULES,
        payload: modules
    };
};
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
export function epicSelected(epic){
    return { type:EPIC,
    payload:epic}
 }
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
 export function userPlayerSelected(player_id){
    return { type:SELECT_PLAYER_ID,
    payload:player_id}
 }

 export function storySelected(story){
    return { type:SELECT_STORY,
    payload:story}
 }