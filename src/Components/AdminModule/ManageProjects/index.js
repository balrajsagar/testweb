import React, { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { ideaReducer, initialState } from './ideaReducer';
import { getProjects } from './network';
// import { MDBTable } from 'mdbreact';
import $ from 'jquery';
import AddProject from './addProject';
import RootLoader from '../../Common/Loader/RootLoader';
import ModifyProject from './modifyProject';
import { Link } from 'react-router-dom';
import CheckCondition from './CheckCondition';
import RO from '../../Common/RO';
import AdminTopNav from '../Utility/TopNav';
import AdminSideBar from '../Utility/SideNav';
import { VIEWMODULES, MANAGEPROJECTS, NEWPROJECT, VERIFY, DELETE, EDIT, APPROVE, REJECT, PROJECTNAME, ADDMODULE, ACTION,  PROJECT_APPROVAL_STATUS, PROJECT_STATUS, ACTION_ICON } from '../../Common/Headers';
import AddModule from '../../Common/Modules/addModule';

export default function Projects() {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(ideaReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [newOpen, setNewOpen] = useState(false)
    const [check, setCheck] = useState({ status: false, index: 0 })
    const [projectInfo, setProjectInfo] = useState()
    useEffect(() => {
        getProjects(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (state.projects.length > 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                })
            })
        }
    }, [state.projects])
    const handleOpen = (index, action) => {
        setOpen({ status: true, index: index,action: action});
        var info = { id: state.projects[index].idea_id, title: state.projects[index].idea_title, description: state.projects[index].idea_description, action: action }
        setProjectInfo(info)
    };
    const handleNewOpen = (index) => {
        setNewOpen(true);
    };
    const handleClose = () => {
        // state.projects=[]
        setNewOpen(false)
        setOpen({ status: false, index: 0 });
        setCheck({ status: false, index: 0 });
        getProjects(dispatch, getUser.user)
    };
    const handleModalClose = () => {
        setNewOpen(false)
        setOpen({ status: false, index: 0 });
        setCheck({ status: false, index: 0 });
    }
    const handleCheck = (index, action) => {
        setCheck({ status: true, index: index, action: action });
        var info = { id: state.projects[index].idea_id, title: state.projects[index].idea_title, action: action }
        setProjectInfo(info)
    };
    return (
        <div className="container-scroller">
            <AdminTopNav />
            <div className="container-fluid page-body-wrapper">
                <AdminSideBar />
                <div className="main-panel">
                    {/* content-wrapper */}
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="justify-content-between row">
                                        <h4 className="card-title">{MANAGEPROJECTS}</h4>
                                        <div className="d-flex justify-content-end mb-0">
                                            <button onClick={() => handleNewOpen()} style={{ backgroundColor: 'transparent', border: '0' }} type="button" > <img src="images/common/add.png" title={NEWPROJECT} alt="logo" style={{ width: '20px', height: '20px' }} /><span className="m-1">{NEWPROJECT}</span></button>
                                            {
                                                newOpen ? <AddProject open={newOpen} handleClose={handleClose} handleModalClose={handleModalClose}
                                                /> : null
                                            }
                                        </div>

                                    </div>
                                    {state.isLoading ? <RootLoader /> :
                                        <div className="table-responsive">
                                            {/* <MDBTable> */}
                                            <table
                                                search="true"
                                                id="example" className="table table-striped table-bordered"
                                                data-pagination="true"
                                            >
                                                <thead style={{ backgroundColor: '#F4FAF7' }} >
                                                    <tr >
                                                        {/* <th>S.NO</th> */}
                                                        {/* <th>Project ID</th> */}
                                                        <th>{PROJECTNAME}</th>
                                                        {/* <th>{PROJECT_DESCRIPTION}</th>
                                                        <th>{PROJECT_REQUESTED_BY}</th>
                                                        <th>{RELEASE_OWNER}</th>
                                                        <th style={{ width: "120px" }}>{PROJECT_APPROVED_BY}</th> */}
                                                        <th style={{ width: '100px' }}>{PROJECT_APPROVAL_STATUS}</th>
                                                        <th style={{ width: '80px' }}>{PROJECT_STATUS}</th>
                                                        <th>{ACTION}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        state.projects !== [] ? state.projects.map((projects, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    {/* <td className="py-1" style={{textAlign:'end',width:'10px'}}>{index + 1}</td> */}
                                                                    {/* <td>{projects.idea_id}</td> */}
                                                                    <td  class="link" style={{ textTransform: "capitalize", fontWeight:'bold' }} data-toggle="tooltip" data-placement="left" title={"Description   :"+projects.idea_description+"\n\nRequested By:"+projects.userName+"\n\nRO                :"+projects.releaseOwner+"\n\nApproved By :"+projects.acceptedBy}><Link to={{ pathname: '/projectInfo', state: { id: state.projects[index].idea_id, idea_title: state.projects[index].idea_title, idea_description: state.projects[index].idea_description, ro: state.projects[index].releaseOwner, requestedBy: state.projects[index].userName, acceptedBy: state.projects[index].acceptedBy, created_on: state.projects[index].created_on } }} >{projects.idea_title}</Link></td>
                                                                    {/* <td style={{ textTransform: "capitalize" }}>{projects.idea_description}</td>
                                                                    <td style={{ textTransform: "capitalize", width: '120px' }}>{projects.userName}</td>
                                                                    <td style={{ textTransform: "capitalize" }}>{projects.releaseOwner}</td>
                                                                    <td style={{ textTransform: "capitalize", width: '120px' }}>{projects.acceptedBy !== null ? projects.acceptedBy : 'NA'}</td> */}
                                                                    <td style={{ textAlign: 'center' }}>
                                                                        {projects.approvalStatus === "approved" ? <span className="badge badge-pill badge-success " style={{ width: '100px' }}>Approved</span>
                                                                            : <span className="badge badge-pill" style={{ backgroundColor: 'orange', color: 'white', width: '100px' }}>Requested</span>}
                                                                    </td>
                                                                    <td style={{ textAlign: 'center', textTransform: "capitalize" }}>
                                                                        {projects.ideaStatus === "finalized" ? <span className="badge badge-pill badge-success" style={{ width: '90px' }}>Completed</span>
                                                                            : <span className="badge badge-pill badge-danger" style={{ width: '90px' }}>Pending</span>}
                                                                    </td>
                                                                    <td style={{ textAlign:'center',width:'10px' }}>
                                                                        <div className="dropdown show">
                                                                            {/* eslint-disable-next-line */}
                                                                            <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                                                            <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo"  style={{ width: '20px', height: '20px',borderRadius:'0' }} />
                                                                            </a>

                                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0' }}>
                                                                                {projects.approvalStatus === "approved" ? <div>
                                                                                    <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#6ce6b2",color:'white' }}><Link to={{ pathname: '/viewModules', state: { id: state.projects[index].idea_id, title: state.projects[index].idea_title } }} style={{ color: 'white' }}>{VIEWMODULES
                                                                                    }</Link></button>
                                                                                    <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#3DD896",color:'white' }} onClick={(event) => handleOpen(index, "Add")}>{ADDMODULE}</button>
                                                                                    <button className="dropdown-item badge badge-pill badge-dark text-center" style={{ backgroundColor: "black" }} onClick={(event) => handleCheck(index, "RO")}>RO</button>                                                                                    {projects.ideaStatus === "finalized" ? <button className="dropdown-item badge badge-pill badge-success text-center" style={{ backgroundColor: "#6BC2D3",color:'white' }} onClick={(event) => handleCheck(index, "Verify")}>{VERIFY}</button> : null}
                                                                                    <button className="dropdown-item badge badge-pill badge-danger text-center" style={{ backgroundColor: '#ED7173',color:'white'}} onClick={(event) => handleCheck(index, "Delete")}>{DELETE}</button></div> :
                                                                                    <div>
                                                                                        {/* <button className="dropdown-item badge badge-pill badge-primary text-center" style={{backgroundColor:"blue"}}><Link to={{ pathname: '/viewModules', state: { id: state.projects[index].idea_id, title: state.projects[index].idea_title } }} style={{ color: 'white' }}>View Modules</Link></button> */}
                                                                                        {getUser.user.empId === projects.emp_id ? <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#76C54E" ,color:'white'}} href="#" onClick={(event) => handleOpen(index, "modify")}>{EDIT}</button> : null}
                                                                                        <div>
                                                                                            <button className="dropdown-item badge badge-pill badge-success text-center" style={{ backgroundColor: "#089688",color:'white' }} onClick={(event) => handleCheck(index, "Approve")}>{APPROVE}</button>
                                                                                            <button className="dropdown-item badge badge-pill badge-danger text-center" style={{ backgroundColor: "#FF9654",color:'white'}} onClick={(event) => handleCheck(index, "Reject")}>{REJECT}</button>
                                                                                            <button className="dropdown-item badge badge-pill badge-danger text-center" style={{ backgroundColor: '#ED7173',color:'white'}} onClick={(event) => handleCheck(index, "Delete")}>{DELETE}</button></div>
                                                                                    </div>}

                                                                            </div>
                                                                        </div>

                                                                    </td>
                                                                </tr>
                                                            )
                                                        }) : null}
                                                </tbody>
                                            </table>
                                            {/* </MDBTable> */}
                                        </div>
                                    }
                                    {
                                        (open.status && open.action === "modify") ? <ModifyProject open={open.status} handleClose={handleClose} data={projectInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                       (open.status && open.action === "Add") ? <AddModule open={open.status} handleClose={handleClose} data={projectInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        (check.status && check.action !== "RO") ? <CheckCondition open={check.status} handleClose={handleClose} data={projectInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        (check.status && check.action === "RO") ? <RO open={check.status} handleClose={handleClose} data={projectInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}