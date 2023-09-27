import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector } from 'react-redux';
import { moduleReducer, initialState } from "./moduleReducer";
import { updateUserstotyStaus } from './network';
import { getSubStringId } from "../../Common/SubStringConvert";
import {MAINTASK} from '../../Common/Headers'







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
export default function ChangeUserstoryStatus(props) {
   
    const getUser = useSelector(state => state.auth)

    const [state,dispatch] = useReducer(moduleReducer, initialState);
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
                                    <h5 class="modal-title p-2">{getSubStringId(getUser.user.corp, 3)}{'-'}{getSubStringId(props.data.todo,5)}  {props.data.story_title}</h5>
                                </div>
                                <div className="modal-body">
                                    <b style={{ backgroundColor: 'red' ,color:'white'}}>User has {getSubStringId(getUser.user.corp, 3)}{'-'}{getSubStringId(props.data.inprogress,5)}{'       '+props.data.inprogress_story_title} In Progress on {props.data.projectName}</b>
                                    <p style={{color:'green',marginTop:'10px'}} ><b>CONFIRM if you want to move {MAINTASK} into In Progress</b></p>


                                    




                                    
                                </div>


                                <div class="modal-footer justify-space-between">
                                    <button type="button" class="btn btn-outline-danger" onClick={props.handleModalClose} style={{ borderRadius: '20px' }}>Cancel</button>

                                        <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }} onClick={(event) => {updateUserstotyStaus(state,dispatch, getUser.user,props.data.todo,props.data.inprogress,props.data.currentSprint,props.data.assignedTo,props.handleClose) }}  >Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}
