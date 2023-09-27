import React, { useState, useReducer, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom';
import RootLoader from '../../Common/Loader/RootLoader'
import { isLoaded, isLoading } from '../../Common/Actions/loading';
import './register.scss';
import { updateEmail } from './actions';
import { reducer, initialState } from './reducer';
import { register } from './network';
import { updateNewPassword, updateConfirmPassword } from './actions';
import { useSelector } from 'react-redux';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
// import { refreshTokenSetup } from '../Login/refreshToken';
import Alert from '../../Common/Alert';
import { setStatus, setToken, setRoleCount, getToken } from '../../Common/LocalStorage';
import jwt_decode from "jwt-decode";
import store from '../../Common/Store';
import { setCurrentUser } from '../../Common/Actions';
import API from '../../Common/Network/API';
import { activeUserStory } from '../../UserModule/Modules/actions';
import { APP_NAME, IMG_SRC } from '../../Common/Headers';
import { Client_URL } from '../../Common/config';

export default function Register(props) {
    // console.log(props.location.data)
    const clientId = '675290451823-qr6kd2kah3aingppsk96uq0i1v6tun2q.apps.googleusercontent.com';//google client Id for sso
    const getUser = useSelector(state => state.auth)
    const loaderStatus = useSelector(state => state.loading.status)
    const properties = useSelector(state => state.landingReducer.properties)

    const [enablePassword, setEnablePassword] = useState(false)
    const [enableConfirmPassword, setEnableConfirmPassword] = useState(false)
    const [state, dispatch] = useReducer(reducer, initialState)
    const [redirect, setRedirect] = useState(false)
    const webProperties = useSelector(state => state.landingReducer.webProperties)

    const handlePasswordView = () => {
        setEnablePassword(!enablePassword)
    }
    const handleConfirmPasswordView = () => {
        setEnableConfirmPassword(!enableConfirmPassword)
    }
    useEffect(() => {
        if (props.location.data) {
            dispatch(updateEmail(props.location.data))
        }
    }, [props])
    useEffect(() => {
        onSuccessLogOut()
        // eslint-disable-next-line
    }, [])

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

    const onSuccess = (res) => {
        sso_onLogin(res.profileObj)
        // refreshTokenSetup(res);
    };
    const onFailure = (res) => {
        console.log('Login failed: res:', res);
    };
    const onSuccessLogOut = (res) => {
        console.log('Logout made successfully' + res);
    };
    if (state.emailredirect.value === "emailredirect") {

        return <Redirect to="/login" />
    }
    if (redirect) {
        if (getToken('roleCount') === '0') {
            return <Redirect push to="/squadRegister" />

        } else {
            window.location.reload('/')
        }
    }
    const renderContent = () => {
        if (loaderStatus) {
            return <RootLoader />
        }
        return (
            <div className="bg" style={{backgroundColor:  webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b'}}>
                <div className="container">

                    <div className="row" style={{ marginTop: "-85px" }}>
                        <div className="col-sm pt-4" id="signup">
                            <img src="images/common/loginimg.jpg" width="700" alt="" />
                        </div>
                        <div className="col-sm" id="form">
                            <center>  <img src={properties?.IMG_SRC || IMG_SRC} id="logo" alt="" />
                                <h4 id="head2">Sign up for your account</h4>
                                <form >
                                    <div className="form-group">
                                        <input type="email"
                                            id="confirm-password"
                                            value={state.email.value}
                                            onChange={(event) => {
                                                dispatch(updateEmail(event.target.value));
                                            }}
                                            className="form-control" placeholder="Enter email"
                                            required />
                                        <span style={{ color: "red", fontSize: '12px' }}>{state.email.errorStatus ? state.email.errormessage : ""}</span>
                                    </div>

                                    <div className="form-group">
                                        <input type={enablePassword ? 'text' : 'password'}
                                            className="form-control" placeholder="Create password"
                                            autoComplete="new-password"
                                            id="new-password"
                                            value={state.newpassword.value}
                                            onChange={(event) => {
                                                dispatch(updateNewPassword(event.target.value));
                                            }}
                                            required />
                                        {!enablePassword && <img className="passwordimg" src="images/common/hide.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={() => handlePasswordView()} />}
                                        {enablePassword && <img className="passwordimg" src="images/common/show.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={() => handlePasswordView()} />}
                                        <span style={{ color: "red", fontSize: '12px' }}>{state.newpassword.errorStatus ? state.newpassword.errormessage : ""}</span>
                                        <div id="error-pwd"></div>

                                    </div>

                                    <div className="form-group">
                                        <input type={enableConfirmPassword ? 'text' : 'password'} className="form-control"
                                            placeholder="Confirm Password*"
                                            id="confirm-password"
                                            value={state.confirmpassword.value}
                                            onChange={(event) => {
                                                dispatch(updateConfirmPassword(event.target.value));
                                            }}
                                            required />
                                        {!enableConfirmPassword && <img className="passwordimg" src="images/common/hide.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={() => handleConfirmPasswordView()} />}
                                        {enableConfirmPassword && <img className="passwordimg" src="images/common/show.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={() => handleConfirmPasswordView()} />}
                                        {state.confirmpassword.errorStatus ? <span style={{ color: "red", fontSize: '12px' }}>{state.confirmpassword.errormessage}</span> : (state.newpassword.value === state.confirmpassword.value) && state.newpassword.value !== "" && state.confirmpassword.value !== "" ? <span style={{ color: "green", fontSize: '12px' }}> password matched </span> : state.confirmpassword.value === "" ? " " : <span style={{ color: "red", fontSize: '12px' }}>password not matched</span>}
                                        <div className="error">
                                        </div>
                                    </div>
                                    {state.isLoading ? <RootLoader /> :
                                        <button style={{backgroundColor:webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b' }} className="btn my-2 my-sm-0" id="continuebtn" type="submit"
                                            onClick={(event) => { register(state, dispatch) }}  >Sign Up</button>}
                                    <div className='pt-2'>
                                        <GoogleLogin
                                            clientId={clientId}
                                            buttonText="Join with Google"
                                            onSuccess={onSuccess}
                                            onFailure={onFailure}
                                            style={{ marginTop: '100px' }}
                                        >
                                        </GoogleLogin>
                                    </div>
                                    {getUser.isAuthenticated === false ? null : <div>
                                        <GoogleLogout
                                            clientId={clientId}
                                            onLogoutSuccess={onSuccessLogOut}
                                            disabled={true}
                                        ></GoogleLogout>
                                    </div>}
                                </form>
                                {/*  eslint-disable-next-line */}
                                <a>Already have an account? </a><br />
                                {/*  eslint-disable-next-line */}
                                <a type="submit"><Link to={{ pathname: "/login" }}>Login</Link></a>
                            </center>
                            <br />
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