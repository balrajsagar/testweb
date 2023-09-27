import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import API from '../../Common/Network/API';
import { useSelector } from 'react-redux';
import Alert from '../../Common/Alert';
// import {MAINTASK,PENDING_SUBTASKS} from '../../Common/Headers'
import { getSubStringId } from "../../Common/SubStringConvert";
import convertPSTtoLocalTime from '../../Common/convertPSTtoLocalTime';


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
export default function TaskInfo(props) {
    // console.log(props.data.id)
    const classNames = useStyles();
    const getUser = useSelector(state => state.auth)
    const [story, setStories] = useState([]);
    useEffect(() => {
        getCommentUserStory(props.data.id)
        // eslint-disable-next-line
    }, [])

    //Get Comments for UserStory  Where We Have and Who can Add comments for that
    const getCommentUserStory = async (userStoryId) => {
        try {
            const response = await API.post("story_comments.php", {
                action: "get_story_comment",
                storyId: userStoryId,
                corp: getUser.user.corp,
            }, {}, false);
            // console.log(response)
            if (response.status === "True") {
                setStories(response.data)
            } else {
                // Alert('warning', response.message)
            }
        }
        catch (error) {
            Alert('error', error.message)
        }
    }
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
                {/* <Fade in={props.open}>
                    <div className={classNames.paper}>
                        <div className="user-modal-dialog d-flex justify-content-center">
                            <div className="modal-content modal-sm p-2" style={{ borderRadius: '10px', overflowWrap: "break-word" }}>
                                <div className="modal-body">
                                    <div>
                                        {/* <h5>Task {props.data.id}</h5> */}
                                        {/* {story.length > 0 ?
                                            story.map((story, index) => {
                                                return (
                                                    <p>{index+1} . {story.message} {story.fullName} on {story.statusDate}</p>
                                                );
                                            })
                                            : null} */}
                                        {/* <p className="text-success">{props.data.description || props.data.taskDesc} </p> */}
                                        {/* <p className="text-info">Path : {props.data.ideaTitle}/{props.data.moduleDesc}/{props.data.mainTaskTitle}</p>
                                        {props.data.laneId === "RoadBlock" ? null : props.data.status === "pending" ? <p className="text-info">Task TimeLeft : {props.data.timeLeft} </p>
                                            : <p className="text-info">Task ExtraHours : {props.data.extraHours} </p>} */}
                                    {/* </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-success" onClick={props.handleClose} style={{ borderRadius: '20px' }}>Ok</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>  */}
                <Fade in={props.open}>
                    <div className={classNames.paper}>
                        <div className="user-modal-dialog d-flex justify-content-center">
                            <div className="modal-content col-3 p-2" style={{ borderRadius: '10px' }}>
                                <div class="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                    <div className="column">
                                        {/* {/* <h5 class="modal-title">User Story -{state.groupName}</h5> */}
                                        <h6 class="modal-title">{getSubStringId(getUser.user.corp, 3)}{'-'}{getSubStringId(props.data.id,5)}  {props.data.title}</h6>
                                    </div>
                                    <button style={{backgroundColor:'transparent',border:'0'}} type="button" onClick={props.handleClose} className="d-flex align-items-right" data-dismiss="modal"><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body">
                                    <div className="overflow-auto" style={{ height: '150px',display:'flex',flexDirection: 'column',overflow:'reverse-auto' }}>
                                    {story.length > 0 ?
                                            story.slice(0).reverse().map((comments, index) => {
                                                return (
                                            // style={ story.cardId === "1" ? { color:'grey' } : story.cardId === "2" ? {color:'green'}: story.cardId === "3" ? {color:'green'}: {color:'red'}}
                                            <p className="text-left" ><p className="pt-1" style={{color:'blue',textTransform:"capitalize"}}>{comments.fullName}&nbsp;<q style={{color:'grey',fontSize:"10px", textTransform:"lowercase"}}>on {convertPSTtoLocalTime(comments.statusDate)}</q></p>{story.length-index} . {comments.message}</p> 
                                            )
                                        }) : null}
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-success" onClick={props.handleClose} style={{ borderRadius: '20px' }}>Ok</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}