import React, { useReducer, useEffect } from 'react';
import { updateFirstUser } from './network';
import { useSelector } from 'react-redux';
import { empReducer, initialState } from './empReducer';
import * as actions from './actions';
import { Redirect } from 'react-router-dom';
import { setRoleCount } from '../../Common/LocalStorage';
import TopNavWithOutProject from '../../UserModule/Utility/TopNav/topnav';
import { PRODUCT_OWNER, SCRUM_MASTER } from '../../Common/Headers';
import { useState } from 'react';

//For Add New Employee
export default function Instruction() {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(empReducer, initialState)
    const [redirect, setRedirect] = useState(false)
    useEffect(() => {
        if (state.rolesList.length >= 1) {
            setRoleCount('roleCount', state.rolesList.length)
            setRedirect(true)
        }
    }, [state.rolesList.length])

    if (redirect) {
        return <Redirect to='/dashboard' />
    }

    return (

        <div className="container-scroller">
            <TopNavWithOutProject />
            <div className="container-scroller d-flex justify-content-center">
                <div className="container-fluid page-body-wrapper d-flex justify-content-center">
                    <div className="main-panel d-flex justify-content-center">
                        <div className="d-flex justify-content-center">

                            <div className="col-12 grid-margin stretch-card d-flex justify-content-center">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Role Selection</h4>
                                        <form className="forms-sample" >
                                            <div className="form-group">
                                                <div className="form-group row pl-2" style={{ marginTop: '-1px' }}>
                                                    <label for="recipient-name" className="col-form-label pt-2" style={{ fontSize: '16px', }}>Select Role  <span style={{ color: "red" }} >*</span>:</label>
                                                    {/* <div className="form-check form-check-inline pl-2">
                                                        <input className="form-check-input" type="radio" name="userType" id="Contributor" value="Contributor"
                                                            onChange={(event) => dispatch(actions.userType(event.target.value))} checked={state.userType.value === "Contributor" ? true : false} />
                                                        <label>Contributor</label>
                                                    </div> */}
                                                    <div className="form-check form-check-inline" style={{ marginLeft: "20px" }}>
                                                        <input className="form-check-input" type="radio" name="userType" id={SCRUM_MASTER} value={"Scrum Master"}
                                                            onChange={(event) => dispatch(actions.userType(event.target.value))} />
                                                        <label>{SCRUM_MASTER}</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="userType" id={PRODUCT_OWNER} value={"Product Owner"}
                                                            onChange={(event) => dispatch(actions.userType(event.target.value))} />
                                                        <label>{PRODUCT_OWNER}</label>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end mt-5">
                                                <button type="button" className="btn btn-success mr-5 " onClick={() => updateFirstUser(state, dispatch, getUser.user)}>Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}