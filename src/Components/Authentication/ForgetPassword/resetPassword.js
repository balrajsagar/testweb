import React, {  useReducer, useState } from 'react'
import { Redirect } from 'react-router-dom';
import RootLoader from '../../Common/Loader/RootLoader'
import { reducer, initialState } from './reducer';
import { updatePassword } from './network';
import { updateNewPassword, updateConfirmPassword } from './actions';
const qs = require('query-string');

// for reset password
export default function ResetPassword(props) {

    const [enablePassword, setEnablePassword] = useState(false)
    const [enableConfirmPassword, setEnableConfirmPassword] = useState(false)
    const parsed = qs.parse(props.location.search);
    const [state, dispatch] = useReducer(reducer, initialState)
    // console.log(parsed.key);

    const handlePasswordView = () => {
        setEnablePassword(!enablePassword)
    }
    const handleConfirmPasswordView = () => {
        setEnableConfirmPassword(!enableConfirmPassword)
    }
    if (state.passwordredirect.value === "passwordredirect") {

        return <Redirect to="/login" />
    }
        return (
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper " >
                    <div className="content-wrapper d-flex align-items-center auth px-0 bglogin">
                        <div className="row w-100 mx-0">
                            <div className="col-lg-4 mx-auto">
                                <div className="auth-form-light text-left py-5 px-4 px-sm-5" style={{ backgroundImage: "linear-gradient(135deg,#2DCE8B, #2DCECB)", borderRadius: '20px' }}>
                                <h2 className="mt-3 text-center">Reset Password</h2><br />
                                    <form className="pt-3" >
                                        <div className="form-group" >
                                            <input 
                                            type={enablePassword ? 'text' : 'password'} 
                                            style={{ borderRadius: '30px', backgroundColor: 'white' }}
                                             className="form-control form-control-lg"
                                             autoComplete="new-password"
                                             id="new-password"
                                             value={state.newpassword.value}
                                             onChange={(event) => {
                                                 dispatch(updateNewPassword(event.target.value));
                                             }}
                                             placeholder="New Password*"
                                              required />
                                            {!enablePassword && <img className="passwordimg" src="images/common/hide.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={() => handlePasswordView()} />}
                                            {enablePassword && <img className="passwordimg" src="images/common/show.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={() => handlePasswordView()} />}
                                            <span style={{ color: "red", fontSize: '12px' }}>{state.newpassword.errorStatus ? state.newpassword.errormessage : ""}</span>
                                        </div>
                                        <div className="form-group" >
                                            <input 
                                            type={enableConfirmPassword ? 'text' : 'password'} 
                                            style={{ borderRadius: '30px', backgroundColor: 'white' }} 
                                            className="form-control form-control-lg" 
                                             id="confirm-password"
                                             value={state.confirmpassword.value}
                                             onChange={(event) => {
                                                        dispatch(updateConfirmPassword(event.target.value));
                                                    }} 
                                            placeholder="Confirm Password*" 
                                            required />
                                            {!enableConfirmPassword && <img className="passwordimg" src="images/common/hide.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={() => handleConfirmPasswordView()} />}
                                             {enableConfirmPassword && <img className="passwordimg" src="images/common/show.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={() => handleConfirmPasswordView()} />}
                                             {state.confirmpassword.errorStatus ? <span style={{ color: "red", fontSize: '12px' }}>{state.confirmpassword.errormessage}</span> : (state.newpassword.value === state.confirmpassword.value) && state.newpassword.value !== "" && state.confirmpassword.value !== "" ? <span style={{ color: "green", fontSize: '12px' }}> password matched </span> : state.confirmpassword.value === "" ? " " : <span style={{ color: "red", fontSize: '12px' }}>password not matched</span>}
                                        </div>
                                        <div className="mt-3">
                                            {state.isLoading ? <RootLoader /> :
                                                <button type="submit" className="btn btn-block  btn-lg font-weight-medium auth-form-btn" style={{ backgroundColor: 'rgb(2 107 109)', color: 'white', borderRadius: '30px', marginLeft: '30%', width: '40%' }}
                                                onClick={(event) => { updatePassword(state, dispatch, parsed.key) }}>Reset</button>}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
//     return (
//         renderContent()
//     );
// }