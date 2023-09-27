import {
    SET_CURRENT_USER,
} from '../Actions/actions';
import Axios from 'axios';
import { roadblock, todo, doing, done, tasksCount } from '../../UserModule/UserDashboard/actions';
import { clearToken } from '../LocalStorage';

//set authentication data
export const setCurrentUser = (tokenDetails) => {
    return {
        type: SET_CURRENT_USER,
        payload: tokenDetails
    };
};

export const logoutUser = (dispatch) => {
    // Remove token from local storage
    // localStorage.removeItem('token');
    // localStorage.removeItem('auth')
    // localStorage.removeItem('roleCount')
    // localStorage.removeItem('user')
    clearToken()
    // Remove auth header for future requests
    localStorage.removeItem('persist:root');
    delete Axios.defaults.headers.common['x-access-token'];
    dispatch(todo([]));
    dispatch(doing([]));
    dispatch(done([]));
    dispatch(roadblock([]));
    dispatch(tasksCount({}))
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};