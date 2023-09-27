export const STR_PROPERTIES = "STR_PROPERTIES"
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export const WEB_PROPERTIES = "WEB_PROPERTIES"

export const properties = (properties) => {
  return {
    type: STR_PROPERTIES,
    payload: properties
  };
};

export const webProperties = (properties) => {
  return {
    type: WEB_PROPERTIES,
    payload: properties
  };
}

export function isLoading() {
  return { type: IS_LOADING };
}
export function isLoaded() {
  return { type: IS_LOADED }
}