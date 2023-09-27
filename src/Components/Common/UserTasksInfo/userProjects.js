import React, { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { getProjects } from './network';
import RootLoader from '../../Common/Loader/RootLoader';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { userTaskReducer ,initialState} from './userTaskReducer';
import TopNav from '../../UserModule/Utility/TopNav';
import SideBar from '../../UserModule/Utility/SideNav';
import AddProject from '../../UserModule/ManageProjects/addProject';
import ModifyProject from '../../UserModule/ManageProjects/modifyProject';
import CheckCondition from '../../UserModule/ManageProjects/CheckCondition';
import {CONTRIBUTOR, VIEWMODULES, PROJECTNAME, EDIT, ACTION, RELEASE_OWNER, PROJECT_DESCRIPTION, PROJECT_REQUESTED_BY, PROJECT_APPROVED_BY, ACTION_ICON } from '../Headers';

export default function UserProjects() {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(userTaskReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [newOpen, setNewOpen] = useState(false)
    const [check, setCheck] = useState({ status: false, index: 0 })
    const [projectInfo, setProjectInfo] = useState()
    useEffect(() => {
        getProjects(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [])
    var table;
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
    const handleOpen = (index,action) => {
        setOpen({ status: true, index: index });
        var info = { id: state.projects[index].idea_id, title: state.projects[index].idea_title, description: state.projects[index].idea_description,action:action }
        setProjectInfo(info)
    };
    const handleNewOpen = (index) => {
        setNewOpen(true);
    };
    const handleClose = () => {
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
    // const handleCheck = (index, action) => {
    //     setCheck({ status: true, index: index, action: action });
    //     var info = { id: state.projects[index].idea_id, title: state.projects[index].idea_title, action: action }
    //     setProjectInfo(info)
    // };
    return (
        <div className="container-scroller">
            <TopNav />
            <div className="container-fluid page-body-wrapper">
                <SideBar />
                <div className="main-panel">
                    {/* content-wrapper */}
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="justify-content-between row">
                                        <h4 className="card-title">Approved Projects</h4>
                                        {getUser.user.role !== CONTRIBUTOR ? <div className="d-flex justify-content-end mb-2">
                                            <button onClick={() => handleNewOpen()} style={{ backgroundColor: 'transparent', border: '0' }} type="button" > <img src="images/common/add.png" alt="logo" style={{ width: '20px', height: '20px' }} onClick={() => handleNewOpen()} /><span className="m-1">Add Project</span></button>
                                            {
                                                newOpen ? <AddProject open={newOpen} handleClose={handleClose} handleModalClose={handleModalClose}
                                                /> : null
                                            }
                                        </div>:null}

                                    </div>
                                    {state.isLoading ? <RootLoader /> :
                                        <div className="table-responsive">
                                            <table
                                                search="true"
                                                id="example" className="table table-striped table-bordered"
                                                data-pagination="true"
                                            >
                                                <thead style={{ backgroundColor: '#F4FAF7' }}>
                                                    <tr >
                                                        {/* <th>S.NO</th> */}
                                                        {/* <th>Project ID</th> */}
                                                        <th>{PROJECTNAME}</th>
                                                        <th>{PROJECT_DESCRIPTION}</th>
                                                        <th>{PROJECT_REQUESTED_BY}</th>
                                                        <th>{RELEASE_OWNER}</th>
                                                        <th>{PROJECT_APPROVED_BY}</th>
                                                        {/* <th style={{width:'100px'}}>Status</th> */}
                                                        <th>{ACTION}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        state.projects !== [] ? state.projects.map((projects, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    {/* <td className="py-1" style={{ textAlign: 'end', width: '10px' }}>{index + 1}</td> */}
                                                                    {/* <td>{projects.idea_id}</td> */}
                                                                    <td style={{ textTransform: "capitalize" }}><Link to={{ pathname: '/userProjectInfo', state: { id: state.projects[index].idea_id, idea_title: state.projects[index].idea_title, idea_description: state.projects[index].idea_description, ro: state.projects[index].releaseOwner, requestedBy: state.projects[index].userName, acceptedBy: state.projects[index].acceptedBy, created_on: state.projects[index].acceptedDate } }} style={{ color: 'green', fontWeight: 'bold' }}>{projects.idea_title}</Link></td>
                                                                    {/* <td style={{textTransform:"capitalize"}}>{projects.idea_title}</td> */}
                                                                    <td style={{textTransform:"capitalize"}}>{projects.idea_description}</td>
                                                                    <td style={{textTransform:"capitalize"}}>{projects.userName}</td>
                                                                    <td style={{textTransform:"capitalize"}}>{projects.releaseOwner}</td>
                                                                    <td style={{ textTransform: "capitalize" }}>{projects.acceptedBy !== null ? projects.acceptedBy : 'NA'}</td>
                                                                    {/* <td style={{ textAlign: 'center' }}>
                                                                       <span className="badge badge-pill badge-success" style={{width:'100px'}}>Approved</span>
                                                                    </td> */}
                                                                   <td style={{ textAlign:'center',width:'10px' }}>
                                                                        <div className="dropdown show">
                                                                            {/* eslint-disable-next-line */}
                                                                            <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                                                            <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo"  style={{ width: '20px', height: '20px',borderRadius:'0' }} />
                                                                            </a>

                                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{backgroundColor:'transparent',border:'0'}}>
                                                                                    <div>
                                                                                        <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#6ce6b2",color:'white' }}><Link to={{ pathname: '/addModules', state: { id: state.projects[index].idea_id, title: state.projects[index].idea_title } }} style={{ color: 'white' }}>{VIEWMODULES}</Link></button>
                                                                                        {getUser.user.empId === projects.emp_id ? <button className="dropdown-item badge badge-pill badge-warning text-center" onClick={(event) => handleOpen(index,"modify")}>{EDIT}</button> : null}
                                                                                        {/* <button className="dropdown-item badge badge-pill badge-dark text-center" style={{ backgroundColor: "black" }} onClick={(event) => handleCheck(index, "RO")}>{RELEASE_OWNER}</button> */}
                                                                                    </div>

                                                                            </div>
                                                                        </div>

                                                                    </td>
                                                                </tr>
                                                            )
                                                        }) : null}
                                                </tbody>
                                            </table>
                                        </div>
                                    }
                                    {
                                        open.status ? <ModifyProject open={open.status} handleClose={handleClose} data={projectInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        (check.status && check.action !== "RO") ? <CheckCondition open={check.status} handleClose={handleClose} data={projectInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {/* {
                                        (check.status && check.action === "RO") ? <RO open={check.status} handleClose={handleClose} data={projectInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    } */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}