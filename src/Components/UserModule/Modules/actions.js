export const MODULES = "MODULES"
export const MODULE_TITLE = "MODULE_TITLE"
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export const INVOVLED_EMPLOYEES='INVOVLED_EMPLOYEES'
export const TO_DO = "TO_DO";
export const DOING = "DOING";
export const ROADBLOCK = "ROADBLOCK";
export const DONE = "DONE";
export const TASKS_COUNT = "TASKS_COUNT";
export const TASK_STATUS = "TASK_STATUS";
export const TASK_DESCRIPTION = "TASK_DESCRIPTION";
export const USER_ROADBLOCKS = "USER_ROADBLOCKS"
export const ALLMESSAGES = "ALLMESSAGES";
export const WORKING_HOURS = 'WORKING_HOURS';
export const WORKING_DAYS = 'WORKING_DAYS'
export const ACTIVE_SPRINT = "ACTIVE_SPRINT"
export const SELECT_SPRINT = "SELECT_SPRINT"
export const ACTIVE_USER_STORY = "ACTIVE_USER_STORY"
export const TO_DO_FILTER = "TO_DO_FILTER"
export const DOING_FILTER = "DOING_FILTER"
export const DONE_FILTER = "DONE_FILTER"
export const ROADBLOCK_FILTER = "ROADBLOCK_FILTER"

export const modules = (modules) => {
    return {
        type: MODULES,
        payload: modules
    };
};
export const involvedEmployees = (employees) => {
    return {
        type: INVOVLED_EMPLOYEES,
        payload: employees
    };
};

export const moduleTitle = (title) => {
    return {
        type: MODULE_TITLE,
        payload: title
    };
};
export const allMessages = (allMessages) => {
    // console.log(allMessages)
    return {
        type: ALLMESSAGES,
        payload: allMessages
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

//set authentication data
export const todo = (todo) => {
    return {
        type: TO_DO,
        payload: todo
    };
};
export const doing = (doing) => {
    return {
        type: DOING,
        payload: doing
    };
};
export const done = (done) => {
    return {
        type: DONE,
        payload: done
    };
};
export const roadblock = (roadblock) => {
    return {
        type: ROADBLOCK,
        payload: roadblock
    };
};
export const todoFilter = (todo) => {
    return {
        type: TO_DO_FILTER,
        payload: todo
    };
};
export const doingFilter = (doing) => {
    return {
        type: DOING_FILTER,
        payload: doing
    };
};
export const doneFilter = (done) => {
    return {
        type: DONE_FILTER,
        payload: done
    };
};
export const roadblockFilter = (roadblock) => {
    return {
        type: ROADBLOCK_FILTER,
        payload: roadblock
    };
};
//for tasks count
export const tasksCount = (tasksCount) => {
    return {
        type: TASKS_COUNT,
        payload: tasksCount
    };
};
export const taskStatus = (status) => {
    return {
        type: TASK_STATUS,
        payload: status
    };
};
export const taskDescription = (description) => {
    return {
        type: TASK_DESCRIPTION,
        payload: description
    };
};
export const userRoadblock = (userRoadblock) => {
    return {
        type: USER_ROADBLOCKS,
        payload: userRoadblock
    };
};
export const activeSprint = (sprint) => {
    // console.log(sprint)
    return {
        type: ACTIVE_SPRINT,
        payload: sprint
    };
};
export const activeUserStory = (story) => {
    // console.log(story)
    return {
        type: ACTIVE_USER_STORY,
        payload: story
    };
};
export function sprintSelected(story){
    return { type:SELECT_SPRINT,
    payload:story}
 }
export function isLoading() {
    return { type: IS_LOADING };
  }
  export function isLoaded() {
    return { type: IS_LOADED }
  }