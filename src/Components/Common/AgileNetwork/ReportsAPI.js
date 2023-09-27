import {
    axiosInstance
  } from "./AxiosConfig";
  
  export default class ReportsAPI {
  
    static async get(endpoint,  isTokenRequired = false) {
      var headers={}
      headers["isTokenRequired"]=isTokenRequired
      let response = await axiosInstance.get(endpoint,
        {
          headers:headers
        });
      switch (response.status) {
        case 200:
          return response.data;
        default:
          throw Error("Sorry something went wrong .Please try again later");
      }
    }
  
    static async post(endpoint, data={},headers={}, isTokenRequired = false) {
      headers["isTokenRequired"]=isTokenRequired
      let response = await axiosInstance.post(endpoint, data, {
        headers:headers
      });    
      switch (response.status) {
        case 200:
          return response.data;
        case 201:
          return "Created Successfully";
        default:
          throw Error("Sorry something went wrong .Please try again later");
      }
    }
  
    static async delete(endpoint,  data={},headers={}, isTokenRequired = false) {
      let response = await axiosInstance.delete(endpoint, data);
      switch (response.status) {
        case 200:
          return response.data;
        default:
          throw Error("Sorry something went wrong .Please try again later");
      }
    }
  
    static async update(endpoint,  data={},headers={}, isTokenRequired = false) {
      let response = await axiosInstance.patch(endpoint, data);
      switch (response.status) {
        case 200:
          return "Updated Successfully";
        default:
          throw Error("Sorry something went wrong .Please try again later");
      }
    }
  }
