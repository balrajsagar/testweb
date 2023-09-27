import React, { useReducer } from 'react';
import { useSelector } from 'react-redux';
import RootLoader from '../../Common/Loader/RootLoader';
import Header from '../../Common/TopNav';
import SideBar from '../Utility/SideNav';
import { reducer, initialState } from './reducer';
import { updatePassword } from './network';
import { updateCurrentPassword, updateNewPassword, updateConfirmPassword } from './actions';
import { Redirect } from 'react-router-dom';

export default function ChangePassword() {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(reducer, initialState)
    //For Redirecting After Profile Update
    if (state.passwordredirect.value === "passwordredirect") {

        return <Redirect to="/projects" />
    }
    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <SideBar />
                <div className="main-panel">
                    <div className="mt-2">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <h4 className="card-title mb-2">Update Password</h4>
                                        {/* <div className=" col-md-12 d-flex justify-content-end" style={{ marginTop: '-40px' }}>
                                            {state.isLoading ? <RootLoader /> :
                                                <button type="submit" className="btn btn
                                            
                                            -success border mr-2"
                                                    onClick={(event) => { updateData(state, dispatch, getUser.user) }} style={{ borderRadius: '30px' }}>SAVE</button>}
                                        </div> */}
                                    </div>
                                    <hr></hr>
                                    <form className="forms-sample">
                                        <div className="form-group row" >

                                           

                                            <label className="col-sm-3 col-form-label pt-3">Current Password <span className="required text-danger">*</span></label>
                                            <div className="col-sm-9">
                                                <input type="text"
                                                    className="col-sm-6 form-control form-control-sm"
                                                    style={{borderWidth:'0.1px'}}
                                                    // eslint-disable-next-line
                                                    type="password"
                                                    autoComplete="current-password"
                                                    id="current-password"
                                                    placeholder="**********"
                                                    value={state.currentpassword.value}
                                                    onChange={(event) => {
                                                        dispatch(updateCurrentPassword(event.target.value));
                                                    }}
                                                    required
                                                />
                                                {/* <small style={{ color: "red", fontSize: '12px' }}>{state.mobile.errorStatus ? state.mobile.errorMessage : ""}</small> */}
                                            </div>
                                        </div>
                                        <div className="form-group row" >
                                            <label className="col-sm-3 col-form-label pt-3">New Password <span className="required text-danger">*</span></label>
                                            <div className="col-sm-9">
                                                <input type="text"
                                                    className="col-sm-6 form-control form-control-sm"
                                                    style={{borderWidth:'0.1px'}}
                                                    // eslint-disable-next-line
                                                    type="password"
                                                    autoComplete="new-password"
                                                    id="new-password"
                                                    placeholder="*********"
                                                    value={state.newpassword.value}
                                                    onChange={(event) => {
                                                        dispatch(updateNewPassword(event.target.value));
                                                    }}

                                                    required
                                                // data-toggle="tooltip" data-placement="right" title="Please enter new password for login" 
                                                />
                                                <span style={{ color: "red", fontSize: '12px' }}>{state.newpassword.errorStatus ? state.newpassword.errormessage : ""}</span>
                                                {/* <small style={{ color: "red", fontSize: '12px' }}>{state.mobile.errorStatus ? state.mobile.errorMessage : ""}</small> */}
                                            </div>
                                        </div>
                                        <div className="form-group row" >
                                            <label className="col-sm-3 col-form-label pt-3">Confirm Password <span className="required text-danger">*</span></label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="password"
                                                    autoComplete="confirm-password"
                                                    className="col-sm-6 form-control form-control-sm"
                                                    style={{borderWidth:'0.1px'}}
                                                    // className={state.confirmpassword.errorStatus && (state.newpassword.value === state.confirmpassword.value) ? "form-control errorstyle" : "form-control"}
                                                    id="confirm-password"
                                                    placeholder="*********"
                                                    value={state.confirmpassword.value}
                                                    onChange={(event) => {
                                                        dispatch(updateConfirmPassword(event.target.value));
                                                    }}
                                                    required
                                                />
                                                {state.confirmpassword.errorStatus ? <span style={{ color: "red", fontSize: '12px' }}>{state.confirmpassword.errormessage}</span> : (state.newpassword.value === state.confirmpassword.value) && state.newpassword.value !== "" && state.confirmpassword.value !== "" ? <span style={{ color: "green", fontSize: '12px' }}> password matched </span> : state.confirmpassword.value === "" ? " " : <span style={{ color: "red", fontSize: '12px' }}>password not matched</span>}
                                                {/* <small style={{ color: "red", fontSize: '12px' }}>{state.mobile.errorStatus ? state.mobile.errorMessage : ""}</small> */}
                                            </div>
                                        </div>
                                        <div className=" col-md-12 d-flex justify-content-end" style={{ marginTop: '0px' }}>
                                            {state.isLoading ? <RootLoader /> :
                                                <button type="submit" className="btn btn-success border mr-2"
                                                    onClick={(event) => { updatePassword(state, dispatch, getUser.user) }} style={{ borderRadius: '30px' }}>Save</button>}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}