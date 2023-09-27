import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { tasksReducer, initialState } from './tasksReducer';
import { useSelector } from 'react-redux';
import { getSubStringId } from "../../Common/SubStringConvert";
import { deleteSprint, moveToArchive, commitSprint } from './network';

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
export default function DeleteSprint(props) {

    const getUser = useSelector(state => state.auth)

    const [state, dispatch] = useReducer(tasksReducer, initialState);
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
                                <div class="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                    <h5 class="modal-title p-2">{props.data.action === 'uncommit_sprint' ? 'UNCOMMIT SPRINT' 
                                    :props.data.action === 'commit_sprint' ? 'COMMIT SPRINT' 
                                    : props.data.action === 'move_to_archive' ? 'MOVE TO ARCHIVE' 
                                    : 'DELETE SPRINT'}</h5>
                                </div>
                                <div className="modal-body">


                                    {props.data.action === 'uncommit_sprint' ? <b>Do you want uncommit Sprint {getSubStringId(getUser.user.corp, 3)}{'-'}  {props.data.title}</b> 
                                    :props.data.action === 'commit_sprint' ? <b>Do you want commit Sprint {getSubStringId(getUser.user.corp, 3)}{'-'}  {props.data.title}</b> 
                                    : props.data.action === 'move_to_archive' ? <b>Do you want to move Sprint {getSubStringId(getUser.user.corp, 3)}{'-'}  {props.data.title} into Archive</b> 
                                    : <b style={{ color: 'red' }}>Do you want delete Sprint {getSubStringId(getUser.user.corp, 3)}{'-'}  {props.data.title}</b>}
                                </div>


                                <div class="modal-footer justify-space-between">
                                    <button type="button" class="btn btn-outline-danger" onClick={props.handleModalClose} style={{ borderRadius: '20px' }}>Cancel</button>
                                    <button type="button" class="btn btn-outline-success" onClick={(event) => {   props.data.action === 'uncommit_sprint' ? commitSprint(props.data.action,state, dispatch, getUser.user, props.data.id, props.handleClose, props.data.title, props.data.targetDate, props.data.startDate) 
                                                                                                                : props.data.action === 'commit_sprint' ? commitSprint(props.data.action,state, dispatch, getUser.user, props.data.id, props.handleClose, props.data.title, props.data.targetDate, props.data.startDate) 
                                                                                                                : props.data.action === 'move_to_archive' ? moveToArchive(state, dispatch, getUser.user, props.data.id, props.handleClose, props.handleClose1) 
                                                                                                                : deleteSprint(state, dispatch, getUser.user, props.data.id, props.handleClose, props.handleClose1) }} style={{ borderRadius: '20px' }}>Confirm</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}
