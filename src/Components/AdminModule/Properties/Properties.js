import React, { useState, useReducer, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { updateProps, updateStandardProps, updateWebProps, updateStandardWebProps } from './network';
import Header from '../../Common/TopNav';
import FileBase64 from 'react-file-base64';
import { landingReducer, initialState } from '../../Authentication/LandingPage/landingReducer';
import { ChromePicker } from 'react-color';

export default function Properties() {

    const getUser = useSelector(state => state.auth)
    const getProperties = useSelector(state => state.landingReducer)
    const [state, dispatch] = useReducer(landingReducer, initialState)
    const [properties, setProperties] = useState(getProperties?.properties)
    const [webProperties, setWebProperties] = useState(getProperties?.webProperties)
    const [image, setImage] = useState('')
    // eslint-disable-next-line 
    const [webImages, setWebImages] = useState()
    const [stn_prop, setStnProp] = useState(false)
    const appName = window.location.origin
    const [propView, setPropView] = useState('application')
    // const [sliderFiles, setSliderFiles] = useState()

    // useEffect(() => {

    //     console.log(window.location.href)

    //     fetch('http://71.40.116.146:3232/createFile')
    //         .then(res => {
    //             console.log(res)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }, [])


    var standard_properties = {
        "MODULES": "Sprint",
        "MAINTASKS": "User Story",
        "KANBAN": "Kanban board",
        "KANBAN_NAME": "Kanban Name",
        "SUBTASKS": "Task",
        "PROJECT": "Epic",
        "BACKLOG": "Backlog",
        "WHITEBOARD": "WhiteBoard",
        "AGILE": "Agile",
        "USER_STORIES": "User Stories",
        "ROADBLOCKS": "Roadblock",
        "ARCHIVE": "Archive",
        "STORY_POINTS": "Story Points",
        "SPRINT_CYCLE": "Sprint Cycle",
        "ACCEPTANCE_CRITERIA": "Acceptance Criteria",
        "SQUAD": "Squad",
        "PRIORITY_LEVEL": "Priority Level",
        "SPRINT_VELOCITY": "Sprint Velocity",
        "BURN_UP_REPORT": "Burn Up Report",
        "BURN_DOWN_REPORT": "Burn Down Report",
        "INDIVIDUAL_VELOCITY": "Individual Velocity",
        "EPIC_VELOCITY": "Epic Velocity",
        "INDIVIDUAL_WORKLOAD": "Individual Workload",
        "AGILE_PROJECT_NAME": "Agile Project Name",
        "IMG_SRC": "images/common/agile.png",
        "SCRUM_BOARD": "Scrum-Board",
        "ACTIVE_SPRINT": "Active Sprint",
        "COMPLETED_EPICS": "Completed Epics",
        "CONTRIBUTOR": "Contributor",
        "PRODUCT_OWNER": "Product Owner",
        "SCRUM_MASTER": "Scrum Master",
        "USERS_ROADBLOCKS": "Users Road Blocks",
        "ROADBLOCK_PERCENTAGE": "Roadblock Percentage",
        "AGILE_SQUAD": "Agile Squad",
        "USAGE_REPORTS": "Agile Usage Reports",
        "USER_EFFICIENCY": "Employee Efficiency"
    }

    var website_properties = {
        "APP_NAME": "TASK24x7",
        "SUPPORT_EMAIL": "support@task24X7.com",
        "CONTENT1": "Software teams that embrace task project management methodologies increase their development speed, expand collaboration, and foster the ability to better respond to market trends.",
        "SUB_CONTENT1": "We help organize your work, so your team can strike a healthy balance between structure, flexibility, and launching Products according to the client need on time.",
        "CONTENT1_IMAGE": 'CONTENT1_IMAGE',
        "PRIMARY_COLOR": "#47974B",
        "IMAGE1": "IMAGE1",
        "IMAGE_CONTENT1": "Task 24X7 is the software that handles any Sprint, User Story without any confusion.",
        "IMAGE_SUB_CONTENT1": "Manage your sprint planning, User Stories, and tasks with Task 24X7 and keep everyone in-the-loop.",
        "IMAGE2": "IMAGE2",
        "IMAGE_CONTENT2": "Manage iterations and task workflows all in one place Release quality products faster, together",
        "IMAGE_SUB_CONTENT2": "With all communication and updates in one place, work better together to push the product forward.",
        "IMAGE3": "IMAGE3",
        "IMAGE_CONTENT3": "Epics, Sprint, User Stories, Backlogs",
        "IMAGE_SUB_CONTENT3": "These simple structures help task teams gracefully manage scope and structure work. With all communication and updates in one place, your team work better together to push the product forward.",
        "IMAGE4": "IMAGE4",
        "IMAGE_CONTENT4": "Better User experience with Easy To Use Dashboard Stay on top of your sprints",
        "IMAGE_SUB_CONTENT4": "Use dashboards to easily track User stories and backlogs to see where your team stands against each EPIC.",
        "IMAGE_SLIDER": "IMAGE_SLIDER",
        "FOOTER_CONTENT1": "Try Task 24x7 for your team",
        "FOOTER_SUB_CONTENT1": "Sign up and look who is using Task 24x7 to get their work done.",
        "CONTENT1_COLOR": "#FFFFFF",
        "SUB_CONTENT1_COLOR": "#FFFFFF",
        "IMAGE_CONTENT1_COLOR": "#000000",
        "IMAGE_SUB_CONTENT1_COLOR": "#233656",
        "IMAGE_CONTENT2_COLOR": "#000000",
        "IMAGE_SUB_CONTENT2_COLOR": "#233656",
        "IMAGE_CONTENT3_COLOR": "#000000",
        "IMAGE_SUB_CONTENT3_COLOR": "#233656",
        "IMAGE_CONTENT4_COLOR": "#000000",
        "IMAGE_SUB_CONTENT4_COLOR": "#233656",
        "FOOTER_CONTENT1_COLOR": "#FFFFFF",
        "FOOTER_SUB_CONTENT1_COLOR": "#FFFFFF",
        "APP_FAVICON": "APP_FAVICON"
    }



    function standardProps() {
        setProperties(standard_properties)
        setStnProp(true)
    }

    function standardWebProps() {
        setWebProperties(website_properties)
        setStnProp(true)
    }

    const onFileChange = (e) => {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);
        fileReader.onload = (event) => {
            setImage(event.target.result)

        }
    }

    const onWebFileChange = (e, name) => {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);
        fileReader.onload = (event) => {
            setWebProperties({ ...webProperties, [name]: event.target.result })
        }
    }

    function onImportJson(event) {
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(event.target.files[0]);
    }

    function onReaderLoad(event) {
        var obj = JSON.parse(event.target.result);
        if (propView === 'website') {
            setWebProperties(obj)
        } else {
            setProperties(obj)
        }
        setStnProp(true)
    }


    const exportFile = async () => {
        const myData = propView === 'website' ? webProperties : properties; // I am assuming that "this.state.myData"
        // is an object and I wrote it to file as
        // json
        const fileName = propView === 'website' ? "web_props" : "props";
        const json = JSON.stringify(myData);
        const blob = new Blob([json], { type: 'application/json' });
        const href = await URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }



    useEffect(() => {
        if (stn_prop === true) {
            if (propView === 'application') {
                updateStandardProps(state, dispatch, getUser.user, properties, appName)
            } else {
                updateStandardWebProps(state, dispatch, getUser.user, webProperties, appName, webImages)

            }
            setStnProp(false)
        }
        // eslint-disable-next-line
    }, [stn_prop]);

    const handleProps = (type) => {
        setPropView(type)
    }

    const getFiles = (files) => {
        setWebProperties({
            ...webProperties, IMAGE_SLIDER: files
        })
    }

    return (
        <div>
            {/* {view === false ?  */}
            <Header />
            <div style={{ marginTop: '100px', marginLeft: '100px' }}>
                <div className="row mt-5">
                    <button type="button" className="btn btn-primary mr-2" onClick={() => handleProps('application')}>Application Props</button>
                    <button type="button" className="btn btn-primary mr-2" onClick={() => handleProps('website')}>Website Props</button>
                </div>
                <div className='mt-4'>
                    {
                        propView === 'application' &&
                        <h5>Application Properties</h5>
                    }
                    {
                        propView === 'website' &&
                        <h5>Website Properties</h5>
                    }
                    <button className='btn btn-info' type="button" onClick={() => exportFile()}  >Export</button>
                </div>
                {
                    propView === 'application' &&
                    <div className="row" >
                        <div className="col-md-6 mt-1">
                            <div className='flex-container' style={{ display: 'flex' }} >
                                <div className='text-left w-100 m-5'>
                                    <div>
                                        <label style={{ color: 'blue' }}>Upload App Logo (170 X 64 Pixels)</label>
                                        <input className='form-control' type='file' onChange={(e) => onFileChange(e)} />
                                        <div>
                                            {
                                                properties.IMG_SRC !== "images/common/agile.png" &&
                                                < img src={properties.IMG_SRC} style={{ width: 200, height: 200 }} title={'APP ICON'} />
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Agile</label>
                                        <input type='text' className='form-control' value={properties.AGILE} onChange={e => setProperties({ ...properties, 'AGILE': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Agile Project Name</label>
                                        <input type='text' className='form-control' value={properties.AGILE_PROJECT_NAME} onChange={e => setProperties({ ...properties, 'AGILE_PROJECT_NAME': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Agile Squad</label>
                                        <input type='text' className='form-control' value={properties.AGILE_SQUAD} onChange={e => setProperties({ ...properties, 'AGILE_SQUAD': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Scrum-Board</label>
                                        <input type='text' className='form-control' value={properties.SCRUM_BOARD} onChange={e => setProperties({ ...properties, 'SCRUM_BOARD': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Kanban board</label>
                                        <input type='text' className='form-control' value={properties.KANBAN} onChange={e => setProperties({ ...properties, 'KANBAN': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Kanban NAME</label>
                                        <input type='text' className='form-control' value={properties.KANBAN_NAME} onChange={e => setProperties({ ...properties, 'KANBAN_NAME': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Epic</label>
                                        <input type='text' className='form-control' value={properties.PROJECT} onChange={e => setProperties({ ...properties, 'PROJECT': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Sprint</label>
                                        <input type='text' className='form-control' value={properties.MODULES} onChange={e => setProperties({ ...properties, 'MODULES': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Active Sprints</label>
                                        <input type='text' className='form-control' value={properties.ACTIVE_SPRINT} onChange={e => setProperties({ ...properties, 'ACTIVE_SPRINT': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Completed Epics</label>
                                        <input type='text' className='form-control' value={properties.COMPLETED_EPICS} onChange={e => setProperties({ ...properties, 'COMPLETED_EPICS': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>User Story</label>
                                        <input type='text' className='form-control' value={properties.MAINTASKS} onChange={e => setProperties({ ...properties, 'MAINTASKS': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Task</label>
                                        <input type='text' className='form-control' value={properties.SUBTASKS} onChange={e => setProperties({ ...properties, 'SUBTASKS': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>User Stories</label>
                                        <input type='text' className='form-control' value={properties.USER_STORIES} onChange={e => setProperties({ ...properties, 'USER_STORIES': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Backlog</label>
                                        <input type='text' className='form-control' value={properties.BACKLOG} onChange={e => setProperties({ ...properties, 'BACKLOG': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Roadblock</label>
                                        <input type='text' className='form-control' value={properties.ROADBLOCKS} onChange={e => setProperties({ ...properties, 'ROADBLOCKS': e.target.value })} />
                                    </div>

                                    <div>
                                        <label style={{ color: 'blue' }}>Users Road Blocks</label>
                                        <input type='text' className='form-control' value={properties.USERS_ROADBLOCKS} onChange={e => setProperties({ ...properties, 'USERS_ROADBLOCKS': e.target.value })} />
                                    </div>

                                    <div>
                                        <label style={{ color: 'blue' }}>Road Block Percentage</label>
                                        <input type='text' className='form-control' value={properties.ROADBLOCK_PERCENTAGE} onChange={e => setProperties({ ...properties, 'ROADBLOCK_PERCENTAGE': e.target.value })} />
                                    </div>

                                    <div>
                                        <label style={{ color: 'blue' }}>Burn Down Report</label>
                                        <input type='text' className='form-control' value={properties.BURN_DOWN_REPORT} onChange={e => setProperties({ ...properties, 'BURN_DOWN_REPORT': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Burn Up Report</label>
                                        <input type='text' className='form-control' value={properties.BURN_UP_REPORT} onChange={e => setProperties({ ...properties, 'BURN_UP_REPORT': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Individual Velocity</label>
                                        <input type='text' className='form-control' value={properties.INDIVIDUAL_VELOCITY} onChange={e => setProperties({ ...properties, 'INDIVIDUAL_VELOCITY': e.target.value })} />
                                    </div>
                                </div>
                                <div className='text-left w-100 m-5'>
                                    <div>
                                        <label style={{ color: 'blue' }}>Whiteboard</label>
                                        <input type='text' className='form-control' value={properties.WHITEBOARD} onChange={e => setProperties({ ...properties, 'WHITEBOARD': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Archive</label>
                                        <input type='text' className='form-control' value={properties.ARCHIVE} onChange={e => setProperties({ ...properties, 'ARCHIVE': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Story Points</label>
                                        <input type='text' className='form-control' value={properties.STORY_POINTS} onChange={e => setProperties({ ...properties, 'STORY_POINTS': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Acceptance Criteria</label>
                                        <input type='text' className='form-control' value={properties.ACCEPTANCE_CRITERIA} onChange={e => setProperties({ ...properties, 'ACCEPTANCE_CRITERIA': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Priority Level</label>
                                        <input type='text' className='form-control' value={properties.PRIORITY_LEVEL} onChange={e => setProperties({ ...properties, 'PRIORITY_LEVEL': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Squad</label>
                                        <input type='text' className='form-control' value={properties.SQUAD} onChange={e => setProperties({ ...properties, 'SQUAD': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Sprint Cycle</label>
                                        <input type='text' className='form-control' value={properties.SPRINT_CYCLE} onChange={e => setProperties({ ...properties, 'SPRINT_CYCLE': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Sprint Velocity</label>
                                        <input type='text' className='form-control' value={properties.SPRINT_VELOCITY} onChange={e => setProperties({ ...properties, 'SPRINT_VELOCITY': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Epic Velocity</label>
                                        <input type='text' className='form-control' value={properties.EPIC_VELOCITY} onChange={e => setProperties({ ...properties, 'EPIC_VELOCITY': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Agile Usage Reports</label>
                                        <input type='text' className='form-control' value={properties.USAGE_REPORTS} onChange={e => setProperties({ ...properties, 'USAGE_REPORTS': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Employee Efficiency</label>
                                        <input type='text' className='form-control' value={properties.USER_EFFICIENCY} onChange={e => setProperties({ ...properties, 'USER_EFFICIENCY': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Individual Workload</label>
                                        <input type='text' className='form-control' value={properties.INDIVIDUAL_WORKLOAD} onChange={e => setProperties({ ...properties, 'INDIVIDUAL_WORKLOAD': e.target.value })} />
                                    </div>

                                    <div>
                                        <label style={{ color: 'blue' }}>Contributor</label>
                                        <input type='text' className='form-control' value={properties.CONTRIBUTOR} onChange={e => setProperties({ ...properties, 'CONTRIBUTOR': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Product Owner</label>
                                        <input type='text' className='form-control' value={properties.PRODUCT_OWNER} onChange={e => setProperties({ ...properties, 'PRODUCT_OWNER': e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ color: 'blue' }}>Scrum Master</label>
                                        <input type='text' className='form-control' value={properties.SCRUM_MASTER} onChange={e => setProperties({ ...properties, 'SCRUM_MASTER': e.target.value })} />
                                    </div>
                                    OR
                                    <div className='mt-2' >
                                        <div >
                                            <label style={{ color: 'blue' }}>Import File</label>
                                            <input className="form-control" type='file' onChange={(e) => onImportJson(e)} />
                                        </div>
                                    </div>
                                    <div className='mt-2'>
                                        <button type="button" className='btn btn-success' onClick={() => updateProps(state, dispatch, getUser.user, properties, image, appName)}>Save</button>
                                        <button type="button" className='ml-2 btn btn-info' onClick={() => standardProps()} >Set to Default</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    propView === 'website' &&
                    <div className="row" >
                        <div className="col-md-6 mt-1">
                            <div className='flex-container' style={{ display: 'flex' }} >
                                <div className='text-left w-100 m-5'>
                                    <div className='mb-2'>
                                        <label style={{ color: 'blue' }}>Application Name</label>
                                        <input type='text' className='form-control' value={webProperties.APP_NAME} onChange={e => setWebProperties({ ...webProperties, 'APP_NAME': e.target.value })} />
                                    </div>
                                    <div className='mb-2'>
                                        <label style={{ color: 'blue' }}>APP FAVICON (32 X 32 Pixels)</label>
                                        <input className='form-control' name="APP_FAVICON" type='file' onChange={(e) => onWebFileChange(e, 'APP_FAVICON')} />
                                        <div>
                                            {
                                                webProperties.APP_FAVICON !== 'APP_FAVICON' &&
                                                <img src={webProperties.APP_FAVICON} title='APP_FAVICON' />
                                            }
                                        </div>
                                    </div>
                                    <div className='mb-2'>
                                        <label style={{ color: 'blue' }}>Primary Color</label>
                                        <br />
                                        <ChromePicker
                                            color={webProperties.PRIMARY_COLOR}
                                            onChange={(color) => {
                                                setWebProperties({ ...webProperties, 'PRIMARY_COLOR': color.hex })
                                            }} />
                                    </div>
                                    <div className='mb-2'>
                                        <label style={{ color: 'blue' }}>Support Email</label>
                                        <input type='text' className='form-control' value={webProperties.SUPPORT_EMAIL} onChange={e => setWebProperties({ ...webProperties, 'SUPPORT_EMAIL': e.target.value })} />
                                    </div>
                                    <div className='mb-2' style={{ border: '1px solid grey', padding: '5px' }}>
                                        <div className='mb-2'>
                                            <div className='col-12 row'>
                                                <div className='col-8'>
                                                    <label style={{ color: 'blue' }}>Content 1</label>
                                                    <textarea type='text' style={{ color: webProperties.CONTENT1_COLOR === "#FFFFFF" ? 'black' : webProperties.CONTENT1_COLOR }} className='form-control' value={webProperties.CONTENT1} onChange={e => setWebProperties({ ...webProperties, 'CONTENT1': e.target.value })} />
                                                </div>
                                                <div className='col-2'>
                                                    <label style={{ color: 'blue' }}>Default</label>
                                                    <br />
                                                    <input style={{ width: '40px', height: '40px' }} type="color" value="#FFFFFF" disabled />
                                                </div>
                                                <div className='col-2'>
                                                    <label style={{ color: 'blue' }}>New Color</label>
                                                    <br />
                                                    <input style={{ width: '40px', height: '40px' }} type="color" value={webProperties.CONTENT1_COLOR} onChange={(e) => {
                                                        setWebProperties({ ...webProperties, 'CONTENT1_COLOR': e.target.value })
                                                    }} />
                                                </div>

                                            </div>
                                        </div>
                                        <div className='mb-2'>
                                            <div className='col-12 row'>
                                                <div className='col-8'>
                                                    <label style={{ color: 'blue' }}>Sub Content 1</label>
                                                    <textarea style={{ color: webProperties.SUB_CONTENT1_COLOR === "#FFFFFF" ? 'black' : webProperties.SUB_CONTENT1_COLOR }} type='text' className='form-control' value={webProperties.SUB_CONTENT1} onChange={e => setWebProperties({ ...webProperties, 'SUB_CONTENT1': e.target.value })} />
                                                </div>
                                                <div className='col-2'>
                                                    <label style={{ color: 'blue' }}>Default</label>
                                                    <br />
                                                    <input style={{ width: '40px', height: '40px' }} type="color" value="#FFFFFF" disabled />
                                                </div>
                                                <div className='col-2'>
                                                    <label style={{ color: 'blue' }}>New Color</label>
                                                    <br />
                                                    <input style={{ width: '40px', height: '40px' }} type="color" value={webProperties.SUB_CONTENT1_COLOR} onChange={(e) => {
                                                        setWebProperties({ ...webProperties, 'SUB_CONTENT1_COLOR': e.target.value })
                                                    }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <label style={{ color: 'blue' }}>Content 1 Image (500 X 333 Pixels)</label>
                                            <input className='form-control' name="CONTENT1_IMAGE" type='file' onChange={(e) => onWebFileChange(e, 'CONTENT1_IMAGE')} />
                                            <div>
                                                {
                                                    webProperties.CONTENT1_IMAGE !== 'CONTENT1_IMAGE' &&
                                                    <img src={webProperties.CONTENT1_IMAGE} style={{ width: 200, height: 200 }} title='CONTENT1_IMAGE' />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mb-2' style={{ border: '1px solid grey', padding: '5px' }}>
                                        <div className='col-12 mb-2'>
                                            <div>
                                                <label style={{ color: 'blue' }}>Image 1 (540 X 260 Pixels)</label>
                                                <input className='form-control' name="IMAGE1" type='file' onChange={(e) => onWebFileChange(e, 'IMAGE1')} />
                                            </div>
                                            <div>
                                                {
                                                    webProperties.IMAGE1 !== "IMAGE1" &&
                                                    < img src={webProperties.IMAGE1} style={{ width: 200, height: 200 }} title='IMAGE1' />
                                                }
                                            </div>
                                        </div>
                                        <div className='col-12 row mb-2'>
                                            <div className='col-8'>
                                                <label style={{ color: 'blue' }}>Image Content 1</label>
                                                <textarea type='text' style={{ color: webProperties.IMAGE_CONTENT1_COLOR === "#FFFFFF" ? 'black' : webProperties.IMAGE_CONTENT1_COLOR }} className='form-control' value={webProperties.IMAGE_CONTENT1} onChange={e => setWebProperties({ ...webProperties, 'IMAGE_CONTENT1': e.target.value })} />
                                            </div>
                                            <div className='col-2'>
                                                <label style={{ color: 'blue' }}>Default</label>
                                                <br />
                                                <input style={{ width: '40px', height: '40px' }} type="color" value="#000000" disabled />
                                            </div>
                                            <div className='col-2'>
                                                <label style={{ color: 'blue' }}>New Color</label>
                                                <br />
                                                <input style={{ width: '40px', height: '40px' }} type="color" value={webProperties.IMAGE_CONTENT1_COLOR} onChange={(e) => {
                                                    setWebProperties({ ...webProperties, 'IMAGE_CONTENT1_COLOR': e.target.value })
                                                }} />
                                            </div>
                                        </div>
                                        <div className='col-12 row'>
                                            <div className='col-8'>
                                                <label style={{ color: 'blue' }}>Image SubContent 1</label>
                                                <textarea type='text' style={{ color: webProperties.IMAGE_SUB_CONTENT1_COLOR === "#FFFFFF" ? 'black' : webProperties.IMAGE_SUB_CONTENT1_COLOR }} className='form-control' value={webProperties.IMAGE_SUB_CONTENT1} onChange={e => setWebProperties({ ...webProperties, 'IMAGE_SUB_CONTENT1': e.target.value })} />
                                            </div>
                                            <div className='col-2'>
                                                <label style={{ color: 'blue' }}>Default</label>
                                                <br />
                                                <input style={{ width: '40px', height: '40px' }} type="color" value="#233656" disabled />
                                            </div>
                                            <div className='col-2'>
                                                <label style={{ color: 'blue' }}>New Color</label>
                                                <br />
                                                <input style={{ width: '40px', height: '40px' }} type="color" value={webProperties.IMAGE_SUB_CONTENT1_COLOR} onChange={(e) => {
                                                    setWebProperties({ ...webProperties, 'IMAGE_SUB_CONTENT1_COLOR': e.target.value })
                                                }} />
                                            </div>
                                        </div>

                                    </div>
                                    <div className='mb-2' style={{ border: '1px solid grey', padding: '5px' }}>
                                        <div className='col-12 mb-2'>
                                            <div>
                                                <label style={{ color: 'blue' }}>Image 2 (539 X 249 Pixels)</label>
                                                <input className='form-control' name="IMAGE2" type='file' onChange={(e) => onWebFileChange(e, 'IMAGE2')} />
                                            </div>
                                            <div>
                                                {
                                                    webProperties.IMAGE2 !== "IMAGE2" &&
                                                    < img src={webProperties.IMAGE2} style={{ width: 200, height: 200 }} title="IMAGE2" />
                                                }
                                            </div>
                                        </div>
                                        <div className='col-12 row mb-2'>
                                            <div className='col-8'>
                                                <label style={{ color: 'blue' }}>Image Content 2</label>
                                                <textarea type='text' style={{ color: webProperties.IMAGE_CONTENT2_COLOR === "#FFFFFF" ? 'black' : webProperties.IMAGE_CONTENT2_COLOR }} className='form-control' value={webProperties.IMAGE_CONTENT2} onChange={e => setWebProperties({ ...webProperties, 'IMAGE_CONTENT2': e.target.value })} />
                                            </div>
                                            <div className='col-2'>
                                                <label style={{ color: 'blue' }}>Default</label>
                                                <br />
                                                <input style={{ width: '40px', height: '40px' }} type="color" value="#000000" disabled />
                                            </div>
                                            <div className='col-2'>
                                                <label style={{ color: 'blue' }}>New Color</label>
                                                <br />
                                                <input style={{ width: '40px', height: '40px' }} type="color" value={webProperties.IMAGE_CONTENT2_COLOR} onChange={(e) => {
                                                    setWebProperties({ ...webProperties, 'IMAGE_CONTENT2_COLOR': e.target.value })
                                                }} />
                                            </div>
                                        </div>
                                        <div className='col-12 row'>
                                            <div className='col-8'>
                                                <label style={{ color: 'blue' }}>Image SubContent 2</label>
                                                <textarea type='text' style={{ color: webProperties.IMAGE_SUB_CONTENT2_COLOR === "#FFFFFF" ? 'black' : webProperties.IMAGE_SUB_CONTENT2_COLOR }} className='form-control' value={webProperties.IMAGE_SUB_CONTENT2} onChange={e => setWebProperties({ ...webProperties, 'IMAGE_SUB_CONTENT2': e.target.value })} />
                                            </div>
                                            <div className='col-2'>
                                                <label style={{ color: 'blue' }}>Default</label>
                                                <br />
                                                <input style={{ width: '40px', height: '40px' }} type="color" value="#233656" disabled />
                                            </div>
                                            <div className='col-2'>
                                                <label style={{ color: 'blue' }}>New Color</label>
                                                <br />
                                                <input style={{ width: '40px', height: '40px' }} type="color" value={webProperties.IMAGE_SUB_CONTENT2_COLOR} onChange={(e) => {
                                                    setWebProperties({ ...webProperties, 'IMAGE_SUB_CONTENT2_COLOR': e.target.value })
                                                }} />
                                            </div>
                                        </div>

                                    </div>
                                    <div className='mb-2' style={{ border: '1px solid grey', padding: '5px' }}>
                                        <div className='col-12 mb-2'>
                                            <div>
                                                <label style={{ color: 'blue' }}>Image 3 (558 X 506 Pixels)</label>
                                                <input className='form-control' type='file' name="IMAGE3" onChange={(e) => onWebFileChange(e, 'IMAGE3')} />
                                            </div>
                                            <div>
                                                {
                                                    webProperties.IMAGE3 !== "IMAGE3" &&
                                                    < img src={webProperties.IMAGE3} style={{ width: 200, height: 200 }} title="IMAGE3" />
                                                }     </div>
                                        </div>
                                        <div className='col-12 row mb-2'>
                                            <div className='col-8'>
                                                <label style={{ color: 'blue' }}>Image Content 3</label>
                                                <textarea type='text' style={{ color: webProperties.IMAGE_CONTENT3_COLOR === "#FFFFFF" ? 'black' : webProperties.IMAGE_CONTENT3_COLOR }} className='form-control' value={webProperties.IMAGE_CONTENT3} onChange={e => setWebProperties({ ...webProperties, 'IMAGE_CONTENT3': e.target.value })} />
                                            </div>
                                            <div className='col-2'>
                                                <label style={{ color: 'blue' }}>Default</label>
                                                <br />
                                                <input style={{ width: '40px', height: '40px' }} type="color" value="#000000" disabled />
                                            </div>
                                            <div className='col-2'>
                                                <label style={{ color: 'blue' }}>New Color</label>
                                                <br />
                                                <input style={{ width: '40px', height: '40px' }} type="color" value={webProperties.IMAGE_CONTENT3_COLOR} onChange={(e) => {
                                                    setWebProperties({ ...webProperties, 'IMAGE_CONTENT3_COLOR': e.target.value })
                                                }} />
                                            </div>
                                        </div>
                                        <div className='col-12 row'>
                                            <div className='col-8'>
                                                <label style={{ color: 'blue' }}>Image SubContent 3</label>
                                                <textarea type='text' style={{ color: webProperties.IMAGE_SUB_CONTENT3_COLOR === "#FFFFFF" ? 'black' : webProperties.IMAGE_SUB_CONTENT3_COLOR }} className='form-control' value={webProperties.IMAGE_SUB_CONTENT3} onChange={e => setWebProperties({ ...webProperties, 'IMAGE_SUB_CONTENT3': e.target.value })} />
                                            </div>
                                            <div className='col-2'>
                                                <label style={{ color: 'blue' }}>Default</label>
                                                <br />
                                                <input style={{ width: '40px', height: '40px' }} type="color" value="#233656" disabled />
                                            </div>
                                            <div className='col-2'>
                                                <label style={{ color: 'blue' }}>New Color</label>
                                                <br />
                                                <input style={{ width: '40px', height: '40px' }} type="color" value={webProperties.IMAGE_SUB_CONTENT3_COLOR} onChange={(e) => {
                                                    setWebProperties({ ...webProperties, 'IMAGE_SUB_CONTENT3_COLOR': e.target.value })
                                                }} />
                                            </div>
                                        </div>

                                    </div>
                                    <div className='mb-2' style={{ border: '1px solid grey', padding: '5px' }}>
                                        <div className='col-12 mb-2'>
                                            <div>
                                                <label style={{ color: 'blue' }}>Image 4 (539 X 249 Pixels)</label>
                                                <input className='form-control' type='file' name="IMAGE4" onChange={(e) => onWebFileChange(e, 'IMAGE4')} />
                                            </div>
                                            <div>
                                                {
                                                    webProperties.IMAGE4 !== "IMAGE4" &&
                                                    < img src={webProperties.IMAGE4} style={{ width: 200, height: 200 }} title="IMAGE4" />
                                                }
                                            </div>
                                            <div className='col-12 row mb-2'>
                                                <div className='col-8'>
                                                    <label style={{ color: 'blue' }}>Image Content 4</label>
                                                    <textarea type='text' style={{ color: webProperties.IMAGE_CONTENT4_COLOR === "#FFFFFF" ? 'black' : webProperties.IMAGE_CONTENT4_COLOR }} className='form-control' value={webProperties.IMAGE_CONTENT4} onChange={e => setWebProperties({ ...webProperties, 'IMAGE_CONTENT4': e.target.value })} />
                                                </div>
                                                <div className='col-2'>
                                                    <label style={{ color: 'blue' }}>Default</label>
                                                    <br />
                                                    <input style={{ width: '40px', height: '40px' }} type="color" value="#000000" disabled />
                                                </div>
                                                <div className='col-2'>
                                                    <label style={{ color: 'blue' }}>New Color</label>
                                                    <br />
                                                    <input style={{ width: '40px', height: '40px' }} type="color" value={webProperties.IMAGE_CONTENT4_COLOR} onChange={(e) => {
                                                        setWebProperties({ ...webProperties, 'IMAGE_CONTENT4_COLOR': e.target.value })
                                                    }} />
                                                </div>
                                            </div>
                                            <div className='col-12 row'>
                                                <div className='col-8'>
                                                    <label style={{ color: 'blue' }}>Image SubContent 4</label>
                                                    <textarea type='text' style={{ color: webProperties.IMAGE_SUB_CONTENT4_COLOR === "#FFFFFF" ? 'black' : webProperties.IMAGE_SUB_CONTENT4_COLOR }} className='form-control' value={webProperties.IMAGE_SUB_CONTENT4} onChange={e => setWebProperties({ ...webProperties, 'IMAGE_SUB_CONTENT4': e.target.value })} />
                                                </div>
                                                <div className='col-2'>
                                                    <label style={{ color: 'blue' }}>Default</label>
                                                    <br />
                                                    <input style={{ width: '40px', height: '40px' }} type="color" value="#233656" disabled />
                                                </div>
                                                <div className='col-2'>
                                                    <label style={{ color: 'blue' }}>New Color</label>
                                                    <br />
                                                    <input style={{ width: '40px', height: '40px' }} type="color" value={webProperties.IMAGE_SUB_CONTENT4_COLOR} onChange={(e) => {
                                                        setWebProperties({ ...webProperties, 'IMAGE_SUB_CONTENT4_COLOR': e.target.value })
                                                    }} />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='mb-2' style={{ border: '1px solid grey', padding: '5px' }}>
                                        <label style={{ color: 'blue' }}>Image Sidler (1780 X 876 Pixels)</label>
                                        <br />
                                        <FileBase64
                                            multiple={true}
                                            onDone={getFiles} />
                                        <br />
                                        {/* <input className='form-control' type='file' name="slider" multiple onChange={(e) => onSliderFiles(e)} /> */}
                                    </div>
                                    <div className='mb-2' style={{ border: '1px solid grey', padding: '5px' }}>
                                        <div className='mb-2'>
                                            <div className='col-12 row'>
                                                <div className='col-8'>
                                                    <label style={{ color: 'blue' }}>Footer Content</label>
                                                    <textarea style={{ color: webProperties.FOOTER_CONTENT1_COLOR === "#FFFFFF" ? 'black' : webProperties.FOOTER_CONTENT1_COLOR }} type='text' className='form-control' value={webProperties.FOOTER_CONTENT1} onChange={e => setWebProperties({ ...webProperties, 'FOOTER_CONTENT1': e.target.value })} />
                                                </div>
                                                <div className='col-2'>
                                                    <label style={{ color: 'blue' }}>Default</label>
                                                    <br />
                                                    <input style={{ width: '40px', height: '40px' }} type="color" value="#FFFFFF" disabled />
                                                </div>
                                                <div className='col-2'>
                                                    <label style={{ color: 'blue' }}>New Color</label>
                                                    <br />
                                                    <input style={{ width: '40px', height: '40px' }} type="color" value={webProperties.FOOTER_CONTENT1_COLOR} onChange={(e) => {
                                                        setWebProperties({ ...webProperties, 'FOOTER_CONTENT1_COLOR': e.target.value })
                                                    }} />
                                                </div>

                                            </div>
                                        </div>
                                        <div >
                                            <div className='col-12 row'>
                                                <div className='col-8'>
                                                    <label style={{ color: 'blue' }}>Footer Sub Content</label>
                                                    <textarea style={{ color: webProperties.FOOTER_SUB_CONTENT1_COLOR === "#FFFFFF" ? 'black' : webProperties.FOOTER_SUB_CONTENT1_COLOR }} type='text' className='form-control' value={webProperties.FOOTER_SUB_CONTENT1} onChange={e => setWebProperties({ ...webProperties, 'FOOTER_SUB_CONTENT1': e.target.value })} />
                                                </div>
                                                <div className='col-2'>
                                                    <label style={{ color: 'blue' }}>Default</label>
                                                    <br />
                                                    <input style={{ width: '40px', height: '40px' }} type="color" value="#FFFFFF" disabled />
                                                </div>
                                                <div className='col-2'>
                                                    <label style={{ color: 'blue' }}>New Color</label>
                                                    <br />
                                                    <input style={{ width: '40px', height: '40px' }} type="color" value={webProperties.FOOTER_SUB_CONTENT1_COLOR} onChange={(e) => {
                                                        setWebProperties({ ...webProperties, 'FOOTER_SUB_CONTENT1_COLOR': e.target.value })
                                                    }} />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    OR
                                    <div className='mt-2' >
                                        <div >
                                            <label style={{ color: 'blue' }}>Import File</label>
                                            <input className="form-control" type='file' onChange={(e) => onImportJson(e)} />
                                        </div>
                                    </div>
                                    <div className='mt-2'>
                                        <button type="button" className='btn btn-success' onClick={() => updateWebProps(state, dispatch, getUser.user, webProperties, webImages, appName)}>Save</button>
                                        <button type="button" className='ml-2 btn btn-info' onClick={() => standardWebProps()} >Set to Default</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            {/* : */}
            {/* <div className="row" >
                    <div className="col-md-6 mt-5">
                        <div className='flex-container' style={{ display: 'flex' }} >

                            <div className='text-left w-100 m-5'>
                                <div>
                                    <label style={{ color: 'blue' }}>Agile</label>
                                    <h4>{properties.AGILE}</h4>
                                </div>
                                <div>
                                    <label style={{ color: 'blue' }}>Agile Project Name</label>
                                    <h4>{properties.AGILE_PROJECT_NAME}</h4>
                                </div>

                                <div>
                                    <label style={{ color: 'blue' }}>Scrum-Board</label>
                                    <h4>{properties.SCRUM_BOARD}</h4>
                                </div>

                                <div>
                                    <label style={{ color: 'blue' }}>Epic</label>
                                    <h4>{properties.PROJECT}</h4>
                                </div>
                                <div>
                                    <label style={{ color: 'blue' }}>Sprint</label>
                                    <h4>{properties.MODULES}</h4>
                                </div>
                                <div>
                                    <label style={{ color: 'blue' }}>Active Sprints</label>
                                    <h4>{properties.ACTIVE_SPRINT}</h4>
                                </div>
                                <div>
                                    <label style={{ color: 'blue' }}>Completed Epics</label>
                                    <h4>{properties.COMPLETED_EPICS}</h4>
                                </div>
                                <div>
                                    <label style={{ color: 'blue' }}>User Story</label>
                                    <h4>{properties.MAINTASKS}</h4>
                                </div>
                                <div>
                                    <label style={{ color: 'blue' }}>User Stories</label>
                                    <h4>{properties.USER_STORIES}</h4>
                                </div>

                                <div>
                                    <label style={{ color: 'blue' }}>Task</label>
                                    <h4>{properties.SUBTASKS}</h4>
                                </div>

                                <div>
                                    <label style={{ color: 'blue' }}>Backlog</label>
                                    <h4>{properties.BACKLOG}</h4>
                                </div>
                                <div>
                                    <label style={{ color: 'blue' }}>Roadblock</label>
                                    <h4>{properties.ROADBLOCKS}</h4>
                                </div>
                                <div>
                                    <label style={{ color: 'blue' }}>Burn Down Report</label>
                                    <h4>{properties.BURN_DOWN_REPORT}</h4>
                                </div>
                                <div>
                                    <label style={{ color: 'blue' }}>Burn Up Report</label>
                                    <h4>{properties.BURN_UP_REPORT}</h4>
                                </div>
                                <div>
                                    <label style={{ color: 'blue' }}>Individual Velocity</label>
                                    <h4>{properties.INDIVIDUAL_VELOCITY}</h4>
                                </div>
                            </div>
                            <div className='text-left w-100 m-5'>
                                <div>
                                    <label style={{ color: 'blue' }}>Whiteboard</label>
                                    <h4>{properties.WHITEBOARD}</h4>
                                </div>
                                <div>
                                    <label style={{ color: 'blue' }}>Archive</label>
                                    <h4>{properties.ARCHIVE}</h4>
                                </div>
                                <div>
                                    <label style={{ color: 'blue' }}>Story Points</label>
                                    <h4>{properties.STORY_POINTS}</h4>
                                </div>
                                <div>
                                    <label style={{ color: 'blue' }}>Acceptance Criteria</label>
                                    <h4>{properties.ACCEPTANCE_CRITERIA}</h4>
                                </div>
                                <div>
                                    <label style={{ color: 'blue' }}>Priority Level</label>
                                    <h4>{properties.PRIORITY_LEVEL}</h4>
                                </div>
                                <div>
                                    <label style={{ color: 'blue' }}>Squad</label>
                                    <h4>{properties.SQUAD}</h4>
                                </div>
                                <div>
                                    <label style={{ color: 'blue' }}>Sprint Cycle</label>
                                    <h4>{properties.SPRINT_CYCLE}</h4>
                                </div>
                                <div>
                                    <label style={{ color: 'blue' }}>Sprint Velocity</label>
                                    <h4>{properties.SPRINT_VELOCITY}</h4>
                                </div>
                                <div>
                                    <label style={{ color: 'blue' }}>Epic Velocity</label>
                                    <h4>{properties.EPIC_VELOCITY}</h4>
                                </div>
                                <div>
                                    <label style={{ color: 'blue' }}>Individual Workload</label>
                                    <h4>{properties.INDIVIDUAL_WORKLOAD}</h4>
                                </div>

                                <div className='mt-2'>
                                    <button onClick={() => {updateProps(state,dispatch,getUser.user,properties,image)}}>Submit</button>
                                    <button onClick={() => setView(false)}>Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            } */}
        </div >
    )
}
