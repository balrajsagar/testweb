import React, { useEffect, useReducer, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector } from 'react-redux';
import { chatReducer, initialState } from './reducer';
import { getMessages, updateChat } from './network';
import * as actions from './actions';
import Alert from '../Alert';
import { isLoaded, isLoading } from '../Actions/loading';
import API from '../Network/API';
// filepond
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import { CHATAPI, ATTACH_FILE } from '../Headers';
// import RootLoader from '../Loader/RootLoad';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css";
import "../vendor/doka.min.css";
import { create } from "../vendor/doka.esm.min";
import convertPSTtoLocalTime from '../convertPSTtoLocalTime';
// Register the plugins
registerPlugin(FilePondPluginImageEdit, FilePondPluginImagePreview, FilePondPluginImageExifOrientation,
    FilePondPluginFileValidateType, FilePondPluginImageResize, FilePondPluginImageTransform)

// Register the plugins
// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType)


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


export default function UserChat(props) {
    const classNames = useStyles();
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(chatReducer, initialState)
    const [chat, setChat] = useState(0);
    const [copyfile, setCopyFile] = useState({});
    const [docFile, setDocFile] = useState({});
    const [handleHover, setHandleHover] = useState(false);
    const [commentDetails, setCommentDetails] = useState({});
    const [disable, setDisable] = useState(false);
    useEffect(() => {
        getMessages(dispatch, getUser.user, props.data);
        updateChat(props.data.sno, dispatch, getUser.user)
        // eslint-disable-next-line
    }, [])
    const handleChat = () => {
        setChat(1)
    }
    const handleChatClose = () => {
        setChat(0)
    }


    const sendMessage = async () => {
        if (state.comment !== "") {
            setDisable(true)
            dispatch(isLoading());
            try {
                var response = await API.post("user_chat.php", {
                    action: "send",
                    corp_code: getUser.user.corp,
                    sendBy: getUser.user.empId,
                    receivedBy: props.data.id,
                    message: state.comment,
                    messagedBy: getUser.user.empId,
                    projectId: getUser.user.projectId,
                    device_id: props.data.device_id,
                    player_id: props.data.player_id,
                    reply_id: commentDetails.id ? commentDetails.id : "",
                }, {}, false);
                console.warn(response)
                getMessages(dispatch, getUser.user, props.data);
                dispatch(actions.comment(""));
                setDisable(false)
                setHandleHover(false);
                setCommentDetails({});
            } catch (error) {
                setDisable(false)
                console.log(error)
            }
            setDisable(false)
            dispatch(isLoaded());
        } else {
            setDisable(false)
            Alert("warning", "Please type the message");
        }
    }

    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.which === 13) {
            if (state.comment !== "") {
                sendMessage();
            } else {
                fileHandle(docFile)
            }
        }
    };
    // console.log(BaseUrl)
    const fileHandle = async (file) => {
        if (file !== "" && file.name !== undefined) {
            setDisable(true)
            dispatch(isLoading());
            const data = new FormData();
            data.append('file', file);
            data.append('message', file.name);
            // required data for send message
            data.append('action', 'media');
            data.append('projectId', getUser.user.projectId);
            data.append('corp_code', getUser.user.corp);
            data.append('sendBy', getUser.user.empId);
            data.append('receivedBy', props.data.id);
            data.append('messagedBy', getUser.user.empId);
            data.append('api', CHATAPI);
            data.append('reply_id', commentDetails.id ? commentDetails.id : "")
            try {
                // eslint-disable-next-line
                var response = await API.post("userChat1.php", data
                    , {}, false);
                // console.log(response)
                getMessages(dispatch, getUser.user, props.data);
                dispatch(actions.comment(""));
                setChat(0)
                setDocFile({})
                setDisable(false)
                setHandleHover(false);
                setCommentDetails({});
            } catch (error) {
                console.log(error)
                setDisable(false)
            }
            setDisable(false)
            dispatch(isLoaded());
        } else {
            setDisable(false)
            Alert("warning", "Please type the message");
        }
    }
    const myPaste = (e) => {
        window.addEventListener('paste', e => {
            setCopyFile(e.clipboardData.files[0])
            if (e.clipboardData.files.length !== 0) {
                setChat(2)
            }
        });

    }
    const handleDoc = (file) => {
        const fileData = file.file
        // console.log("file",fileData)
        setDocFile(fileData)
    }

    var textInput = null;
    const handlecom = (comment) => {
        setCommentDetails(comment)
        setHandleHover(true);
        if (textInput) textInput.focus();
    }
    // console.log("hanldehover",state.taskComments)

    const handleMouseOut = () => {
        setHandleHover(false);
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
                                        <h5 class="modal-title p-1">{props.data.name}</h5>
                                    </div>
                                    <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" onClick={props.handleModalClose} className="d-flex align-items-right" data-dismiss="modal"><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body">
                                    <div className="overflow-auto" style={{ height: '250px', display: 'flex', flexDirection: 'column-reverse', overflow: 'auto' }} >
                                        {state.taskComments !== '' ? state.taskComments.slice(0).reverse().map((comments, index) => {

                                            return (
                                                comments.messagedBy !== getUser.user.empId ?


                                                    <p className="text-left pr-3"  >
                                                        <p className="pt-2" style={{ color: 'green' }}>{comments.username}&nbsp;<q style={{ color: 'grey', fontSize: "8px" }}>{convertPSTtoLocalTime(comments.messagedTime)}</q></p>
                                                        {comments.path ?
                                                            <div style={{ height: "67%", backgroundColor: "#f3f3f3", float: "left", borderRadius: '7px' }}>

                                                                {/* for image with reply content and dropdown left side content */}
                                                                {comments.reply_message !== null ?
                                                                    <li className="dropdown show" style={{ listStyle: "none", float: "right" }}>
                                                                        <div style={{ backgroundColor: "#D2ECDF", borderRadius: "7px", padding: "10px" }}>
                                                                            <p style={{ color: "green", }}>{comments.reply_username}</p>
                                                                            <p style={{ display: "inline-block", textAlign: 'left', width: "100%", whiteSpace: "normal", overflow: "hidden !important", textOverflow: "ellipsis", paddingRight: "5px" }}>
                                                                                {comments.reply_path ?
                                                                                    comments.reply_path.substr(comments.reply_path.length - 4) === "blob" && comments.reply_message.match(/.(jpg|jpeg|png|gif)$/i) ?
                                                                                        // eslint-disable-next-line 
                                                                                        <a download={comments.reply_path} className='text-primary' target="_blank" href={comments.reply_path}>
                                                                                            <img alt={comments.reply_message} src={comments.reply_path} width="60" height="60" /></a> :
                                                                                        !comments.reply_path.match(/.(jpg|jpeg|png|gif)$/i) ?
                                                                                            //  eslint-disable-next-line  
                                                                                            <a download={comments.reply_message} className='text-primary' target="_blank" href={comments.reply_path}>
                                                                                                {comments.reply_message}</a> :
                                                                                            //  eslint-disable-next-line  
                                                                                            <a download={comments.reply_path} className='text-primary' target="_blank" href={comments.reply_path}>
                                                                                                <img alt={comments.reply_message} src={comments.reply_path} width="60" height="60" /></a>
                                                                                    : comments.reply_message}
                                                                            </p></div>
                                                                        {/* drop-down icon and reply button */}
                                                                        <p style={{ borderRadius: '30px', color: "gray", padding: '0px', cursor: 'pointer', float: 'right' }} className="btn dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></p>
                                                                        <div className="dropdown-menu dropdown-menu-left navbar-dropdown" style={{ borderRadius: "7px", minWidth: "fit-content" }} aria-labelledby="dropdownMenuLink">
                                                                            {/* eslint-disable-next-line   */}
                                                                            <a className="dropdown-item" onClick={() => handlecom(comments)}>Reply</a>
                                                                        </div>
                                                                        {/* End of drop-down icon and reply button */}

                                                                        <p style={{ backgroundColor: "#f3f3f3", width: '100%', textAlign: 'right', padding: "12px 10px 12px 14px", borderRadius: "7px" }}>
                                                                            {/* {comments.message} */}
                                                                            {comments.path.substr(comments.path.length - 4) === "blob" && comments.message.match(/.(jpg|jpeg|png|gif)$/i) ?
                                                                                //  eslint-disable-next-line
                                                                                <a download={comments.path} className='text-primary' target="_blank" href={comments.path}>
                                                                                    <img style={{ marginTop: '-12px', marginRight: '12px' }} alt={comments.message} src={comments.path} width="400" /></a>
                                                                                :
                                                                                !comments.path.match(/.(jpg|jpeg|png|gif)$/i) ?
                                                                                    //  eslint-disable-next-line
                                                                                    <a download={comments.message} className='text-primary' target="_blank" href={comments.path}>{comments.message}</a>
                                                                                    :
                                                                                    //  eslint-disable-next-line 
                                                                                    <a download={comments.path} className='text-primary' target="_blank" href={comments.path}>
                                                                                        <img style={{ marginTop: '-14px', marginRight: '14px' }} alt={comments.message} src={comments.path} width="400" /></a>
                                                                            }
                                                                            {/* eslint-disable-next-line  */}

                                                                        </p>
                                                                    </li>

                                                                    :
                                                                    // for image with left side dropdown and image only
                                                                    <li className="dropdown show" style={{ listStyle: "none" }}>
                                                                        <a href="/" style={{ borderRadius: '30px', color: "gray", padding: '0px', float: 'right' }} className="btn dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        </a>
                                                                        <div className="dropdown-menu dropdown-menu-right navbar-dropdown" style={{ borderRadius: "7px", minWidth: "fit-content" }} aria-labelledby="dropdownMenuLink">
                                                                            {/* eslint-disable-next-line */}
                                                                            <a className="dropdown-item" onClick={() => handlecom(comments)}>Reply</a>
                                                                        </div>
                                                                        <p style={{ backgroundColor: "#f3f3f3", padding: "12px 10px 12px 14px", borderRadius: "7px", marginTop: '4px' }}>

                                                                            {comments.path.substr(comments.path.length - 4) === "blob" && comments.message.match(/.(jpg|jpeg|png|gif)$/i) ?
                                                                                //   eslint-disable-next-line 
                                                                                <a download={comments.path} className='text-primary' target="_blank" href={comments.path}>
                                                                                    <img style={{ marginTop: '-8px', marginRight: '12px' }} alt={comments.message} src={comments.path} width="400" /></a>
                                                                                :
                                                                                !comments.path.match(/.(jpg|jpeg|png|gif)$/i) ?
                                                                                    //    eslint-disable-next-line 
                                                                                    <a download={comments.message} className='text-primary' target="_blank" href={comments.path}>{comments.message}</a>
                                                                                    :
                                                                                    //  eslint-disable-next-line 
                                                                                    <a download={comments.path} className='text-primary' target="_blank" href={comments.path}>
                                                                                        <img style={{ marginTop: '-8px', marginRight: '12px' }} alt={comments.message} src={comments.path} width="400" /></a>
                                                                            }
                                                                            {/* eslint-disable-next-line */}

                                                                        </p>
                                                                    </li>
                                                                }</div>
                                                            :
                                                            //for message display reply content and dropdown left side reply messages 
                                                            comments.reply_message !== null ?
                                                                <li className="dropdown show" style={{ listStyle: "none", float: "left" }}>
                                                                    <div style={{ backgroundColor: "#D2ECDF", borderRadius: "7px", width: '100%', textAlign: 'left', padding: "12px 10px 12px 14px" }}>
                                                                        <p style={{ color: "green", }}>{comments.reply_username}</p>
                                                                        <p style={{ display: "inline-block", whiteSpace: "normal", overflow: "hidden !important", textOverflow: "ellipsis", paddingRight: "12px" }}>
                                                                            {comments.reply_path ?
                                                                                comments.reply_path.substr(comments.reply_path.length - 4) === "blob" && comments.reply_message.match(/.(jpg|jpeg|png|gif)$/i) ?
                                                                                    // eslint-disable-next-line 
                                                                                    <a download={comments.reply_path} className='text-primary' target="_blank" href={comments.reply_path}>
                                                                                        <img alt={comments.reply_message} src={comments.reply_path} width="60" height="60" /></a> :
                                                                                    !comments.reply_path.match(/.(jpg|jpeg|png|gif)$/i) ?
                                                                                        //  eslint-disable-next-line  
                                                                                        <a download={comments.reply_message} className='text-primary' target="_blank" href={comments.reply_path}>
                                                                                            {comments.reply_message}</a> :
                                                                                        //  eslint-disable-next-line  
                                                                                        <a download={comments.reply_path} className='text-primary' target="_blank" href={comments.reply_path}>
                                                                                            <img alt={comments.reply_message} src={comments.reply_path} width="60" height="60" /></a>
                                                                                : comments.reply_message}
                                                                        </p>
                                                                    </div>
                                                                    <a href="/" style={{ borderRadius: '30px', color: "gray", padding: '10px', float: 'right', marginTop: '-8px' }} className="btn dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-left navbar-dropdown" style={{ borderRadius: "7px", minWidth: "fit-content" }} aria-labelledby="dropdownMenuLink">
                                                                        {/* eslint-disable-next-line   */}
                                                                        <a className="dropdown-item" onClick={() => handlecom(comments)}>Reply</a>
                                                                    </div>
                                                                    <p style={{ backgroundColor: "#f3f3f3", width: '100%', textAlign: 'left', padding: "12px 10px 12px 14px", borderRadius: "7px", marginTop: '-8px' }}>
                                                                        {comments.message}
                                                                        {/* eslint-disable-next-line  */}

                                                                    </p>
                                                                </li>
                                                                :
                                                                // for message display dropdown left side of chat box messages
                                                                <li className="dropdown show" style={{ listStyle: "none" }}>
                                                                    <div className="row" style={{ margin: '0px' }}>
                                                                        <div className="col-md-11" style={{ maxWidth: 'fit-content', padding: '0px' }}>
                                                                            <p style={{ backgroundColor: "#f3f3f3", width: 'fit-content', textAlign: 'left', padding: "12px 10px 12px 14px", borderRadius: "7px 0px 0px 7px", paddingTop: '12px', paddingLeft: '14px', wordBreak: 'break-all' }}>
                                                                                {comments.message} </p>
                                                                        </div>
                                                                        <div className="col-md-1" style={{ backgroundColor: "#f3f3f3", marginBottom: '4.5px', padding: '0px', borderRadius: "0px 7px 7px 0px" }}>
                                                                            <a href="/" style={{ borderRadius: '30px', color: "gray", padding: '0px', marginTop: '12px' }} className="btn dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                            </a>
                                                                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown" style={{ borderRadius: "7px", minWidth: "fit-content" }} aria-labelledby="dropdownMenuLink">
                                                                                {/* eslint-disable-next-line   */}
                                                                                <a className="dropdown-item" onClick={() => handlecom(comments)}>Reply</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* <p style={{backgroundColor:"#f3f3f3", width:'fit-content',textAlign: 'left', padding: "12px 10px 12px 14px", borderRadius:"7px" , paddingTop:'12px',paddingLeft:'14px',wordBreak:'break-all'}}>
                {comments.message} </p> */}
                                                                    {/* eslint-disable-next-line  */}


                                                                </li>}</p> :


                                                    //user messages     user message    user  messages
                                                    <p className="text-right pr-3" ><p className="pt-2" style={{ color: 'green' }}>{comments.username}&nbsp;<q style={{ color: 'grey', fontSize: "8px" }}>{convertPSTtoLocalTime(comments.messagedTime)}</q></p>
                                                        {comments.path ?
                                                            <div style={{ height: "67%", backgroundColor: "#f3f3f3", padding: '0px', float: "right" }}>

                                                                {/* for image with reply content and dropdown for right side chat    */}
                                                                {comments.reply_message !== null ?
                                                                    <li className="dropdown show" style={{ listStyle: "none", float: "right" }}>
                                                                        <div style={{ backgroundColor: "#D2ECDF", borderRadius: "7px", padding: "10px" }}>
                                                                            <p style={{ color: "green", }}>{comments.reply_username}</p>
                                                                            <p style={{ display: "inline-block", textAlign: 'right', width: "100%", whiteSpace: "normal", overflow: "hidden !important", textOverflow: "ellipsis", paddingRight: "5px" }}>
                                                                                {comments.reply_path ?
                                                                                    comments.reply_path.substr(comments.reply_path.length - 4) === "blob" && comments.reply_message.match(/.(jpg|jpeg|png|gif)$/i) ?
                                                                                        // eslint-disable-next-line 
                                                                                        <a download={comments.reply_path} className='text-primary' target="_blank" href={comments.reply_path}>
                                                                                            <img alt={comments.reply_message} src={comments.reply_path} width="60" height="60" /></a> :
                                                                                        !comments.reply_path.match(/.(jpg|jpeg|png|gif)$/i) ?
                                                                                            //  eslint-disable-next-line  
                                                                                            <a download={comments.reply_message} className='text-primary' target="_blank" href={comments.reply_path}>
                                                                                                {comments.reply_message}</a> :
                                                                                            //  eslint-disable-next-line  
                                                                                            <a download={comments.reply_path} className='text-primary' target="_blank" href={comments.reply_path}>
                                                                                                <img alt={comments.reply_message} src={comments.reply_path} width="60" height="60" /></a>
                                                                                    : comments.reply_message}
                                                                            </p></div>
                                                                        <p style={{ borderRadius: '30px', color: "gray", padding: '0px', cursor: 'pointer' }} className="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></p>
                                                                        <div className="dropdown-menu dropdown-menu-left navbar-dropdown" style={{ borderRadius: "7px", minWidth: "fit-content" }} aria-labelledby="dropdownMenuLink">
                                                                            {/* eslint-disable-next-line   */}
                                                                            <a className="dropdown-item" onClick={() => handlecom(comments)}>Reply</a>
                                                                        </div>
                                                                        <p style={{ backgroundColor: "#f3f3f3", width: '100%', textAlign: 'right', padding: "12px 10px 12px 14px", borderRadius: "7px" }}>
                                                                            {/* {comments.message} */}
                                                                            {comments.path.substr(comments.path.length - 4) === "blob" && comments.message.match(/.(jpg|jpeg|png|gif)$/i) ?
                                                                                //  eslint-disable-next-line
                                                                                <a download={comments.path} className='text-primary' target="_blank" href={comments.path}>
                                                                                    <img style={{ marginTop: '-20px', marginRight: '15px' }} alt={comments.message} src={comments.path} width="400" /></a>
                                                                                :
                                                                                !comments.path.match(/.(jpg|jpeg|png|gif)$/i) ?
                                                                                    //  eslint-disable-next-line
                                                                                    <a download={comments.message} className='text-primary' target="_blank" href={comments.path}>{comments.message}</a>
                                                                                    :
                                                                                    //  eslint-disable-next-line 
                                                                                    <a download={comments.path} className='text-primary' target="_blank" href={comments.path}>
                                                                                        <img style={{ marginTop: '-20px', marginRight: '15px' }} alt={comments.message} src={comments.path} width="400" /></a>
                                                                            }
                                                                            {/* eslint-disable-next-line  */}
                                                                        </p>
                                                                    </li>
                                                                    :
                                                                    // for image with right side dropdown and image only
                                                                    <li className="dropdown show" style={{ listStyle: "none" }}>
                                                                        {/* drop-down icon and reply button */}
                                                                        <p style={{ borderRadius: '30px', color: "gray", padding: '0px' }} className="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        </p>
                                                                        <div className="dropdown-menu dropdown-menu-right navbar-dropdown" style={{ borderRadius: "7px", minWidth: "fit-content" }} aria-labelledby="dropdownMenuLink">
                                                                            {/* eslint-disable-next-line */}
                                                                            <a className="dropdown-item" onClick={() => handlecom(comments)}>Reply</a>
                                                                        </div>
                                                                        {/*End of drop-down icon and reply button */}
                                                                        <p style={{ backgroundColor: "#f3f3f3", width: '100%', textAlign: 'left', padding: "12px 10px 12px 14px", borderRadius: "7px" }}>
                                                                            {comments.path.substr(comments.path.length - 4) === "blob" && comments.message.match(/.(jpg|jpeg|png|gif)$/i) ?
                                                                                //  eslint-disable-next-line
                                                                                <a download={comments.path} className='text-primary' target="_blank" href={comments.path}>
                                                                                    <img style={{ marginTop: '-25px', marginRight: '15px' }} alt={comments.message} src={comments.path} width="400" /></a>
                                                                                :
                                                                                !comments.path.match(/.(jpg|jpeg|png|gif)$/i) ?
                                                                                    //  eslint-disable-next-line
                                                                                    <a download={comments.message} className='text-primary' target="_blank" href={comments.path}>{comments.message}</a>
                                                                                    :
                                                                                    //  eslint-disable-next-line 
                                                                                    <a download={comments.path} className='text-primary' target="_blank" href={comments.path}>
                                                                                        <img alt={comments.message} src={comments.path} width="400" /></a>
                                                                            }
                                                                            {/* eslint-disable-next-line */}

                                                                        </p>
                                                                    </li>
                                                                }</div>
                                                            //for message display reply content and dropdown right side content
                                                            : comments.reply_message !== null ?
                                                                <li className="dropdown show" style={{ listStyle: "none", float: "right" }}>
                                                                    <div style={{ backgroundColor: "#D2ECDF", borderRadius: "7px", width: '100%', textAlign: 'left', padding: '12px 10px 12px 14px' }}>
                                                                        <p style={{ color: "green", float: "left" }}>{comments.reply_username}</p><br />
                                                                        <p
                                                                            style={{ display: "inline-block", width: '100%', textAlign: 'left', whiteSpace: "normal", overflow: "hidden !important", textOverflow: "ellipsis", paddingRight: "5px" }}>
                                                                            {comments.reply_path ?
                                                                                comments.reply_path.substr(comments.reply_path.length - 4) === "blob" && comments.reply_message.match(/.(jpg|jpeg|png|gif)$/i) ?
                                                                                    // eslint-disable-next-line 
                                                                                    <a download={comments.reply_path} className='text-primary' target="_blank" href={comments.reply_path}>
                                                                                        <img alt={comments.reply_message} src={comments.reply_path} width="60" height="60" /></a> :
                                                                                    !comments.reply_path.match(/.(jpg|jpeg|png|gif)$/i) ?
                                                                                        //  eslint-disable-next-line  
                                                                                        <a download={comments.reply_message} className='text-primary' target="_blank" href={comments.reply_path}>
                                                                                            {comments.reply_message}</a> :
                                                                                        //  eslint-disable-next-line  
                                                                                        <a download={comments.reply_path} className='text-primary' target="_blank" href={comments.reply_path}>
                                                                                            <img alt={comments.reply_message} src={comments.reply_path} width="60" height="60" /></a>
                                                                                : comments.reply_message}
                                                                        </p>
                                                                    </div>
                                                                    <a href="/" style={{ borderRadius: '30px', color: "gray", padding: '10px', float: 'right', marginTop: '-8px' }} className="btn dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-left navbar-dropdown" style={{ borderRadius: "7px", minWidth: "fit-content" }} aria-labelledby="dropdownMenuLink">
                                                                        {/* eslint-disable-next-line   */}
                                                                        <a className="dropdown-item" onClick={() => handlecom(comments)}>Reply</a>
                                                                    </div>

                                                                    <p style={{ backgroundColor: "#f3f3f3", width: '100%', padding: "12px 10px 12px 14px", borderRadius: "7px", marginTop: '-8px', textAlign: 'left' }}>
                                                                        {comments.message}
                                                                        {/* eslint-disable-next-line  */}
                                                                    </p>
                                                                </li>
                                                                :
                                                                //for message display dropdown right side chat box messages
                                                                <li className="dropdown show" style={{ listStyle: "none", width: '100%' }}>
                                                                    <div className="row" style={{ margin: '0px' }}>
                                                                        <div className="col-md-11" style={{ padding: '0px' }}>
                                                                            <p style={{ backgroundColor: "#f3f3f3", padding: "12px 10px 12px 14px", textAlign: 'left', borderRadius: "7px 0px 0px 7px", float: 'right', wordBreak: 'break-all' }}>{comments.message} </p>
                                                                        </div>

                                                                        <div className="col-md-1" style={{ backgroundColor: "#f3f3f3", marginBottom: '4.5px', padding: '0px', textAlign: 'left', borderRadius: "0px 7px 7px 0px" }}>
                                                                            {/* eslint-disable-next-line  */}
                                                                            <a style={{ borderRadius: '30px', color: "gray", padding: '0px', marginTop: '12px' }} className="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
                                                                            <div className="dropdown-menu dropdown-menu-left navbar-dropdown" style={{ borderRadius: "7px", minWidth: "fit-content" }} aria-labelledby="dropdownMenuLink">
                                                                                {/* eslint-disable-next-line   */}
                                                                                <a className="dropdown-item" onClick={() => handlecom(comments)}>Reply</a>
                                                                            </div>
                                                                        </div>

                                                                    </div>


                                                                </li>}</p>
                                            )
                                        }) : null}
                                    </div>
                                </div>

                                <div class="modal-footer m-1 justify-content-center">
                                    <div className="form-sample col-12">
                                        <form encType="multipart/form-data" method="post" autoComplete="off">
                                            {/* <div className="form-group">
                                                            <label>Resume*</label> */}
                                            {chat === 1 ?
                                                <div>
                                                    <button style={{ backgroundColor: 'transparent', border: '0', float: "right" }} type="button" onClick={() => handleChatClose()} className="d-flex align-items-right" ><i class="mdi mdi-close text-black"></i></button>
                                                    <FilePond
                                                        allowFileTypeValidation={true}
                                                        fileValidateTypeLabelExpectedTypes={['allTypes']}
                                                        allowMultiple={true}
                                                        // maxFiles={3}
                                                        maxFiles={1}
                                                        instantUpload={false}
                                                        storeAsFile={true}
                                                        // eslint-disable-next-line
                                                        credits={"", ""}
                                                        onaddfilestart={(file) => handleDoc(file)}
                                                        // for show uplode icon
                                                        // allowProcess = {false}
                                                        // start for image editor
                                                        allowReorder={true}
                                                        // imageEditInstantEdit = {true}
                                                        onpreparefile={(file, output) => {
                                                            // console.log("prepare file", file.getMetadata());
                                                            // console.log("prepare", output);
                                                            const img = document.createElement("img");
                                                            img.src = URL.createObjectURL(output);
                                                            // document.body.appendChild(img);
                                                        }}
                                                        imageResizeUpscale={false}
                                                        imageResizeMode={"contain"}
                                                        imageEditIconEdit='<svg width="26" height="26" viewBox="0 0 26 26" 
                                                                  xmlns="http://www.w3.org/2000/svg">
                                                                  <path d="M8.5 17h1.586l7-7L15.5 8.414l-7 7V17zm-1.707-2.707l8-8a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-8 8A1 1 0 0 1 10.5 19h-3a1 1 0 0 1-1-1v-3a1 1 0 0 1 .293-.707z"
                                                                   fill="blue" fill-rule="nonzero" stroke="blue" stroke-width="2"></path></svg>'
                                                        imageEditEditor={create({
                                                            onconfirm: () => {
                                                                setTimeout(() => {
                                                                    Alert("warning", "Please click on upload icon (⬆️) for sending edited image.")
                                                                }, 1000);
                                                            },
                                                            cropMinImageWidth: 128,
                                                            cropMinImageHeight: 128
                                                        })}
                                                        // end for image editor
                                                        server={{
                                                            // fake server to simulate loading a 'local' server file and processing a file
                                                            process: (fieldName, file, metadata, load) => {
                                                                // simulates uploading a file
                                                                setTimeout(() => {
                                                                    load(Date.now())
                                                                    fileHandle(file)
                                                                    // handleImageChange(file)
                                                                }, 1000);
                                                            },
                                                            load: (source, load) => {
                                                                // simulates loading a file from the server
                                                                fetch(source).then(res => res.blob()).then(load);
                                                            }
                                                        }}
                                                    >
                                                    </FilePond>
                                                </div>
                                                : chat === 2 ?
                                                    <div>
                                                        <button style={{ backgroundColor: 'transparent', border: '0', float: "right" }} type="button" onClick={() => handleChatClose()} className="d-flex align-items-right" ><i class="mdi mdi-close text-black"></i></button>

                                                        <FilePond
                                                            allowFileTypeValidation={true}
                                                            fileValidateTypeLabelExpectedTypes={['allTypes']}
                                                            allowMultiple={true}
                                                            maxFiles={1}
                                                            instantUpload={false}
                                                            files={[copyfile]}
                                                            storeAsFile={true}
                                                            // eslint-disable-next-line
                                                            credits={"", ""}
                                                            // allowProcess = {false}
                                                            onaddfilestart={(file) => handleDoc(file)}
                                                            // start for image editor
                                                            allowReorder={true}
                                                            onpreparefile={(file, output) => {
                                                                // console.log("prepare file", file.getMetadata());
                                                                // console.log("prepare", output);
                                                                const img = document.createElement("img");
                                                                img.src = URL.createObjectURL(output);
                                                                // document.body.appendChild(img);
                                                            }}
                                                            imageResizeUpscale={false}
                                                            imageResizeMode={"contain"}
                                                            imageEditIconEdit='<svg width="26" height="26" viewBox="0 0 26 26" 
                                                                  xmlns="http://www.w3.org/2000/svg">
                                                                  <path d="M8.5 17h1.586l7-7L15.5 8.414l-7 7V17zm-1.707-2.707l8-8a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-8 8A1 1 0 0 1 10.5 19h-3a1 1 0 0 1-1-1v-3a1 1 0 0 1 .293-.707z"
                                                                   fill="blue" fill-rule="nonzero" stroke="blue" stroke-width="2"></path></svg>'
                                                            imageEditEditor={create({
                                                                onconfirm: () => {
                                                                    setTimeout(() => {
                                                                        Alert("warning", "Please click on upload icon (⬆️) for sending edited image.")
                                                                    }, 1000);
                                                                },
                                                                cropMinImageWidth: 128,
                                                                cropMinImageHeight: 128
                                                            })}
                                                            // end for image editor
                                                            server={{
                                                                // fake server to simulate loading a 'local' server file and processing a file
                                                                process: (fieldName, files, metadata, load) => {
                                                                    // simulates uploading a file
                                                                    setTimeout(() => {
                                                                        load(Date.now())
                                                                        fileHandle(files)
                                                                        // handleImageChange(file) 
                                                                    }, 1000);
                                                                },
                                                                load: (files, load) => {
                                                                    // simulates loading a file from the server
                                                                    fetch(files).then(res => res.blob()).then(load);
                                                                }
                                                            }}
                                                        >

                                                        </FilePond>
                                                    </div>
                                                    : ""}
                                        </form>
                                        {handleHover &&
                                            <div className=" col-md-9" style={{ backgroundColor: "#eee", borderRadius: '7px', marginBottom: "3px", paddingBottom: "2px" }}>
                                                <button style={{ backgroundColor: 'transparent', border: '0', marginLeft: "89%" }} type="button" onClick={handleMouseOut} className="d-flex align-items-right" data-dismiss="modal"><i className="mdi mdi-close text-black"></i></button>
                                                <p style={{ color: "green", marginLeft: "16px", marginTop: "-29px" }}>{commentDetails.username}</p>
                                                <p style={{ marginLeft: "16px" }}>
                                                    {commentDetails.path ?
                                                        commentDetails.path.substr(commentDetails.path.length - 4) === "blob" && commentDetails.message.match(/.(jpg|jpeg|png|gif)$/i) ?
                                                            // eslint-disable-next-line 
                                                            <a download={commentDetails.path} className='text-primary' target="_blank" href={commentDetails.path}>
                                                                <img alt={commentDetails.message} src={commentDetails.path} width="60" height="60" /></a> :
                                                            !commentDetails.path.match(/.(jpg|jpeg|png|gif)$/i) ?
                                                                //  eslint-disable-next-line  
                                                                <a download={commentDetails.message} className='text-primary' target="_blank" href={commentDetails.path}>
                                                                    {commentDetails.message}</a> :
                                                                //  eslint-disable-next-line  
                                                                <a download={commentDetails.path} className='text-primary' target="_blank" href={commentDetails.path}>
                                                                    <img alt={commentDetails.message} src={commentDetails.path} width="60" height="60" /></a>
                                                        : commentDetails.message}
                                                    {/* {commentDetails.message} */}
                                                </p>
                                            </div>
                                        }
                                        {/* </div> */}
                                        <div className="row">
                                            {/* <div className="col-md-9">
                                                                <input type="text" class="form-control" id="recipient-name" style={{ borderColor: 'grey', borderRadius: '20px',height:'2.2rem' }} 
                                                                value={state.comment} onChange={(event) => dispatch(actions.comment(event.target.value))} onKeyPress={handleKeypress}/> */}
                                            <div className="col-md-9">
                                                {disable ?
                                                    <textarea className="form-control copyable-text selectable-text " ref={ref => { textInput = ref }}
                                                        id="recipient-name document_attachment_doc " style={{ borderColor: 'grey', borderRadius: '20px', height: '2.2rem', padding: "7px" }}
                                                        contentEditable="true" suppressContentEditableWarning={true} placeholder="Type a message"
                                                        value={state.comment} onChange={(event) => dispatch(actions.comment(event.target.value))}
                                                        // onKeyPress={handleKeypress}
                                                        onPaste={(e) => myPaste(e)} /> :
                                                    <textarea className="form-control copyable-text selectable-text " ref={ref => { textInput = ref }}
                                                        id="recipient-name document_attachment_doc " style={{ borderColor: 'grey', borderRadius: '20px', height: '2.2rem', padding: "7px" }}
                                                        contentEditable="true" suppressContentEditableWarning={true} placeholder="Type a message"
                                                        value={state.comment} onChange={(event) => dispatch(actions.comment(event.target.value))}
                                                        onKeyPress={handleKeypress}
                                                        onPaste={(e) => myPaste(e)} />
                                                }
                                            </div>
                                            <div className="col-md-1" type="button" title={ATTACH_FILE} onClick={() => handleChat()}>
                                                <img src="images/common/paper-clip.png" alt="logo"
                                                    style={{ width: '32px', marginLeft: '-9px', marginTop: "-5px" }} />
                                            </div>
                                            {/* <div className="col-md-2">
                                                                {/* <button type="button" class="btn btn-outline-success w-100" style={{ borderRadius: '20px',height:'2.2rem', }} onClick={() => sendMessage()}>Send</button> */}
                                            {/* {state.isLoading ? <RootLoader/> :<button type="button" class="btn btn-outline-success w-100" style={{ borderRadius: '20px',height:'2.2rem', }} onClick={() => sendMessage()}>Send</button>}
                                                            </div> */}
                                            {chat === 1 || chat === 2 ?
                                                <div className="col-md-2">
                                                    {/* <button type="button" class="btn btn-outline-success w-100" style={{ borderRadius: '20px',height:'2.2rem', }} onClick={() => sendMessage()}>Send</button> */}
                                                    {/* {state.isLoading ? <RootLoader/> : */}
                                                    {disable ?
                                                        <button disabled={true} type="button" class="btn btn-outline-success w-100" style={{ borderRadius: '20px', height: '2.2rem', padding: "6px 20px" }} onClick={() => fileHandle(docFile)}>Send</button>
                                                        :
                                                        <button type="button" class="btn btn-outline-success w-100" style={{ borderRadius: '20px', height: '2.2rem', }} onClick={() => fileHandle(docFile)}>Send</button>
                                                    }
                                                    {/* <button type="button" class="btn btn-outline-success w-100" style={{ borderRadius: '20px',height:'2.2rem', }} onClick={() => fileHandle(docFile)}>Send</button> */}
                                                    {/* } */}
                                                </div> :
                                                <div className="col-md-2">
                                                    {/* <button type="button" class="btn btn-outline-success w-100" style={{ borderRadius: '20px',height:'2.2rem', }} onClick={() => sendMessage()}>Send</button> */}
                                                    {/* {state.isLoading ? <RootLoader/> : */}
                                                    {disable ?
                                                        <button disabled={true} type="button" class="btn btn-outline-success w-100" style={{ borderRadius: '20px', height: '2.2rem', padding: "6px 20px" }} onClick={() => sendMessage()}>Send</button>
                                                        :
                                                        <button type="button" class="btn btn-outline-success w-100" style={{ borderRadius: '20px', height: '2.2rem', }} onClick={() => sendMessage()}>Send</button>
                                                    }
                                                    {/* <button type="button" class="btn btn-outline-success w-100" style={{ borderRadius: '20px',height:'2.2rem', }} onClick={() => sendMessage()}>Send</button> */}
                                                    {/* } */}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}