import axios from 'axios'
import { Reports_URL } from '../config'; //Reports url from config.js on v2.05


export const axiosInstance = axios.create({
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
    },
    baseURL: Reports_URL, //Reports url from config.js on v2.05
    responseType: "json"
});

const requestHandler = (request) => {
    if (request.headers.isTokenRequired) {
        request.headers.common['x-access-token'] = "empty"
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
