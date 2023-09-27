import React, { useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector } from 'react-redux';
import { chatReducer, initialState } from './reducer';
import { getMessages, groupMembersList } from './network';
import * as actions from './actions';
import Alert from '../Alert';
import { isLoaded, isLoading } from '../Actions/loading';
import API from '../Network/API';
import {SUBTASK,MEMBERS} from '../Headers';
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


export default function ChatBox(props) {
    const classNames = useStyles();
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(chatReducer, initialState)
    useEffect(() => {
        groupMembersList(dispatch, getUser.user, props.data);
        getMessages(dispatch, getUser.user, props.data);
        // eslint-disable-next-line
    }, [])
    const sendMessage = async () => {
        if (state.comment !== "") {
            dispatch(isLoading());
            try {
                var response = await API.post("taskChat.php", {
                    action: "send",
                    corp_code: getUser.user.corp,
                    groupId: props.data.id,
                    message: state.comment,
                    messagedBy: getUser.user.empId,
                }, {}, false);
                console.log(response)
                    getMessages(dispatch, getUser.user, props.data);
                    dispatch(actions.comment(""));
            } catch (error) {
                console.log(error)
            }
            dispatch(isLoaded());
        } else {
            Alert("warning", "Please type the message");
        }
    }
    const handleKeypress = e => {
        //it triggers by pressing the enter key
      if (e.which === 13) {
        sendMessage();
      }
    };
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
                            <div className="modal-content col-6 p-2" style={{ borderRadius: '10px' }}>
                                <div class="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                    <div className="column">
                                        <h5 class="modal-title">{SUBTASK} -{state.groupName}</h5>
                                        <h6 class="modal-title">{MEMBERS} - {state.groupList}</h6>
                                    </div>
                                    <button style={{backgroundColor:'transparent',border:'0'}} type="button" onClick={props.handleModalClose} className="d-flex align-items-right" data-dismiss="modal"><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body">
                                    <div className="overflow-auto" style={{ height: '250px',display:'flex',flexDirection:'column',overflow:'auto' }}>
                                        {state.taskComments !== '' ? state.taskComments.map((comments) => {
                                            return (
                                                comments.messagedBy !== getUser.user.empId ?
                                            <p className="text-left" ><p className="pt-2" style={{color:'blue'}}>{comments.username}</p>{comments.message}<p style={{color:'grey',fontSize:"8px"}}>{convertPSTtoLocalTime(comments.messagedTime)}</p></p> :
                                                    <p className="text-right pr-3" ><p className="pt-2" style={{color:'green'}}>{comments.username}</p>{comments.message}<p style={{color:'grey',fontSize:"8px"}}>{convertPSTtoLocalTime(comments.messagedTime)}</p></p>
                                            )
                                        }) : null}
                                    </div>
                                </div>
                                <div class="modal-footer m-1">
                                
                                    <input type="text" class="form-control col-10 " id="recipient-name" style={{ borderColor: 'grey', borderRadius: '20px' }} 
                                     value={state.comment} onChange={(event) => dispatch(actions.comment(event.target.value))} onKeyPress={handleKeypress}/>
                                    <button type="submit" class="btn btn-outline-success" style={{ borderRadius: '20px' }} onClick={() => sendMessage()}>Send</button>
                                  
                                </div>

                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}