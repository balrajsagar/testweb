import React, { useState, useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setStatus, setToken, setRoleCount, getToken } from '../../Common/LocalStorage';
import jwt_decode from "jwt-decode";
import API from '../../Common/Network/API';
import Alert from '../../Common/Alert';
import { isLoaded, isLoading } from '../../Common/Actions/loading';
import { setCurrentUser } from '../../Common/Actions';
import { Redirect, Link } from 'react-router-dom';
import RootLoader from '../../Common/Loader/RootLoader'
import store from '../../Common/Store';
import { getModules, getActiveSprints, getAllTaskMessages } from '../../UserModule/Modules/network';
import { activeUserStory } from '../../UserModule/Modules/actions';
import { serverCheck } from '../../Maintenance/UnderMaintenance/network';
import { maintenanceReducer, serverInitialState } from '../../Maintenance/UnderMaintenance/maintenanceReducer';
import { getProps, getWebProps } from '../LandingPage/network';
import { landingReducer, initialState } from '../LandingPage/landingReducer';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import OneSignalReact from 'react-onesignal';
import { Client_URL } from '../../Common/config';
import { APP_NAME } from '../../Common/Headers';
// import { refreshTokenSetup } from './refreshToken';

export default function Login() {
    const clientId = '675290451823-qr6kd2kah3aingppsk96uq0i1v6tun2q.apps.googleusercontent.com';//google client Id for sso
    const getUser = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const loaderStatus = useSelector(state => state.loading.status)
    const [state1, dispatch2] = useReducer(landingReducer, initialState)
    // console.log(loaderStatus)
    const [data, setData] = useState({})
    const [redirect, setRedirect] = useState(false)
    const [enablePassword, setEnablePassword] = useState(false)
    const [state, dispatch1] = useReducer(maintenanceReducer, serverInitialState)
    const webProperties = useSelector(state => state.landingReducer.webProperties)
    useEffect(() => {
        fun()
        // eslint-disable-next-line
    }, [])
        const fun = () => {
            if (window.localStorage) {
                if (!localStorage.getItem('firstLoad')) {
                    localStorage['firstLoad'] = true;
                    window.location.reload();
                }
                else
                    localStorage.removeItem('firstLoad');
            }
        }
        
        useEffect(() => {
            serverCheck(dispatch1)
            getProps(state1, dispatch2);
            getWebProps(state1, dispatch2);
            onSuccessLogOut()
            // eslint-disable-next-line
        }, [])

    OneSignalReact.getUserId().then(function (userId) {
        setToken('player_id', userId) //store the token information  with exp
      });
    //For Redirecting Maintenance Page 
    if (state.server.value === "not connected" || state.server.value === "Network Error") {
        // console.log(JSON.stringify(state.server.value))
        return <Redirect to="/UnderMaintenance" />
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handlePasswordView = () => {
        setEnablePassword(!enablePassword)
    }
    // normal sign on using username and password
    const onLogin = async (e) => {
        e.preventDefault()
        store.dispatch(isLoading());
        if (data.username !== "" && data.password !== "") {
            try {
                // console.log(getToken('player_id'))
                const token = Buffer.from(`${data.email}:
                   ${data.password}`).toString('base64');
                const response = await API.post("authentication.php", {
                    username: data.username,
                    password: data.password,
                    action: 'login',
                    player_id: getToken('player_id')
                }, {
                    'Authorization': `Basic ${token}`
                });
                // console.log(response)

                if (response.status === "TRUE") {

                    setToken('auth', response.jwt) //store the token information  with exp
                    const tokenDetails = jwt_decode(response.jwt);
                    // console.log(tokenDetails.data)
                    setRoleCount('roleCount', tokenDetails.data.roleCount)
                    dispatch(setCurrentUser(tokenDetails.data)); //store the user information
                    setStatus('status', tokenDetails.data.empStatus)
                    getActiveSprints(dispatch, tokenDetails.data)
                    getModules(dispatch, tokenDetails.data);
                    getAllTaskMessages(dispatch, tokenDetails.data);
                    store.dispatch(activeUserStory([{ openStatus: false }]))
                    setRedirect(true)
                    store.dispatch(isLoaded());
                } else if (response.status === "False") {
                    setRoleCount('roleCount', response.roleCount)
                    setToken('empId', response.empId) //store the token information  with exp
                    setToken('user', response.username) //store the token information  with exp
                    // dispatch(setCurrentUser(response)); //store the user information
                    setRedirect(true)
                    // Alert('warning', response.message)
                    store.dispatch(isLoaded());

                }
                else {
                    store.dispatch(isLoaded());
                    Alert('warning', response.message)
                }
            }
            catch (error) {
                // Alert('error', error.message)
                store.dispatch(isLoaded());
            }
        } else {
            Alert('warning', "please fill the user credentials")
            store.dispatch(isLoaded());
        }
        setEnablePassword(false)
    }
    //google sign in using gmail
    const sso_onLogin = async (data) => {
        store.dispatch(isLoading());
        try {
            const response = await API.post("sso_authentication.php", {
                username: data.email,
                name: data.name,
                action: 'sso_sign_in',
                url: Client_URL,
                appName: APP_NAME
            }, {
            });
            if (response.status === "TRUE") {
                setToken('auth', response.jwt) //store the token information  with exp
                const tokenDetails = jwt_decode(response.jwt);
                setRoleCount('roleCount', tokenDetails.data.roleCount)
                dispatch(setCurrentUser(tokenDetails.data)); //store the user information
                setStatus('status', tokenDetails.data.empStatus)
                getActiveSprints(dispatch, tokenDetails.data)
                getModules(dispatch, tokenDetails.data);
                getAllTaskMessages(dispatch, tokenDetails.data);
                store.dispatch(activeUserStory([{ openStatus: false }]))
                setRedirect(true)
                store.dispatch(isLoaded());
            } else if (response.status === "False") {
                setRoleCount('roleCount', response.roleCount)
                setToken('empId', response.empId) //store the token information  with exp
                setToken('user', response.username) //store the token information  with exp
                // dispatch(setCurrentUser(response)); //store the user information
                setRedirect(true)
                store.dispatch(isLoaded());
            }
            else {
                store.dispatch(isLoaded());
                Alert('warning', response.message)
            }
        }
        catch (error) {
            Alert('error', error.message)
            store.dispatch(isLoaded());
        }
    }
    //google sign on
    const onSuccess = (res) => {
        sso_onLogin(res.profileObj) //Authentication based og google sign in
        // refreshTokenSetup(res);
    };
    //google sign in failure
    const onFailure = (res) => {
        console.log('Login failed: res:', res);
    };
    //google sign out
    const onSuccessLogOut = (res) => {
        console.log('Logout made successfully' + res);
    };

    if (redirect) {
        return <Redirect to="/squadRegister" />
    }

    const renderContent = () => {
        if (loaderStatus) {
            return <RootLoader />
        }
        return (
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper " >
                    <div className="content-wrapper d-flex align-items-center auth px-0 bglogin">
                        <div className="row w-100 mx-0">
                            <div className="col-lg-4 mx-auto">
                                <div className="auth-form-light text-left py-5 px-4 px-sm-5" style={{ backgroundImage: "linear-gradient(135deg,#2DCE8B, #2DCECB)", borderRadius: '20px' }}>
                                    <form className="pt-3" onSubmit={(e) => onLogin(e)}>
                                        <div className="form-group" >
                                            <input style={{ borderRadius: '30px', backgroundColor: 'white' }} type="text" className="form-control form-control-lg" id="name" name="username" placeholder="Username*" onChange={e => handleChange(e)} required />
                                        </div>
                                        <div className="form-group">
                                            <input style={{ borderRadius: '30px', backgroundColor: 'white' }} type={enablePassword ? 'text' : 'password'} className="form-control form-control-lg" id="password-field" name="password" placeholder="Password*" onChange={e => handleChange(e)} required />
                                            {!enablePassword && <img className="passwordimg" src="images/common/hide.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={() => handlePasswordView()} />}
                                            {enablePassword && <img className="passwordimg" src="images/common/show.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={() => handlePasswordView()} />}
                                        </div>
                                        {/* <div className="form-group">
                                            <input style={{ borderRadius: '30px', backgroundColor: 'white' }} type="text" className="form-control form-control-lg" id="corpCode" name="corpCode" placeholder="Squad Name*" onChange={e => handleChange(e)} required />
                                        </div> */}
                                        {/* <div className="row m-4">
                                        <input className="mt-1" type="radio" name="userType" value="admin" aria-label="Radio button for following text input" onChange={e => handleChange(e)} required />
                                        <span className="ml-3">Admin</span>
                                        <input className="ml-3 mt-1" type="radio" name="userType" value="user" aria-label="Radio button for following text input" onChange={e => handleChange(e)} required />
                                        <span className="ml-3">User</span>
                                    </div> */}
                                        <div className="mt-3">
                                            {(loaderStatus) ? <RootLoader /> :
                                                <div style={{ flexDirection: 'column' }}>
                                                    <button className="btn  btn-lg font-weight-bold auth-form-btn" style={{ backgroundColor: 'rgb(2 107 109)', color: 'white', borderRadius: '30px', marginLeft: '30%', width: '40%' }}>Sign In</button>

                                                </div>}
                                        </div>

                                        <div className="col-lg-12 text-center mt-2">
                                            Forget Password? <Link to="/forget" className="text-danger">Click Here</Link>
                                        </div>
                                        <div className='pt-2' style={{ color: 'white', borderRadius: '30px', marginLeft: '28%', width: '100%' }}>
                                            <GoogleLogin
                                                clientId={clientId}
                                                buttonText="Sign In with Google"
                                                onSuccess={onSuccess}
                                                onFailure={onFailure}
                                            >
                                            </GoogleLogin>
                                        </div>
                                        {/* <div className="mt-3 text-center" >
                                        <label className="card-title">Don't have an account yet?<Link style={{color:'blue',paddingLeft:'10px'}} to={{ pathname: "/register" }}>Sign Up</Link></label>
                                            
                                        </div> */}
                                        {getUser.isAuthenticated === false ? null : <div>
                                            <GoogleLogout
                                                clientId={clientId}
                                                onLogoutSuccess={onSuccessLogOut}
                                                disabled={true}
                                            ></GoogleLogout>
                                        </div>}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
    return (
        renderContent()
    );
}