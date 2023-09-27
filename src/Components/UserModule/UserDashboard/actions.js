export const TO_DO = "TO_DO";
export const DOING = "DOING";
export const ROADBLOCK = "ROADBLOCK";
export const DONE = "DONE";
export const TASKS_COUNT = "TASKS_COUNT";
export const TASK_STATUS = "TASK_STATUS";
export const TASK_DESCRIPTION = "TASK_DESCRIPTION";
export const USER_ROADBLOCKS = "USER_ROADBLOCKS"
export const ALLMESSAGES = 'ALLMESSAGES'
export const WORKING_HOURS = "WORKING_HOURS"
export const WORKING_DAYS = "WORKING_DAYS"

export const allMessages = (allMessages) => {
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

export const workingDays = (workingDays) => {
    return {
        type: WORKING_DAYS,
        payload: workingDays
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