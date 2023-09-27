import React, { useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import * as actions from './actions'
import { useSelector } from 'react-redux';
import {  modifySubTask } from './network';
import { subtasksReducer, initialState } from './subtaskReducer';
import { SUBTASK,SUBTASK_DESCRIPTION,MODIFYSUBTASK } from '../Headers';



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

//For Modify Existing SubTask
export default function ModifySubTask(props) {
    const [state, dispatch] = useReducer(subtasksReducer, initialState);
    const getUser = useSelector(state => state.auth)
    const classNames = useStyles();
    let time = props.data.estimatedHours;
    let days1 = (Number(time / 24)).toString().split(".");
    var days = days1[0];
    var hours = Number(time % 24);
    useEffect(() => {
        // getUsers(dispatch, getUser.user);
        // getDependency(dispatch,getUser.user,props.data.ideaId);
        dispatch(actions.setModifySubTask(props.data.mainTaskId,props.data.subTaskId,props.data.taskTitle,props.data.taskDesc,days,hours))
        // eslint-disable-next-line
    }, [])
    // var userDetails = [];
    // var dependencyDetails = [];
    // state.users.map((users) => {
    //     return (
    //         userDetails.push({ 'value': users.id, 'label': users.name })
    //     );
    // })
    // state.dependencyUser.map((users) => {
    //     return (
    //         dependencyDetails.push({ 'value': users.id, 'label': users.name })
    //     );
    // })
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
                            <div className="modal-content col-lg-6 p-2" style={{ borderRadius: '10px' }}>
                                <div className="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                    <h5 className="modal-title p-2">{MODIFYSUBTASK}</h5>
                                    <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" className="d-flex align-items-right" data-dismiss="modal" onClick={props.handleModalClose}><i className="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <form >
                                            <div className="form-group row p-2">
                                                <label className="col-form-label pt-4" style={{width:'80px'}}>{SUBTASK} Title</label>
                                                <input type="text" className="form-control col-10 ml-2" id="title" name="title" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.taskTitle.value}
                                                    onChange={(event) => dispatch(actions.taskTitle(event.target.value))} />
                                                 {/* eslint-disable-next-line */}
                                                <label className="col-form-label pt-4" style={{width:'80px'}} style={{width:'80px'}}>{SUBTASK_DESCRIPTION}</label>
                                                <input type="text" className="form-control col-10 ml-2" id="ddescription" name="description" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.taskDescription.value}
                                                    onChange={(event) => dispatch(actions.taskDescription(event.target.value))} />
                                             
                                                </div>
                                                
                                              
                                        </form>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-success" style={{ borderRadius: '20px' }} onClick={(event) => { modifySubTask(state, dispatch, getUser.user, props.data.mainTaskId, props.handleClose) }}>Save</button>
                                    {/* onClick={(event) => { addProject(state, dispatch, getUser.user, props.handleClose) }} */}
                                </div>

                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}