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
import {CHATAPI, ATTACH_FILE} from '../Headers';
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

// Admin squad chat
export default function UserChat(props) {
    const classNames = useStyles();
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(chatReducer, initialState)
    const [chat,setChat] = useState(0);
    const [copyfile, setCopyFile] = useState({});
    const [docFile, setDocFile] = useState({});
    console.log(props.data.sno)
    useEffect(() => {
        getMessages(dispatch, getUser.user, props.data);
        updateChat(props.data.sno,dispatch,getUser.user)
        // eslint-disable-next-line
    }, [])
const handleChat = () => {
    setChat(1)
}
const handleChatClose = () => {
    setChat(0)
}


// for sending message
    const sendMessage = async () => {
        if (state.comment !== "") {
            dispatch(isLoading());
            try {
                var response = await API.post("user_chat.php", {
                    action: "send",
                    corp_code: getUser.user.corp,
                    sendBy: getUser.user.empId,
                    receivedBy:props.data.id,
                    message: state.comment,
                    messagedBy: getUser.user.empId,
                    projectId:getUser.user.projectId,
                    device_id:props.data.device_id
                }, {}, false);
                console.warn(response)
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
// send message on click enter button
    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.which === 13) {
            if(state.comment !== ""){
              sendMessage();
            }else{
              fileHandle(docFile)
            }
          }
        };
// console.log(BaseUrl)
// for sending files as message
    const fileHandle = async (file) => {
        if (file !== "" && file.name !== undefined) {
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
            try {
                // eslint-disable-next-line
                var response = await API.post("userChat1.php", data
                , {}, false);
                // console.log(response)
                    getMessages(dispatch, getUser.user, props.data);
                    dispatch(actions.comment(""));
                    setChat(0)
                    setDocFile({})
            } catch (error) {
                console.log(error)
            }
            dispatch(isLoaded());
        } else {
            Alert("warning", "Please type the message");
        }
    }
    const myPaste = (e) =>{
        window.addEventListener('paste', e => {
            setCopyFile(e.clipboardData.files[0])
            if(e.clipboardData.files.length !== 0){
            setChat(2)
            }
          });
        
    }
    const handleDoc = (file) =>{
        const fileData = file.file
        // console.log("file",fileData)
        setDocFile(fileData)
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
                <Fade in={props.open}>
                    <div className={classNames.paper}>
                        <div className="user-modal-dialog d-flex justify-content-center">
                            <div className="modal-content col-6 p-2" style={{ borderRadius: '10px' }}>
                                <div class="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                    <div className="column">
                                        <h5 class="modal-title p-1">{props.data.name}</h5>
                                    </div>
                                    <button style={{backgroundColor:'transparent',border:'0'}} type="button" onClick={props.handleModalClose} className="d-flex align-items-right" data-dismiss="modal"><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body">
                                    <div className="overflow-auto" style={{ height: '250px',display:'flex',flexDirection:'column-reverse',overflow:'auto' }} >
                                        {state.taskComments !== '' ? state.taskComments.slice(0).reverse().map((comments) => {
                                            return (
                                                comments.messagedBy !== getUser.user.empId ?
                                                // <p className="text-left" ><p className="pt-2" style={{color:'blue'}}>{comments.username}&nbsp;<q style={{color:'grey',fontSize:"8px"}}>{moment(comments.messagedTime).format("MM-DD-YYYY hh:mm:ss")}</q></p>{comments.message}</p>:
                                                <p className="text-left pr-3" ><p className="pt-2" style={{color:'green'}}>{comments.username}&nbsp;<q style={{color:'grey',fontSize:"8px"}}>{convertPSTtoLocalTime(comments.messagedTime)}</q></p>
                                                {comments.path ?
                                                <div style={{height: "67%", backgroundColor: "#f3f3f3", paddingTop: "10px", width: "max-content", float: "left"}}>
                                                {/* <a href={comments.path} style={{color: 'black'}} download>{comments.message}</a> */}
                                                {comments.path.substr(comments.path.length - 4) === "blob" && comments.message.match(/.(jpg|jpeg|png|gif)$/i) ? 
                                              //  eslint-disable-next-line
                                              <a download={comments.path} className='text-primary' target="_blank" href={comments.path}>
                                              <img alt={comments.message}  src={comments.path} width="400" /></a>
                                              :
                                                !comments.path.match(/.(jpg|jpeg|png|gif)$/i) ? 
                                                 //  eslint-disable-next-line
                                              <a download={comments.message} target="_blank" className='text-primary' href={comments.path}>{comments.message}</a>
                                              : 
                                              //  eslint-disable-next-line
                                              <a download={comments.path} className='text-primary' target="_blank" href={comments.path}>
                                                  <img alt={comments.message}  src={comments.path} width="400" /></a>
                                                  } </div>
                                                : comments.message}</p>:
                                               
                                               <p className="text-right pr-3" ><p className="pt-2" style={{color:'green'}}>{comments.username}&nbsp;<q style={{color:'grey',fontSize:"8px"}}>{convertPSTtoLocalTime(comments.messagedTime)}</q></p>
                                                {comments.path ?
                                                <div style={{height: "67%", backgroundColor: "#f3f3f3", paddingTop: "10px", width: "max-content", float: "right" }}>
                                                 {/* <a href={comments.path} style={{color: 'black'}} download>{comments.message}</a> */}
                                                 {comments.path.substr(comments.path.length - 4) === "blob" && comments.message.match(/.(jpg|jpeg|png|gif)$/i) ? 
                                              //  eslint-disable-next-line
                                              <a download={comments.path} className='text-primary' target="_blank" href={comments.path}>
                                              <img alt={comments.message}  src={comments.path} width="400" /></a>
                                              :
                                                 !comments.path.match(/.(jpg|jpeg|png|gif)$/i) ? 
                                                 //  eslint-disable-next-line
                                              <a download={comments.message} className='text-primary' target="_blank" href={comments.path}>{comments.message}</a>
                                              : 
                                              //  eslint-disable-next-line
                                              <a download={comments.path} className='text-primary' target="_blank" href={comments.path}>
                                                  <img alt={comments.message}  src={comments.path} width="400" /></a>
                                              }</div>
                                                  : comments.message}</p>
                                            )
                                        }) : null}
                                    </div>
                                </div>  
                                
                                <div class="modal-footer m-1 justify-content-center">
                                <div className="form-sample col-12">
                                <form  encType="multipart/form-data" method="post" autoComplete="off">
                                                        {/* <div className="form-group">
                                                            <label>Resume*</label> */}
                                                            {chat === 1 ? 
                                                            <div>
                                                            <button style={{backgroundColor:'transparent',border:'0', float: "right"}} type="button" onClick={() => handleChatClose()} className="d-flex align-items-right" ><i class="mdi mdi-close text-black"></i></button>
                                                            <FilePond
                                                                allowFileTypeValidation={true}
                                                                fileValidateTypeLabelExpectedTypes={['allTypes']}
                                                                allowMultiple={true}
                                                                // maxFiles={3}
                                                                maxFiles={1}
                                                                instantUpload={false}
                                                                storeAsFile = {true}
                                                                // eslint-disable-next-line
                                                                credits = {"",""}
                                                                onaddfilestart = {(file) => handleDoc(file)}
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
                                                                    onconfirm : () => {
                                                                        setTimeout(() => {
                                                                            Alert("warning","Please click on upload icon (⬆️) for sending edited image.")
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
                                                                <button style={{backgroundColor:'transparent',border:'0', float: "right"}} type="button" onClick={() => handleChatClose()} className="d-flex align-items-right" ><i class="mdi mdi-close text-black"></i></button>
                                                            
                                                            <FilePond
                                                                allowFileTypeValidation={true}
                                                                fileValidateTypeLabelExpectedTypes={['allTypes']}
                                                                allowMultiple={true}
                                                                maxFiles={1}
                                                                instantUpload={false}
                                                                files={[copyfile]}
                                                                storeAsFile = {true}
                                                                // eslint-disable-next-line
                                                                credits = {"",""}
                                                                // allowProcess = {false}
                                                                onaddfilestart = {(file) => handleDoc(file)}
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
                                                                    onconfirm : () => {
                                                                        setTimeout(() => {  
                                                                            Alert("warning","Please click on upload icon (⬆️) for sending edited image.")
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
                                                        {/* </div> */}
                                                        <div className="row">
                                                            {/* <div className="col-md-9">
                                                                <input type="text" class="form-control" id="recipient-name" style={{ borderColor: 'grey', borderRadius: '20px',height:'2.2rem' }} 
                                                                value={state.comment} onChange={(event) => dispatch(actions.comment(event.target.value))} onKeyPress={handleKeypress}/> */}
                                                                <div className="col-md-9">
                                                                {disable ?
                                                                <textarea  className="form-control copyable-text selectable-text " 
                                                                id="recipient-name document_attachment_doc " style={{ borderColor: 'grey', borderRadius: '20px',height:'2.2rem', padding: "7px" }} 
                                                                contentEditable="true" suppressContentEditableWarning={true} placeholder="Type a message"
                                                                value={state.comment} onChange={(event) => dispatch(actions.comment(event.target.value))} 
                                                                // onKeyPress={handleKeypress}
                                                                onPaste={(e) => myPaste(e)}/> :
                                                                <textarea  className="form-control copyable-text selectable-text " 
                                                                id="recipient-name document_attachment_doc " style={{ borderColor: 'grey', borderRadius: '20px',height:'2.2rem', padding: "7px" }} 
                                                                contentEditable="true" suppressContentEditableWarning={true} placeholder="Type a message"
                                                                value={state.comment} onChange={(event) => dispatch(actions.comment(event.target.value))} 
                                                                onKeyPress={handleKeypress}
                                                                onPaste={(e) => myPaste(e)}/>
                                                                 }
                                                            </div>
                                                            <div className="col-md-1" type="button" title={ATTACH_FILE}  onClick={() => handleChat()}>
                                                                <img src="images/common/paper-clip.png" alt="logo" 
                                                                style={{ width: '32px', marginLeft:'-9px', marginTop: "-5px" }} />
                                                            </div>
                                                            {/* <div className="col-md-2">
                                                                {/* <button type="button" class="btn btn-outline-success w-100" style={{ borderRadius: '20px',height:'2.2rem', }} onClick={() => sendMessage()}>Send</button> */}
                                                                {/* {state.isLoading ? <RootLoader/> :<button type="button" class="btn btn-outline-success w-100" style={{ borderRadius: '20px',height:'2.2rem', }} onClick={() => sendMessage()}>Send</button>}
                                                            </div> */} 
                                                            {chat === 1 || chat === 2 ?
                                                            <div className="col-md-2">
                                                            {/* <button type="button" class="btn btn-outline-success w-100" style={{ borderRadius: '20px',height:'2.2rem', }} onClick={() => sendMessage()}>Send</button> */}
                                                            {/* {state.isLoading ? <RootLoader/> : */}
                                                            <button type="button" class="btn btn-outline-success w-100" style={{ borderRadius: '20px',height:'2.2rem', }} onClick={() => fileHandle(docFile)}>Send</button>
                                                            {/* } */}
                                                        </div>:
                                                        <div className="col-md-2">
                                                        {/* <button type="button" class="btn btn-outline-success w-100" style={{ borderRadius: '20px',height:'2.2rem', }} onClick={() => sendMessage()}>Send</button> */}
                                                        {/* {state.isLoading ? <RootLoader/> : */}
                                                        <button type="button" class="btn btn-outline-success w-100" style={{ borderRadius: '20px',height:'2.2rem', }} onClick={() => sendMessage()}>Send</button>
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