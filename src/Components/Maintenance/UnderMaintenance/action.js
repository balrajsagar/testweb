export const IS_LOADING = "IS_LOADING";
export const IS_LOADED = "IS_LOADED";
export const CHECK_SERVER = "CHECK_SERVER";
export const SERVER_REDIRECT = "SERVER_REDIRECT";

export function isLoading() {
    return { type: IS_LOADING };
  }
  export function isLoaded() {
    return { type: IS_LOADED };
  }
  export function serverRedirect(server) {
    // console.log("server"+server)
    return {
      type: SERVER_REDIRECT,
      payLoad: server
    }
  }