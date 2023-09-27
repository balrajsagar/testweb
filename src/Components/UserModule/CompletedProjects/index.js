import React, { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../Common/TopNav';
import SideNavigation from '../../Common/SideNav';
import { ideaReducer, initialState } from './ideaReducer';
import { getCompletedProjects } from './network';
import Moment from 'moment';
import $ from 'jquery';
import RootLoader from '../../Common/Loader/RootLoader';
import Condition from './condition';
import { PROJECTNAME,COMPLETED_PROJECTS, PROJECT_DESCRIPTION, PROJECT_REQUESTED_BY, PROJECT_COMPLETED_DATE, PROJECT_APPROVED_DATE, PROJECT_STATUS, PROJECT_REOPEN } from '../../Common/Headers';

export default function CompletedProjects() {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(ideaReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [projectInfo, setProjectInfo] = useState()
    useEffect(() => {
        getCompletedProjects(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (state.projects.length >= 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                })
            })
        }
    }, [state.projects])
    const handleOpen = (index) => {
        setOpen({ status: true, index: index });
        var info = {
            id: state.projects[index].idea_id, title: state.projects[index].idea_title,e_id:state.projects[index].e_id,
            description: state.projects[index].idea_description, completedDate: state.projects[index].endDate,
            action: "Reopen"
        }
        setProjectInfo(info)
    };
    const handleClose = () => {
        // state.projects = [];
        setOpen({ status: false, index: 0 });
        getCompletedProjects(dispatch, getUser.user);
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
    }
    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <SideNavigation />
                <div className="main-panel">
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <h4 className="card-title">{COMPLETED_PROJECTS}</h4>
                                    </div>
                                    {state.isLoading ? <RootLoader /> :
                                        <div className="table-responsive">
                                            {/* <MDBTable> */}
                                            <table
                                                search="true"
                                                id="example" className="table table-striped table-bordered"
                                                data-pagination="true"
                                            >
                                                <thead style={{ backgroundColor: '#F4FAF7' }}>
                                                    <tr>
                                                        {/* <th>S.NO</th> */}
                                                        {/* <th>Project ID</th> */}
                                                        <th style={{ textAlign: 'start' }}>{PROJECTNAME}</th>
                                                        <th style={{ textAlign: 'start' }}>{PROJECT_DESCRIPTION}</th>
                                                        <th>{PROJECT_REQUESTED_BY}</th>
                                                        <th>{PROJECT_APPROVED_DATE}</th>
                                                        <th>{PROJECT_COMPLETED_DATE}</th>
                                                        <th>{PROJECT_STATUS}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        state.projects.length > 0 ? state.projects.map((projects, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    {/* <td className="py-1" style={{ textAlign: 'end' }}>{index + 1}</td> */}
                                                                    {/* <td>{projects.idea_id}</td> */}
                                                                    <td style={{textTransform:"capitalize"}}>{projects.idea_title}</td>
                                                                    <td style={{textTransform:"capitalize"}}>{projects.idea_description}</td>
                                                                    <td style={{textTransform:"capitalize"}}>{projects.userName}</td>
                                                                    <td style={{ textAlign: 'start' }}>{Moment(projects.acceptedDate).format('MM/DD/YYYY')}</td>
                                                                    <td style={{ textAlign: 'start' }}>{Moment(projects.endDate).format('MM/DD/YYYY')}</td>
                                                                    <td style={{ textAlign: 'start',width:'90px' }}>
                                                                        {/* {projects.approvalStatus === "approved" ? <span className="badge badge-success rounded">Approved</span> */}
                                                                        <button className="badge badge-pill badge-success border-0" data-toggle="modal" data-target="#basicExampleModal" style={{width:'80px'}} onClick={(event) => handleOpen(index)}>{PROJECT_REOPEN}</button>
                                                                        {/* <div className="modal fade" id="basicExampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                                                                            aria-hidden="true">
                                                                            <div className="modal-dialog" role="document">
                                                                                <div className="modal-content">
                                                                                    <div className="modal-header">
                                                                                        <h5 className="modal-title" id="exampleModalLabel">Alert ...!</h5>
                                                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                                            <span aria-hidden="true">&times;</span>
                                                                                        </button>
                                                                                    </div>
                                                                                    <div className="modal-body">
                                                                                        Do you want to ReOpen the Project {projects.idea_id + projects.idea_title}
                                                                                    </div>
                                                                                    <div className="modal-footer">
                                                                                        <button type="button" className="btn btn-danger" data-dismiss="modal">No</button>
                                                                                        {state.isLoading ? <RootLoader /> :
                                                                                        <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => ReOpenProject(dispatch, getUser.user, projects.idea_id)}>Yes</button>}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div> */}
                                                                    </td>
                                                                    {/* <td>
                                                                        <div className="dropdown show">
                                                                            <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                                                                <img src="images/common/more.svg" alt="logo" style={{ width: '20px', height: '20px' }} />
                                                                            </a>

                                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                                                <a className="dropdown-item" href="#" onClick={() => alert(JSON.stringify(projects))}>Vide Modules</a>
                                                                            </div>
                                                                        </div>

                                                                    </td> */}
                                                                </tr>
                                                            )
                                                        }) : null}
                                                </tbody>
                                            </table>
                                            {/* </MDBTable> */}
                                        </div>
                                    }
                                    {
                                        open.status ? <Condition open={open.status} handleClose={handleClose} data={projectInfo} handleModalClose={handleModalClose}
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