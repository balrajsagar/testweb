// eslint-disable-next-line
import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { privateToDoReducer, initialState } from './privateToDoReducer';
import {  deletePrivateToDo, completePrivateToDo } from './network';
import { useSelector } from 'react-redux';

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

export default function DeletePrivateToDo(props) {

    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(privateToDoReducer, initialState);
    const classNames = useStyles();
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
                            <div className="modal-content col-5 p-2" style={{ borderRadius: '10px' }}>
                                <div className="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                    <h5 className="modal-title p-2" style={{textTransform:'capitalize' }}>
                                     {props.data.view} Task
                                    </h5>
                                </div>
                                <div className="modal-body">
                                    <b>Do you want to {props.data.view} Task ? </b> 
                                </div>


                                <div className="modal-footer justify-space-between">
                                    <button type="button" className="btn btn-outline-success" onClick={props.handleModalClose} style={{ borderRadius: '20px' }}>Cancel</button>
                                    {props.data.view === "delete" ? <button type="button" className="btn btn-outline-danger" 
                                    onClick={(event) => {  deletePrivateToDo(state, dispatch, getUser.user, props.data.data.pt_id, props.handleClose) }} 
                                     style={{ borderRadius: '20px' }}>Delete</button>
                                     :<button type="button" className="btn btn-outline-danger" 
                                    onClick={(event) => {  completePrivateToDo(state, dispatch, getUser.user, props.data.data.pt_id, props.handleClose) }} 
                                     style={{ borderRadius: '20px' }}>Complete</button>}

                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}
