/*
FileName:UserModule/Team/addAccount.js
purpose:adding account
Developers:Naveen Kumar Gade - NKG,
Created Date: 01/06/20203
 */
import React, { useReducer, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { checkEmployee, getSquadList } from './network';
import { useSelector } from 'react-redux';
import { accountReducer, initialState } from './accountReducer';
import * as actions from './actions';
import RootLoader from '../../Common/Loader/RootLoader';

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
export default function AddAccount(props) {

    const classNames = useStyles();
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(accountReducer, initialState)
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
                                    <h5 class="modal-title p-2">New Account</h5>
                                    <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" className="d-flex align-items-right p-2" data-dismiss="modal" onClick={props.handleModalClose}><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body" style={{ height: '400px', overflow: 'scroll' }}>
                                    <div>

                                        <form >
                                            <div class="form-group required row p-4" style={{ marginTop: '-30px' }}>
                                                <label for="recipient-name" class="col-form-label pt-4" style={{ width: "100px" }}>Username<span style={{ color: "red" }} >*</span></label>
                                                <input type="text" class="form-control col-10 ml-2 " id="recipient-fullName" name="Name" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.fullName.value}
                                                    onChange={(event) => dispatch(actions.fullName(event.target.value))} />
                                                <span class=" col-10 ml-2 " style={{ color: "red", fontSize: '12px', paddingLeft: "15%" }}>{state.fullName.errorStatus ? state.fullName.errormessage : ""}</span>
                                            </div>
                                            <div class="form-group required row p-4" style={{ marginTop: "-70px" }}>
                                                <label for="recipient-email" class="col-form-label pt-4" style={{ width: "100px" }}>Email<span style={{ color: "red" }} >*</span></label>
                                                <input type="text" class="form-control col-10 ml-2 " id="recipient-email" name="Email" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.email.value}
                                                    onChange={(event) => dispatch(actions.email(event.target.value))} />
                                                <span class=" col-10 ml-2 " style={{ color: "red", fontSize: '12px', paddingLeft: "15%" }}>{state.email.errorStatus ? state.email.errormessage : ""}</span>
                                            </div>
                                            <div class="form-group required row p-4" style={{ marginTop: "-70px" }}>
                                                <label for="recipient-name" class="col-form-label pt-4" style={{ width: "100px" }}>Password</label>
                                                <input type="password" class="form-control col-10 ml-2 " id="recipient-password" name="Username" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.password.value}
                                                    onChange={(event) => dispatch(actions.password(event.target.value))}
                                                />
                                                <span class=" col-10 ml-2 " style={{ color: "red", fontSize: '12px', paddingLeft: "15%" }}>{state.password.errorStatus ? state.password.errormessage : ""}</span>
                                            </div>
                                            <div class="form-group required row p-4" style={{ marginTop: "-70px" }}>
                                                <label for="recipient-name" class="col-form-label pt-4" style={{ width: "100px" }}>Confirm Password</label>
                                                <input type="password" class="form-control col-10 ml-2 " id="recipient-confirm-password" name="Username" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.confirmpassword.value}
                                                    onChange={(event) => dispatch(actions.confirmpassword(event.target.value, state.password.value))}
                                                />
                                                <span class=" col-10 ml-2 " style={{ color: "red", fontSize: '12px', paddingLeft: "15%" }}>{state.confirmpassword.errorStatus ? state.confirmpassword.errormessage : ""}</span>
                                            </div>
                                            <div class="form-group required row p-4" style={{ marginTop: "-70px" }}>
                                                <label for="recipient-uname" class="col-form-label pt-4" style={{ width: "100px" }}>Phone number<span style={{ color: "red" }} >*</span></label>
                                                <input type="number" class="form-control col-10 ml-2 " id="recipient-mobile" name="mobile" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.mobile.value}
                                                    onChange={(event) => dispatch(actions.mobile(event.target.value))} />
                                                {/* <span class=" col-10 ml-2 " style={{ color: "red", fontSize: '12px', paddingLeft: "15%" }}>{state.mobile.errorStatus ? state.mobile.errormessage : ""}</span> */}
                                            </div>
                                            <div class="form-group required row p-4" style={{ marginTop: "-70px" }}>
                                                <label for="recipient-name" class="col-form-label pt-4" style={{ width: "100px" }}>Client Name<span style={{ color: "red" }} >*</span></label>
                                                <input type="text" class="form-control col-10 ml-2 " id="recipient-clientname" name="clientname" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.clientname.value}
                                                    onChange={(event) => dispatch(actions.clientname(event.target.value))}
                                                />
                                            </div>
                                            <div class="form-group required row p-4" style={{ marginTop: "-70px" }}>
                                                <label for="recipient-name" class="col-form-label pt-4" style={{ width: "100px" }}>No of projects<span style={{ color: "red" }} >*</span></label>
                                                <input type="number" class="form-control col-10 ml-2 " id="no_of_projects-name" name="no_of_projects" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.no_of_projects.value}
                                                    onChange={(event) => dispatch(actions.no_of_projects(event.target.value))}
                                                />
                                            </div>
                                            <div class="form-group required row p-4" style={{ marginTop: "-70px" }}>
                                                <label for="recipient-name" class="col-form-label pt-4" style={{ width: "100px" }}>No of Users<span style={{ color: "red" }} >*</span></label>
                                                <input type="number" class="form-control col-10 ml-2 " id="no_of_projects-name" name="no_of_projects" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.no_of_users.value}
                                                    onChange={(event) => dispatch(actions.no_of_users(event.target.value))}
                                                />
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