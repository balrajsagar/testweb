import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { MAINTASKID, SUBTASK_DESCRIPTION, ASSIGNED_TO, ASSIGNED_BY,PROJECT_DESCRIPTION,ASSIGNED_DATE,TARGET_DATE,PROJECT_COMPLETED_DATE,SUBTASK_PROGRESS, SUBTASKTITLE,PROJECTNAME,MODULENAME,ACCEPTANCE_CRITERIA ,MAINTASKNAME,STORY_POINTS} from '../Headers';
import { useSelector } from "react-redux";
import { getSubStringId } from '../SubStringConvert';
import convertPSTtoLocalTime from '../convertPSTtoLocalTime';


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
export default function MainTaskInfo(props) {
    const classNames = useStyles();
    const getUser = useSelector(state => state.auth)


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
                            <div className="modal-content col-lg-6 p-2" style={{ borderRadius: '10px', overflowWrap: "break-word" }}>
                                <div className="modal-body">
                                    {(props.data.view === "taskInfo") ?
                                        <div >
                                            
                                            <p><b >{MAINTASKID}</b> :{getSubStringId(getUser.user.corp,3)}-{getSubStringId(props.data.taskId,5)}</p>
                                            <p><b>{PROJECTNAME}</b> : {props.data.epicId ===null ?'NA':props.data.projectName} </p>
                                            <p><b>{MODULENAME}</b> : {props.data.moduleId ===null? 'NA':props.data.moduleName} </p>

                                            <p><b>{MAINTASKNAME}</b> : {props.data.title} </p>
                                            <p><b>{STORY_POINTS}</b> : {props.data.storyPoints} </p>
                                            <p><b>{ACCEPTANCE_CRITERIA}</b>: <span style={{whiteSpace:'break-spaces'}}>{props.data.acceptanceCriteria}</span> </p>
                                            <p ><b>{PROJECT_DESCRIPTION}</b> : {props.data.description} </p>
                                            <p ><b>{ASSIGNED_TO}</b> : {props.data.assignedTo} </p>
                                            <p ><b>{ASSIGNED_BY}</b> : {props.data.assignedBy} </p>
                                            <p ><b>{ASSIGNED_DATE}</b> : {convertPSTtoLocalTime(props.data.createdDate)} </p>
                                            <p ><b>{SUBTASK_PROGRESS}</b> : {props.data.taskProgress}% </p>
                                            {props.data.completedStatus === "completed" ? <p ><b>{PROJECT_COMPLETED_DATE}</b> : {convertPSTtoLocalTime(props.data.completedDate)} </p>
                                            
                                            : null}
                                            <p><b>{TARGET_DATE}</b> : {props.data.targetDate}</p>
                                        </div> 
                                        : (props.data.view === "sprintInfo") ?
                                            <div>
                                                <p><b>Sprint Id</b> : {props.data.id} </p>
                                                {(props.data.epic != null) ?
                                                    <p><b>Epic Name</b> : {props.data.epic} </p> : null}
                                                <p><b>Sprint Name</b> : {props.data.title} </p>
                                                <p><b>Start Date </b>: {convertPSTtoLocalTime(props.data.startDate)} </p>
                                                <p><b>Target Date</b> : {convertPSTtoLocalTime(props.data.targetDate)} </p>
                                                <p><b>Created By</b> : {props.data.createdBy} </p>
                                                <p><b>Created On</b> : {convertPSTtoLocalTime(props.data.created_on)} </p>


                                            </div> 
                                            :
                                            <div>
                                                <p ><b>{MAINTASKNAME}</b>:{props.data.taskTitle} </p>
                                                <p ><b>{SUBTASKTITLE}</b>:{props.data.task} </p>

                                                <p ><b>{SUBTASK_DESCRIPTION}</b>: {props.data.subTaskDesc}</p>
                                                <p ><b>{ASSIGNED_TO}</b>: {props.data.assignedTo}</p>
                                                <p ><b>{ASSIGNED_BY}</b>: {props.data.assignedBy}</p>
                                                <p ><b>{TARGET_DATE}</b>: {props.data.targetDate}</p>

                                            </div>
                                    }
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-success" onClick={props.handleModalClose} style={{ borderRadius: '20px' }}>Ok</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}