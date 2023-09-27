export const MODULES = "MODULES"
export const MODIFY_MODULE = "MODIFY_MODULE"
export const TARGET_DATE = "TARGET_DATE"
export const START_DATE = "START_DATE"

export const MODULE_TITLE = "MODULE_TITLE"
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export const PROJECTS = "PROJECTS"

export function setModifyModule(moduleId,moduleTitle,date,startDate,sprint_status) {
    return {
      type: MODIFY_MODULE,
      payload: { moduleId,moduleTitle,date,startDate,sprint_status}
    }
  }

export const modules = (modules) => {
    return {
        type: MODULES,
        payload: modules
    };
};

export const moduleTitle = (title) => {
    return {
        type: MODULE_TITLE,
        payload: title
    };
};
export const targetDate = (date) => {
  return {
      type: TARGET_DATE,
      payload: date
  };
};
export const startDate = (date) => {
  return {
      type: START_DATE,
      payload: date
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
    };
};