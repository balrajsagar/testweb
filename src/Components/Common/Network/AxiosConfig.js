import axios from 'axios'
import { getToken } from '../LocalStorage';
import { Server_URL } from '../config'; //server url from config.js on v2.0.5

export const axiosInstance = axios.create({
    headers: {
        'Accept': 'application/json',
        // 'Access-Control-Allow-Origin': '*',//comment
        'Content-Type': 'application/json;charset=UTF-8',
        'content-type': 'multipart/form-data',
        // eslint-disable-next-line
        'content-type': 'application/x-www-form-urlencoded',
    },
    baseURL: Server_URL, //server url from config.js on v2.0.5
    token: "task24x7.com",
    responseType: "json"
});

const requestHandler = (request) => {
    if (request.headers.isTokenRequired) {
        request.headers.common['x-access-token'] = getToken('auth')
    }
    delete request.headers.isTokenRequired
    return request
}

const errorHandler = (err) => {
    if (err.response) {
        switch (err.response.status) {
            case 400:
            case 401:
            case 406:
            case 409:
                throw Error(err.response.data.message);
            case 404:
                throw Error("Page Not Found");
            case 500:
                throw Error("Service Not Available");
            default:
                throw Error("Sorry Something Went Wrong");
        }
    }
    throw err
}
axiosInstance.interceptors.request.use((request) => requestHandler(request))
axiosInstance.interceptors.response.use(
    response => response
    , error => errorHandler(error)
)

