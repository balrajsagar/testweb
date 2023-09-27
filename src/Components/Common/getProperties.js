import { getToken } from "./LocalStorage";

export const getProperties = () => {
     var prodata = {};
     if (getToken('properties') !== null) {
          prodata = JSON.parse(getToken('properties'))
     } else {
          prodata = {}
     }
     return prodata;
}

export const getWebProperties = () => {
     var prodata = {};
     if (getToken('web_properties') !== null) {
          prodata = JSON.parse(getToken('web_properties'))
     } else {
          prodata = {}
     }
     return prodata;
}