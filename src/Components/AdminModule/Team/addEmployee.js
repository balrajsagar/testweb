/*
FileName:UserModule/Team/addEmployee.js
purpose:adding squad team
Developers:Naveen Kumar Gade - NKG, Satya Sidda - SS
Created Date:
Updated Date:27/2/2021
 */
import React, { useReducer, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { checkEmployee, getSquadList } from './network';
import { useSelector } from 'react-redux';
import { empReducer, initialState } from './empReducer';
import * as actions from './actions';
import RootLoader from '../../Common/Loader/RootLoader';
import Select from 'react-select';
import {CONTRIBUTOR,PRODUCT_OWNER,SCRUM_MASTER } from '../../Common/Headers';



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
        getSquadList(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [])
    var employee = [];

    state.squadList.map((employees) => {
        return (
            employee.push({ 'value': employees.id, 'label': employees.name, 'userName': employees.userName, 'mobileNumber': employees.mobileNumber })
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

                                            <div class="form-group required row p-4" style={{ marginTop: '-30px' }}>
                                                {/* <label for="user" className="col-form-label pt-2" style={{ width: '150px' }}>Select Squad Member</label> */}
                                                <Select
                                                    className="form-control"
                                                    placeholder="Search ...."
                                                    value={employee.value}
                                                    onChange={(selectedOption) => {
                                                        dispatch(actions.fullName(selectedOption.label))
                                                        dispatch(actions.email(selectedOption.userName))
                                                        dispatch(actions.mobile(selectedOption.mobileNumber))
                                                        dispatch(actions.roleSelected(selectedOption.value))
                                                    }}
                                                    options={employee}
                                                />

                                                {/* <label for="recipient-ID" class="col-form-label pt-4 control-label'" style={{ width: "80px" }}>Emp ID<span style={{ color: "red" }} >*</span></label>
                                                <input type="text" required="required" class="form-control col-10 ml-2 " id="recipient-empid" name="Emp ID" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.empId.value}
                                                    onChange={(event) => dispatch(actions.empId(event.target.value))} /> */}
                                                    {/* <div class="form-group"> */}
                                                <label for="recipient-name" class="col-form-label pt-4" style={{ width: "100px" }}>Full name<span style={{ color: "red" }} >*</span></label>
                                                <input type="text" class="form-control col-10 ml-2 " id="recipient-fullName" name="Name" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.fullName.value}
                                                    onChange={(event) => dispatch(actions.fullName(event.target.value))} />
                                                     <span class=" col-10 ml-2 " style={{ color: "red", fontSize: '12px', paddingLeft: "15%" }}>{state.fullName.errorStatus ? state.fullName.errormessage : ""}</span>
                                                     </div>
                                                     <div class="form-group required row p-4" style={{marginTop : "-70px"}}>
                                                <label for="recipient-email" class="col-form-label pt-4" style={{ width: "100px" }}>Email<span style={{ color: "red" }} >*</span></label>
                                                <input type="text" class="form-control col-10 ml-2 " id="recipient-email" name="Email" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.email.value}
                                                    onChange={(event) => dispatch(actions.email(event.target.value))} />
                                                     <span class=" col-10 ml-2 " style={{ color: "red", fontSize: '12px', paddingLeft: "15%" }}>{state.email.errorStatus ? state.email.errormessage : ""}</span>
                                                </div>
                                                <div class="form-group required row p-4" style={{marginTop : "-70px"}}>
                                                <label for="recipient-uname" class="col-form-label pt-4" style={{ width: "100px" }}>Phone number</label>
                                                <input type="number" class="form-control col-10 ml-2 " id="recipient-mobile" name="mobile" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.mobile.value}
                                                    onChange={(event) => dispatch(actions.mobile(event.target.value))} />
                                                     {/* <span class=" col-10 ml-2 " style={{ color: "red", fontSize: '12px', paddingLeft: "15%" }}>{state.mobile.errorStatus ? state.mobile.errormessage : ""}</span> */}
                                                     </div>
                                                        
                                                        <div class="form-group required row p-4" style={{marginTop : "-70px"}}>
                                                <label for="recipient-name" class="col-form-label pt-4" style={{ width: "100px" }}>Username<span style={{ color: "red" }} >*</span></label>
                                                <input type="text" class="form-control col-10 ml-2 " id="recipient-name" name="Username" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.email.value}
                                                    readonly />

                                            </div>


                                            <div class="form-group row pl-3" style={{ marginTop: '-30px' }}>
                                                <label for="recipient-name" class="col-form-label pt-2">Select Role :</label>
                                                <div class="form-check form-check-inline pl-2">
                                                    <input class="form-check-input" type="radio" name="userType" id={CONTRIBUTOR} value={CONTRIBUTOR}
                                                        onChange={(event) => dispatch(actions.userType(event.target.value))} checked={state.userType.value === CONTRIBUTOR ? true : false} />
                                                    <label>{CONTRIBUTOR}</label>
                                                </div>
                                                {/* checking count of scrum master *[SS]/}
                                               {/* {(state.scrumMasterCount.value) <= '0'? */}
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="userType" id={PRODUCT_OWNER} value={PRODUCT_OWNER}
                                                        onChange={(event) => dispatch(actions.userType(event.target.value))} />
                                                    <label>{PRODUCT_OWNER}</label>
                                                </div>
                                                {/* :null} */}
                                                {/* checking count of product owner master *[SS]/}
                                                {/* {(state.productOwnerCount.value) <= '0'? */}

                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="userType" id={SCRUM_MASTER} value={SCRUM_MASTER}
                                                        onChange={(event) => dispatch(actions.userType(event.target.value))} />
                                                    <label>{SCRUM_MASTER}</label>
                                                </div>

                                            </div>

                                        </form>
                                    </div>
                                </div>
                                {state.isLoading ? < RootLoader /> :
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }} onClick={() => checkEmployee(state, dispatch, getUser.user, props.handleClose)} >Add</button>
                                    </div>}

                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}