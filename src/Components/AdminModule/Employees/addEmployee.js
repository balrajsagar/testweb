/*
FileName:addEmployee.js
Developer Name: Naveen Kumar Gade - GNK , Satys Sidda - SS
Purpose: Adding New Employee
*/
import React, { useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { checkEmployee, empDesignation, empRoles, getManagers } from './network';
import { useSelector } from 'react-redux';
import { empReducer, initialState } from './empReducer';
import * as actions from './actions';
import {CONTRIBUTOR,SCRUM_MASTER,PRODUCT_OWNER} from '../../Common/Headers'
// import Select from 'react-select';


const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '100%',
        padding: theme.spacing(2, 4, 3),
    },
}));

//For Add New Employee
export default function AddEmployee(props) {

    const classNames = useStyles();
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(empReducer, initialState)
    useEffect(() => {
        empRoles(dispatch, getUser.user);
        empDesignation(dispatch, getUser.user);
        getManagers(dispatch, getUser.user)
        // eslint-disable-next-line
    }, [])
    var rolesList = [];
    var designationList = [];
    var managerList = [];
    state.roles.map((roles) => {
        return (
            rolesList.push({ 'value': roles.value, 'label': roles.value })
        );
    })
    state.designations.map((designations) => {
        return (
            designationList.push({ 'value': designations.value, 'label': designations.value })
        );
    })
    state.managers.map((users) => {
        return (
            managerList.push({ 'value': users.name, 'label': users.name })
        );
    })
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                closeAfterTransition
                className={classNames.modal}
                open={props.open}
                onClose={props.handleClose}
                disableBackdropClick={true}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classNames.paper}>
                        <div className="user-modal-dialog d-flex justify-content-center">
                            <div className="modal-content col-6 p-2" style={{ borderRadius: '10px' }}>
                                <div class="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                    <h5 class="modal-title p-2">New Squad Member</h5>
                                    <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" className="d-flex align-items-right p-2" data-dismiss="modal" onClick={props.handleModalClose}><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body" style={{ height: '400px', overflow: 'scroll' }}>
                                    <div>

                                        <form >

                                            <div class="form-group required row p-2" style={{ marginTop: '-30px' }}>

                                                {/* <label for="recipient-ID" class="col-form-label pt-4 control-label'" style={{ width: "80px" }}>Emp ID<span style={{ color: "red" }} >*</span></label>
                                                <input type="text" required="required" class="form-control col-10 ml-2 " id="recipient-empid" name="Emp ID" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.empId.value}
                                                    onChange={(event) => dispatch(actions.empId(event.target.value))} /> */}
                                                <label for="recipient-name" class="col-form-label pt-4" style={{ width: "80px" }}>FullName<span style={{ color: "red" }} >*</span></label>
                                                <input type="text" class="form-control col-10 ml-2 " id="recipient-fullName" name="Name" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.fullName.value}
                                                    onChange={(event) => dispatch(actions.fullName(event.target.value))} />
                                                <label for="recipient-email" class="col-form-label pt-4" style={{ width: "80px" }}>Email<span style={{ color: "red" }} >*</span></label>
                                                <input type="text" class="form-control col-10 ml-2 " id="recipient-email" name="Email" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.email.value}
                                                    onChange={(event) => dispatch(actions.email(event.target.value))} />
                                                <label for="recipient-uname" class="col-form-label pt-4" style={{ width: "80px" }}>Mobile</label>
                                                <input type="number" class="form-control col-10 ml-2 " id="recipient-mobile" name="mobile" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.mobile.value}
                                                    onChange={(event) => dispatch(actions.mobile(event.target.value))} />
                                                <label for="recipient-password" class="col-form-label pt-4" style={{ width: "80px" }}>Password<span style={{ color: "red" }} >*</span></label>
                                                <input type="password" class="form-control col-10 ml-2 " id="recipient-password" name="Password" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.password.value}
                                                    onChange={(event) => dispatch(actions.password(event.target.value))} />
                                                <label for="recipient-name" class="col-form-label pt-4" style={{ width: "80px" }}>Username<span style={{ color: "red" }} >*</span></label>
                                                <input type="text" class="form-control col-10 ml-2 " id="recipient-name" name="Username" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.email.value}
                                                    readonly />

                                            </div>


                                            {/* <div class="form-group row pl-2" style={{ marginTop: '-10px' }}>
                                                <label for="recipient-name" class="col-form-label pt-2">Select Employee Status :</label>
                                                <div class="form-check form-check-inline pl-2">
                                                    <input class="form-check-input" type="radio" name="userStatus" id="Active" value="Active"
                                                        onChange={(event) => dispatch(actions.userStatus(event.target.value))} checked={state.userStatus.value === "Active" ? true : false} />
                                                    <label>Active</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="userStatus" id="Inactive" value="Inactive"
                                                        onChange={(event) => dispatch(actions.userStatus(event.target.value))} />
                                                    <label>In-Active</label>
                                                </div> */}
                                                {/* <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="userStatus" id="Other" value="Other" 
                                                    onChange={(event) => dispatch(actions.userStatus(event.target.value))}/>
                                                    <label>Other</label>
                                                </div> */}

                                            {/* </div> */}


                                            <div class="form-group row pl-2" style={{ marginTop: '-10px' }}>
                                                <label for="recipient-name" class="col-form-label pt-2">Select Role :</label>
                                               
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="userType" id={PRODUCT_OWNER} value={PRODUCT_OWNER}
                                                        onChange={(event) => dispatch(actions.userType(event.target.value))} />
                                                    <label>{PRODUCT_OWNER}</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="userType" id={SCRUM_MASTER} value={SCRUM_MASTER}
                                                        onChange={(event) => dispatch(actions.userType(event.target.value))} />
                                                    <label>{SCRUM_MASTER}</label>
                                                </div>
                                                <div class="form-check form-check-inline pl-2">
                                                    <input class="form-check-input" type="radio" name="userType" id={CONTRIBUTOR} value={CONTRIBUTOR}
                                                        onChange={(event) => dispatch(actions.userType(event.target.value))} checked={state.userType.value === CONTRIBUTOR ? true : false} />
                                                    <label>{CONTRIBUTOR}</label>
                                                </div>
                                            </div>

                                            {/* <div class="form-group required row pl-2" style={{ marginTop: '-30px' }}>
                                                <label for="recipient-name" class="col-form-label pt-4" style={{ width: "80px" }}>Department</label>
                                                <Select
                                                    className="form-control col-10 m-1"
                                                    placeholder="Select Department"
                                                    value={rolesList.value}
                                                    onChange={(selectedOption) => {
                                                        dispatch(actions.roleSelected(selectedOption.value))
                                                    }}
                                                    options={rolesList}
                                                />
                                                <label for="recipient-name" class="col-form-label pt-4" style={{ width: "80px" }}>Title</label>
                                                <Select
                                                    className="form-control col-10 m-1"
                                                    placeholder="Select Title"
                                                    value={designationList.value}
                                                    onChange={(selectedOption) => {
                                                        dispatch(actions.designationSelected(selectedOption.value))
                                                    }}
                                                    options={designationList}
                                                />
                                                <label for="recipient-name" class="col-form-label pt-4" style={{ width: "80px" }}>Reporting Manager</label>
                                                <Select
                                                    className="form-control col-10 m-1"
                                                    placeholder="Select Reporting Manager"
                                                    value={managerList.value}
                                                    onChange={(selectedOption) => {
                                                        dispatch(actions.reportingManagerSelected(selectedOption.value))
                                                    }}
                                                    options={managerList}
                                                />
                                                <label for="recipient-name" class="col-form-label pt-4" style={{ width: "80px" }}>Functional Manager</label>
                                                <Select
                                                    className="form-control col-10 m-1"
                                                    placeholder="Select Functional Manager"
                                                    value={managerList.value}
                                                    onChange={(selectedOption) => {
                                                        dispatch(actions.functionalManagerSelected(selectedOption.value))
                                                    }}
                                                    options={managerList}
                                                />
                                            </div> */}

                                            {(state.roles.length !== 0 || state.designations.length !== 0) ? null : <div className="note" style={{ marginBottom: '15px', padding: '4px 12px' }}>
                                                <p style={{ paddingTop: "6px" }}><strong>Note * :</strong> For further settings go to Admin -- Settings</p>
                                            </div>}

                                        </form>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }} onClick={() => checkEmployee(state, dispatch, getUser.user, props.handleClose)} >Add</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}