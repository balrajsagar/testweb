import React, { useState } from 'react';
import '../../../Authentication/LandingPage/style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from '../../Alert';
import API from '../../Network/API';
import { isLoaded, isLoading } from '../../Actions/loading';
import RootLoader from '../../Loader/RootLoad'
import { Redirect } from 'react-router-dom';
import { APP_NAME, CHATAPI, IMG_SRC, SUPPORT_EMAIL } from '../../Headers';
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
import "../../vendor/doka.min.css";
// eslint-disable-next-line
import { create } from "../../vendor/doka.esm.min";
// Register the plugins
registerPlugin(FilePondPluginImageEdit, FilePondPluginImagePreview, FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateType, FilePondPluginImageResize, FilePondPluginImageTransform)

export default function ReleaseBug() {

  const dispatch = useDispatch();
  const loaderStatus = useSelector(state => state.loading.status)
  const webProperties = useSelector(state => state.landingReducer.webProperties)
  const properties = useSelector(state => state.landingReducer.properties)
  const [dataReport, setData] = useState({})
  const [redirect, setRedirect] = useState(false)

  const [docFile, setDocFile] = useState({});
  const getUser = useSelector(state => state.auth)

  console.log(getUser)

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
  // for sending bug report
  const fileHandle = async (e) => {
    e.preventDefault();
    if (dataReport.email_to_contact !== undefined && dataReport.bug_one_sen !== undefined && dataReport.steps_for_bug !== undefined) {
      dispatch(isLoading());
      const data = new FormData();
      data.append('file', docFile);
      data.append('action', 'releaseBug');
      data.append('api', CHATAPI);
      data.append('bug_one_sen', dataReport.bug_one_sen);
      data.append('email_to_contact', dataReport.email_to_contact);
      // data.append('useful_links', dataReport.useful_links);
      data.append('steps_for_bug', dataReport.steps_for_bug);
      data.append('appName', APP_NAME);
      data.append('supportMail', SUPPORT_EMAIL);
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
    } else {
      Alert("warning", "Please fill required fields! ");
    }
  }
  const addMainTaskFromSupportToKanban= async () =>{
    // console.log(getUser.corp)
    try {
        var response =await API.post("manage_userstories.php", {
            // crop: getUser.corp,
            action: "addMainTaskFromSupportToKanban",
            title: dataReport.bug_one_sen,
            description: dataReport.steps_for_bug,
            email: dataReport.email_to_contact,
            projectId:"b9594061fe6c271f0ce5cbcdc7ffb8e5",
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
    <div>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light" style={{ backgroundColor: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b' }}>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          {/* eslint-disable-next-line */}
          <a className="navbar-brand"><Link to={{ pathname: "/" }}>
            {/* <img src="images/common/agile2.png" width="170" alt="" /></Link> */}
            <img className="agile-supportlogo" src={properties?.IMG_SRC || IMG_SRC} width="170" alt="" /></Link>

          </a>
          <form className="form-inline my-2 my-lg-0 ml-auto" style={{ paddingTop: "16px" }}>
            {/* <!-- <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> --> */}
            {/* eslint-disable-next-line */}
            <a className="btn my-2 my-sm-0 ml-auto" id="loginbtn" type="submit"><Link style={{ color: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b' }} to={{ pathname: "/login" }}>Login</Link></a>
            {/* eslint-disable-next-line */}
            <a style={{backgroundColor: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b'}} className="btn my-2 my-sm-0" id="signupbtn-support" type="submit"><Link style={{ color: 'white' }} to={{ pathname: "/" }}>Home </Link></a>
            {/* support page button */}
          </form>
        </div>
      </nav>

      <section id="section1">
        <div className="container">
          <div className="release-note mt-5">
            <div className="d-flex bd-highlight"> <div className="p-2 flex-grow-1 bd-highlight"><h2>Report Bug</h2></div>  </div>
          </div>
          {/* <div className="card releasenote-card mt-5 p-3">
              <h3>Task 24X7 version 1 release notes</h3>
              {/* <div className="releasenotes-versions mt-3">
                <ul>
                    <li>Task 24X7 version 1.0 release notes</li>
                    <li>Task 24X7 version 1.0.1 release notes</li>
                    <li>Task 24X7 version 1.0.2 release notes</li>
                    <li>Task 24X7 version 1.0.3 release notes</li>
                    <li>Task 24X7 version 1.0.4 release notes</li>
                    <li>Task 24X7 version 1.0.5 release notes</li>
                    <li>Task 24X7 version 1.0.6 release notes</li>
                    <li>Task 24X7 version 1.0.7 release notes</li>
                    <li>Task 24X7 version 1.0.8 release notes</li>
                </ul> 
              </div> 
          </div> */}
        </div>
      </section>

      {/* collapse view */}
      <div className="container mt-5">
        <div className="accordion" id="accordionExample">

          <div className="card">
            <div className="card-header" id="headingZero">
              <h2 className="mb-0" style={{ paddingLeft: "20px" }}>
                {/* eslint-disable-next-line */}
                <h5>Tell us about the bug you found! </h5>
              </h2>
            </div>

            {/*  */}
            {/* If Answer is NO, . */}
            <div id="collapseZero" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
              <div className="card-body">
                <div className="releasenote-cardbody">
                  <div className="card-title text-capitalize mt-3 mb-3"><h6>When the bug is resolved, which email should we contact you at?<span style={{ color: "red" }} >*</span></h6></div>
                  <div class="form-group" style={{ height: 'auto' }}>
                    <input type="text" onChange={e => handleChange(e)} class="form-control" id="title" name="email_to_contact" placeholder="Enter email" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px', marginTop: '-2px' }} />
                  </div>
                </div>
              </div>
            </div>

            <div id="collapseZero" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
              <div className="card-body" style={{ paddingTop: "0px" }}>
                <div className="releasenote-cardbody">
                  <div className="card-title text-capitalize mt-3 mb-3"><h6> Could you please describe this bug in one sentence?<span style={{ color: "red" }} >*</span></h6></div>
                  <div class="form-group" style={{ height: 'auto' }}>
                    <input type="text" onChange={e => handleChange(e)} class="form-control" id="title" name="bug_one_sen"
                      placeholder="Scrum board or Active Sprint: Sprint Name not displaying " style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px', marginTop: '-2px' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* <div id="collapseZero" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div className="card-body" style={{paddingTop:"0px"}}>
          <div className="releasenote-cardbody">
            <div className="card-title text-capitalize mt-3 mb-3"><h6> Do you have any useful links you could provide us? ClickUp video Clips, Task URLs, etc.?</h6></div>
            <div class="form-group" style={{ height: 'auto' }}>
                <input type="text" onChange={e => handleChange(e)} class="form-control" id="title" name="useful_links"  placeholder="Copy and paste the link here" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px', marginTop: '-2px' }} />
            </div>
          </div>
      </div>
    </div> */}

            <div id="collapseZero" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
              <div className="card-body" style={{ paddingTop: "0px" }}>
                <div className="releasenote-cardbody">
                  <div className="card-title text-capitalize mt-3 mb-3"><h6>Let us know how to reproduce the bug for us to work on?<span style={{ color: "red" }} >*</span></h6></div>
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
                  <div className="card-title text-capitalize mt-3 mb-3"><h6>Do you have a documentation or record of the bug you found? If so please share that with us.(Video, Picture, Screen Shot etc.)</h6></div>
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
                      // start for image editor
                      //  allowReorder={true}
                      //  onpreparefile={(file, output) => {
                      //  // console.log("prepare file", file.getMetadata());
                      //  // console.log("prepare", output);
                      //  const img = document.createElement("img");
                      //  img.src = URL.createObjectURL(output);
                      //  // document.body.appendChild(img);
                      // }}
                      imageResizeUpscale={false}
                      imageResizeMode={"contain"}
                      //  imageEditIconEdit='<svg width="26" height="26" viewBox="0 0 26 26" 
                      //   xmlns="http://www.w3.org/2000/svg">
                      //   <path d="M8.5 17h1.586l7-7L15.5 8.414l-7 7V17zm-1.707-2.707l8-8a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-8 8A1 1 0 0 1 10.5 19h-3a1 1 0 0 1-1-1v-3a1 1 0 0 1 .293-.707z"
                      //  fill="blue" fill-rule="nonzero" stroke="blue" stroke-width="2"></path></svg>'
                      //  imageEditEditor={create({
                      //      onconfirm : () => {
                      //          setTimeout(() => {  
                      //              Alert("warning","Please click on upload icon (⬆️) for sending edited image.")
                      //             }, 1000);
                      //         },
                      //         cropMinImageWidth: 128,
                      //         cropMinImageHeight: 128
                      //     })}
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


      {/* End collapse view */}



      <footer id="footer-releasenote" style={{ backgroundColor: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b' }}>
        <div style={{color:'white'}}>
          {webProperties?.APP_NAME || APP_NAME} © Copyright {new Date().getFullYear()}. All Rights Reserved.
        </div>
      </footer>
    </div>
  )
}
