import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import Alert from '../../Common/Alert';
import API from '../../Common/Network/API';
import { isLoaded, isLoading } from '../../Common/Actions/loading';
import RootLoader from '../../Common/Loader/RootLoad'
import { Redirect } from 'react-router-dom';
import { APP_NAME, CHATAPI, SUPPORT_EMAIL } from '../../Common/Headers';
// filepond
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
// import RootLoader from '../Loader/RootLoad';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css";
import "../../Common/vendor/doka.min.css";
// eslint-disable-next-line
import { create } from "../../Common/vendor/doka.esm.min";
import SideBar from '../../UserModule/SquadChat/sideNav';
import Header from '../../UserModule/Utility/TopNav/topnav';
// Register the plugins
registerPlugin(FilePondPluginImageEdit, FilePondPluginImagePreview, FilePondPluginImageExifOrientation,
    FilePondPluginFileValidateType, FilePondPluginImageResize, FilePondPluginImageTransform)

export default function ReleaseBugUser() {

    const dispatch = useDispatch();
    const loaderStatus = useSelector(state => state.loading.status)
    const webProperties = useSelector(state => state.landingReducer.webProperties)
    const getUser = useSelector(state => state.auth)
    const [dataReport, setData] = useState({})
    const [redirect, setRedirect] = useState(false)

    const [docFile, setDocFile] = useState({});

    const handleDoc = (file) => {
        const fileData = file.file
        // console.log("file",fileData)
        setDocFile(fileData)
    }

    const handleChange = (e) => {
        setData({
            ...dataReport,
            [e.target.name]: e.target.value
        })
    }

    const fileHandle = async (e) => {
        
        e.preventDefault();
        // if (dataReport.email_to_contact !== undefined && dataReport.bug_one_sen !== undefined && dataReport.steps_for_bug !== undefined) {
        dispatch(isLoading());
        const data = new FormData();
        data.append('file', docFile);
        data.append('action', 'releaseBug');
        data.append('api', CHATAPI);
        data.append('bug_one_sen', dataReport.bug_one_sen);
        data.append('email_to_contact', getUser.user.userName);
        // data.append('useful_links', dataReport.useful_links);
        data.append('steps_for_bug', dataReport.steps_for_bug);
        data.append('appName', APP_NAME);
        data.append('supportMail', SUPPORT_EMAIL);
        console.log( dataReport.steps_for_bug)
        console.log( dataReport.bug_one_sen)
        try {
            var response = await API.post("report_bug.php", data
                , {}, false);
            // console.log(response)
            if (response.status === "True") {
                addMainTaskFromSupportToKanban()
                setRedirect(true)
                setDocFile({})
            } else {
                Alert('warning', response.message)
            }
        } catch (error) {
            console.log(error)
        }
        dispatch(isLoaded());
        // } else {
        //     Alert("warning", "Please fill required fields! ");
        // }
    }

    //For Add MainTask To Kanban

    const addMainTaskFromSupportToKanban= async () =>{
        try {
            var response =await API.post("manage_userstories.php", {
                // crop: getUser.corp,
                action: "addMainTaskFromSupportToKanban",
                title: dataReport.bug_one_sen,
                description: dataReport.steps_for_bug,
                projectId:'b9594061fe6c271f0ce5cbcdc7ffb8e5',
                assignBy: getUser.user.empId,
                email: getUser.user.userName,
                appName: APP_NAME,

            }, {}, false);
            if (response.status === 'True') {
                Alert("success", 'Thankyou for contacting us, we will reach out to you once the issue is fixed.');
            }
            else if(response.status === 'false') {
                alert(response.message)
            }
        } catch (error) {
            Alert('error', error.message);
        }

    }
    if (redirect) {
        return <Redirect to="/" />
    }

    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <SideBar />
                <div className="main-panel">
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card" >
                            <div className="card">
                                <div className="card-body">

                                    <div>
                                        <h2 className="card-title" style={{ overflowWrap: "break-word", backgroundColor: 'transparent' }}>How can we help you?</h2>
                                    </div>

                                    {/* collapse view */}
                                    <div className="container mt-5">
                                        <div className="accordion" id="accordionExample">

                                            <div className="card">
                                                <div className="card-header" id="headingZero">
                                                    <h2 className="mb-0" style={{ paddingLeft: "20px" }}>
                                                        {/* eslint-disable-next-line */}
                                                        <h5>Tell us about the issue you are facing! </h5>
                                                    </h2>
                                                </div>

                                                {/*  */}
                                                {/* If Answer is NO, . */}
                                                {/* <div id="collapseZero" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div className="card-body">
          <div className="releasenote-cardbody">
            <div className="card-title text-capitalize mt-3 mb-3"><h6>When the bug is resolved, which email should we contact you at?<span style={{ color: "red" }} >*</span></h6></div>
            <div class="form-group" style={{ height: 'auto' }}>
                <input type="text" onChange={e => handleChange(e)} class="form-control" id="title" name="email_to_contact" placeholder="Enter email" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px', marginTop: '-2px' }} />
            </div>
          </div>
      </div>
    </div> */}

                                                <div id="collapseZero" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                    <div className="card-body" style={{ paddingTop: "0px" }}>
                                                        <div className="releasenote-cardbody">
                                                            <div className="card-title text-capitalize mt-3 mb-3"><h6> Could you please describe this issue in one sentence?</h6></div>
                                                            <div class="form-group" style={{ height: 'auto' }}>
                                                                <input type="text" onChange={e => handleChange(e)} class="form-control" id="title" name="bug_one_sen"
                                                                    placeholder="Scrum board or Active Sprint: Sprint Name not displaying " style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px', marginTop: '-2px' }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div id="collapseZero" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                    <div className="card-body" style={{ paddingTop: "0px" }}>
                                                        <div className="releasenote-cardbody">
                                                            <div className="card-title text-capitalize mt-3 mb-3"><h6>Let us know how to reproduce the issue for us to work on?</h6></div>
                                                            <div class="form-group" style={{ height: 'auto' }}>
                                                                <textarea type="text" onChange={e => handleChange(e)} class="form-control" id="title" name="steps_for_bug"
                                                                    placeholder="1. Go to Dashboards | 2. Add a new Project "
                                                                    style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px', marginTop: '23px', minHeight: "66px", height: "66px" }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div id="collapseZero" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                    <div className="card-body" style={{ paddingTop: "0px" }}>
                                                        <div className="releasenote-cardbody">
                                                            <div className="card-title text-capitalize mt-3 mb-3"><h6>Do you have a documentation or record of the issue you found? If so please share that with us.(Video, Picture, Screen Shot etc.)</h6></div>
                                                            <div class="form-group" style={{ height: 'auto' }}>
                                                                <FilePond
                                                                    allowFileTypeValidation={true}
                                                                    fileValidateTypeLabelExpectedTypes={['allTypes']}
                                                                    allowMultiple={true}
                                                                    maxFiles={1}
                                                                    instantUpload={false}
                                                                    storeAsFile={true}
                                                                    // eslint-disable-next-line
                                                                    credits={"", ""}
                                                                    allowProcess={false}
                                                                    onaddfilestart={(file) => handleDoc(file)}
                                                                    imageResizeUpscale={false}
                                                                    imageResizeMode={"contain"}
                                                                    // end for image editor
                                                                    server={{
                                                                        // fake server to simulate loading a 'local' server file and processing a file
                                                                        process: (fieldName, files, metadata, load) => {
                                                                            // simulates uploading a file
                                                                            setTimeout(() => {
                                                                                load(Date.now())
                                                                                fileHandle(files)
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
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-2" style={{ marginLeft: "41%" }}>
                                                    {(loaderStatus) ? <RootLoader /> :
                                                        <button type="button" class="btn btn-success w-100" style={{ borderRadius: '20px', height: '2.2rem', fontSize: "19px", backgroundColor: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b', }}
                                                            onClick={(e) => fileHandle(e)}
                                                        >Submit</button>}
                                                </div>

                                            </div>
                                            <br />


                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}
