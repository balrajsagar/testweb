import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { approveProjects, rejectProject, verifyProject, deleteProject ,closeProject } from './network';
import { useDispatch, useSelector } from 'react-redux';
import { PROJECT, PROJECTNAME, APPROVE, VERIFY, REJECT, PROJECT_DESCRIPTION } from '../../Common/Headers';
import API from '../../Common/Network/API';
import Alert from '../../Common/Alert';

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

// user document model and immigration admin model also
export default function CheckCondition(props) {
    const dispatch = useDispatch();
    const getUser = useSelector(state => state.auth)
    const[check ,setCheck] =useState(false);
    const classNames = useStyles();
    //Close Project start GNK->01 (version 1.0.6)
    const closeProject1 =  async(dispatch,getUser,ideaId,handleClose,handleModalClose)=> {
    // dispatch(isLoading());
    try {
      var response = await API.post("manage_epics.php", {
        corp: getUser.corp,
        idea_id: ideaId,
        action: "complete_epic",
        projectId: getUser.projectId
      },{},false);
      if(response.status === 'True') {
        handleClose()
        Alert("success",response.message)
      }else if( response.status === "false")
      {
        if(response.message === "Are you sure you want to complete this Epic, it has no user stories connected to this"){
            setCheck(true)
            // Alert("warning",response.message)
        }else{
            handleModalClose()
            Alert("warning",response.message)
        }
      }
      // handleClose()
    } catch (error) {
      Alert('error',error.message);
      handleClose()
    }
    // dispatch(isLoaded());
  }
  //Close Project GNK->01 (version 1.0.6)
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classNames.modal}
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                disableBackdropClick={true}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classNames.paper}>
                        <div className="user-modal-dialog d-flex justify-content-center">
                            <div className="modal-content modal-sm p-2" style={{ borderRadius: '8px' }}>
                                <div class="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                    {check ? <h6 class="modal-title p-1">Are you sure you want to complete this {PROJECT}, it has no user stories connected to this ?</h6>:
                                    <h6 class="modal-title p-1">Do you want to {props.data.action} this {PROJECT}?</h6> }
                                    <button style={{backgroundColor:'transparent',border:'0'}} type="button"  className="d-flex align-items-right p-2" data-dismiss="modal" onClick={props.handleModalClose}><i class="mdi mdi-close text-black"></i></button>

                                </div>
                                <div className="modal-body">
                                    <div>
                                        {/* <p>{PROJECTNO}:{props.data.id}</p> */}
                                        <p>{PROJECTNAME}: {props.data.title} </p>
                                        <p>{PROJECT_DESCRIPTION}: {props.data.description} </p>
                                    </div>
                                </div>
                                <div class="modal-footer justify-space-between">
                                    <button type="button" class="btn btn-outline-danger" onClick={props.handleModalClose} style={{ borderRadius: '20px' }}>Cancel</button>
                                    {props.data.action === "Approve" ? <button type="button" class="btn btn-outline-success" onClick={() => approveProjects(dispatch, getUser.user, props.data.id, props.handleClose)} style={{ borderRadius: '20px' }}>{APPROVE}</button> :
                                        props.data.action === "Reject" ? <button type="button" class="btn btn-outline-success" onClick={() => rejectProject(dispatch, getUser.user, props.data.id, props.handleClose)} style={{ borderRadius: '20px' }}>{REJECT}</button> :
                                        props.data.action === "Verify" ? <button type="button" class="btn btn-outline-success" onClick={() => verifyProject(dispatch, getUser.user, props.data.id, props.handleClose,props.handleModalClose)} style={{borderRadius: '20px'  }}>{VERIFY}</button> :
                                        props.data.action === "complete" && check === false ?<button type="button" class="btn btn-outline-success" onClick={() => closeProject1(dispatch, getUser.user, props.data.id, props.handleClose,props.handleModalClose)} style={{borderRadius: '20px'  }}>Yes</button> :
                                        props.data.action === "complete" && check === true ?<button type="button" class="btn btn-outline-success" onClick={() => closeProject(dispatch, getUser.user, props.data.id, props.handleClose,props.handleModalClose)} style={{borderRadius: '20px'  }}>Yes</button> :
                                        <button type="button" class="btn btn-outline-success" onClick={() => deleteProject(dispatch, getUser.user, props.data.id, props.handleClose,props.handleModalClose)} style={{ borderRadius: '20px' }}>Yes</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}