export const MODULES = "MODULES"
export const MODULE_TITLE = "MODULE_TITLE"
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'

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

export function isLoading() {
    return { type: IS_LOADING };
  }
  export function isLoaded() {
    return { type: IS_LOADED }
  }