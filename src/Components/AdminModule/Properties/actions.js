export const PROPERTIES = "PROPERTIES"
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export const IMP_PROPERTIES = 'IMP_PROPERTIES'


export const properties = (props) => {
    return {
        type: PROPERTIES,
        payload: props
    };
};

export const impProperties = (imp_props) => {
  return {
      type: IMP_PROPERTIES,
      payload: imp_props
  };
};

export function isLoading() {
    return { type: IS_LOADING };
  }
  export function isLoaded() {
    return { type: IS_LOADED }
  }