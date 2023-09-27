import React, { useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector } from 'react-redux';
import { empDesignation, empRoles, getManagers, updateEmployee } from './network';
import { empReducer, initialState } from './empReducer';
import * as actions from './actions'
import {CONTRIBUTOR,SCRUM_MASTER,PRODUCT_OWNER} from '../../Common/Headers'

//import Select from 'react-select'


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

//For Add New Project
export default function EditEmployee(props) {
    const classNames = useStyles();
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(empReducer, initialState)
    // console.log(props.data)
    useEffect(() => {
        dispatch(actions.setModifyEmployee(props.data.id, props.data.employeeId, props.data.name, props.data.email, props.data.mobile, props.data.userName, props.data.team, props.data.designation, props.data.reportingManager, props.data.functionalManager, props.data.userType, props.data.userStatus))
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
                                    <h5 class="modal-title p-2">Modify Employee Details</h5>
                                    <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" className="d-flex align-items-right p-2" data-dismiss="modal" onClick={props.handleModalClose}><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body" style={{ height: '400px', overflow: 'scroll' }}>
                                    <div>

                                        <form >

                                            <div class="form-group row p-2" style={{ marginTop: '-30px' }}>

                                                <label for="recipient-ID" class="col-form-label pt-4" style={{ width: "80px" }}>Emp ID<span style={{ color: "red" }} >*</span></label>
                                                <input type="text" class="form-control col-10 ml-2 " id="recipient-empid" name="Emp ID" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.empId.value}
                                                    onChange={(event) => dispatch(actions.employeeId(event.target.value))} />
                                                <label for="recipient-name" class="col-form-label pt-4" style={{ width: "80px" }}>FullName<span style={{ color: "red" }} >*</span></label>
                                                <input type="text" class="form-control col-10 ml-2 " id="recipient-fullName" name="Name" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.fullName.value}
                                                    onChange={(event) => dispatch(actions.fullName(event.target.value))} />
                                                <label for="recipient-email" class="col-form-label pt-4" style={{ width: "80px" }}>Email<span style={{ color: "red" }} >*</span></label>
                                                <input type="text" class="form-control col-10 ml-2 " id="recipient-email" name="Email" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.email.value}
                                                    onChange={(event) => dispatch(actions.email(event.target.value))} />
                                                <label for="recipient-uname" class="col-form-label pt-4" style={{ width: "80px" }}>Mobile<span style={{ color: "red" }} >*</span></label>
                                                <input type="number" class="form-control col-10 ml-2 " id="recipient-mobile" name="mobile" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.mobile.value}
                                                    onChange={(event) => dispatch(actions.mobile(event.target.value))} />
                                                <label for="recipient-name" class="col-form-label pt-4" style={{ width: "80px" }}>Username<span style={{ color: "red" }} >*</span></label>
                                                <input type="text" class="form-control col-10 ml-2 " id="recipient-name" name="Username" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.email.value} />
                                            </div>



{/* 
                                            <div class="form-group row pl-2" style={{ marginTop: '-10px' }}>
                                                <label for="recipient-name" class="col-form-label pt-2">Select Employee Status :</label>
                                                <div class="form-check form-check-inline pl-2">
                                                    <input class="form-check-input" type="radio" name="userStatus" id="Active" value="Active" checked={state.userStatus.value === "Active" ? true : false}
                                                        onChange={(event) => dispatch(actions.userStatus(event.target.value))} />
                                                    <label>Active</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="userStatus" id="Inactive" value="Inactive" checked={state.userStatus.value === "Inactive" ? true : false}
                                                        onChange={(event) => dispatch(actions.userStatus(event.target.value))} />
                                                    <label>In-Active</label>
                                                </div> */}
                                                {/* <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="userStatus" id="Other" value="Other"  checked={state.userStatus.value === "Other" ? true :false}
                                                    onChange={(event) => dispatch(actions.userStatus(event.target.value))}/>
                                                    <label>Other</label>
                                                </div> */}

                                            {/* </div> */}


                                            <div class="form-group row pl-2" style={{ marginTop: '-40px' }}>
                                                <label for="recipient-name" class="col-form-label pt-2">Select User Type :</label>
                                                <div class="form-check form-check-inline pl-2">
                                                    <input class="form-check-input" type="radio" name="userType" id={SCRUM_MASTER} value={SCRUM_MASTER} checked={state.userType.value === SCRUM_MASTER ? true : false}
                                                        onChange={(event) => dispatch(actions.userType(event.target.value))} />
                                                    <label>{SCRUM_MASTER}</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="userType" id={CONTRIBUTOR} value={CONTRIBUTOR} checked={state.userType.value === CONTRIBUTOR ? true : false}
                                                        onChange={(event) => dispatch(actions.userType(event.target.value))} />
                                                    <label>{CONTRIBUTOR}</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="userType" id={PRODUCT_OWNER} value={PRODUCT_OWNER} checked={state.userType.value === PRODUCT_OWNER ? true : false}
                                                        onChange={(event) => dispatch(actions.userType(event.target.value))} />
                                                    <label>{PRODUCT_OWNER}</label>
                                                </div>
                                            </div>

                                            {/* <div class="form-group required row pl-2" style={{ marginTop: '-30px' }}>
                                                <label for="recipient-name" class="col-form-label pt-4" style={{ width: "80px" }}>Department</label>
                                                <Select
                                                    className="form-control col-10 m-1"
                                                    placeholder={state.roleSelected.value}
                                                    value={rolesList.value}
                                                    onChange={(selectedOption) => {
                                                        dispatch(actions.roleSelected(selectedOption.value))
                                                    }}
                                                    options={rolesList}
                                                />
                                                <label for="recipient-name" class="col-form-label pt-4" style={{ width: "80px" }}>Title</label>
                                                <Select
                                                    className="form-control col-10 m-1"
                                                    placeholder={state.designationSelected.value}
                                                    value={designationList.value}
                                                    onChange={(selectedOption) => {
                                                        dispatch(actions.designationSelected(selectedOption.value))
                                                    }}
                                                    options={designationList}
                                                />
                                                <label for="recipient-name" class="col-form-label pt-4" style={{ width: "80px" }}>Reporting Manager</label>
                                                <Select
                                                    className="form-control col-10 m-1"
                                                    placeholder={state.reportingManagerSelected.value}
                                                    value={managerList.value}
                                                    onChange={(selectedOption) => {
                                                        dispatch(actions.reportingManagerSelected(selectedOption.value))
                                                    }}
                                                    options={managerList}
                                                />
                                                <label for="recipient-name" class="col-form-label pt-4" style={{ width: "80px" }}>Functional Manager</label>
                                                <Select
                                                    className="form-control col-10 m-1"
                                                    placeholder={state.functionalManagerSelected.value}
                                                    value={managerList.value}
                                                    onChange={(selectedOption) => {
                                                        dispatch(actions.functionalManagerSelected(selectedOption.value))
                                                    }}
                                                    options={managerList}
                                                />
                                            </div> */}
                                            {/* {(state.roles.length !== 0 || state.designations.length !== 0) ? null : <div className="note" style={{ marginBottom: '15px', padding: '4px 12px' }}>
                                                <p style={{ paddingTop: "6px" }}><strong>Note * :</strong> For further settings go to Admin --> Settings </p>
                                            </div>} */}
                                        </form>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }} onClick={() => updateEmployee(state, dispatch, getUser.user, props.handleClose)} >Modify</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}