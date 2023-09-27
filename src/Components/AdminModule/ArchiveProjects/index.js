import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminTopNav from '../Utility/TopNav';
import AdminSideBar from '../Utility/SideNav';
import API from '../../Common/Network/API';
import { Modal } from 'react-bootstrap';
import { AGILE_PROJECT_NAME, AGILE_PROJECT_STATUS, ARCHIVE_PROJECT } from '../../Common/Headers'
import Alert from '../../Common/Alert';


export default function ArchiveProjects() {
    const getUser = useSelector(state => state.auth)

    const [userSquadList, UpdateUserSquadList] = useState([]) //Show the list of Squad Names Based on username
    const [open, setOpen] = useState(false);
    const [projects, setProjects] = useState({});
    useEffect(() => {
        getSquadsList(getUser.user.empId); // GNK --> 01
        // eslint-disable-next-line
    }, [])

    // Squads List Getting Based on UserName
    const getSquadsList = async () => {
        try {
            var response = await API.post("squads.php", {
                action: "get_all_projects"
            }, {}, false);
            if (response.status === 'True') {
                UpdateUserSquadList(response.data)
            } else {
                UpdateUserSquadList([])
            }
        } catch (error) {
            // Alert('error',error.message)
        }
    }

    const reOpenProject = async () => {
        try {
            var response = await API.post("squads.php", {
                action: "archive_project",
                project_id: projects.project_id,
                is_active: 1,
            }, {}, false);
            if (response.status === 'True') {
                getSquadsList();
            } else {
                UpdateUserSquadList([])
            }
            Alert("success", `${projects.project_name} ReOpened Successfully`)
        } catch (error) {
        }
        handleArchiveClose();
    }

    const handleArchiveOpen = (project) => {
        setProjects(project)
        setOpen(true)
    };
    const handleArchiveClose = () => setOpen(false);

    return (
        <div className="container-scroller">
            <AdminTopNav />
            <div className="container-fluid page-body-wrapper">
                <AdminSideBar />
                <div className="main-panel">
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="justify-content-between row">
                                        <h4 className="card-title">{ARCHIVE_PROJECT}`s</h4>
                                        <div className="d-flex justify-content-end mb-0">
                                            {/* <button onClick={() => handleOpen("", "Add")} style={{ backgroundColor: 'transparent', border: '0' }} type="button" > <img src="images/common/adduser.svg" alt="logo" style={{ width: '25px', height: '25px' }} /><span className="m-1">Add Squad Member</span></button>
                                            {
                                                open.action === "Add" ? <AddEmployee open={open.status} handleClose={handleClose} handleModalClose={handleModalClose}
                                                /> : null
                                            } */}
                                        </div>
                                    </div>
                                    {userSquadList.length !== 0 ?
                                        <div className="table-responsive">
                                            <table
                                                search="true"
                                                id="example" className="table table-striped table-bordered"
                                                data-pagination="true"
                                            >
                                                <thead style={{ backgroundColor: '#F4FAF7' }}>
                                                    <tr>
                                                        <th style={{ textTransform: "capitalize", width: '160px' }} >{AGILE_PROJECT_NAME}</th>
                                                        <th>{AGILE_PROJECT_STATUS}</th>
                                                        {/* <th>{AGILE_PROJECT_REOPEN}</th>  */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        userSquadList.length !== 0 ? userSquadList.map((projects, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td style={{ textTransform: "capitalize" }}>{projects.project_name}</td>
                                                                    {/* <td >{projects.is_active === '1' ? "Active" : `${projects.project_name}' is Archived`}</td> */}
                                                                    <td style={{ textAlign: 'start' }}>{projects.is_active === '0' ? <button onClick={() => handleArchiveOpen(projects)} className="badge badge-pill badge-success border-0" data-toggle="modal" data-target="#basicExampleModal" style={{ width: '80px' }}>Reopen</button> : "Active"}</td>
                                                                </tr>
                                                            )
                                                        }) : null}
                                                </tbody>
                                            </table>
                                        </div>
                                        : null}

                                    <div className="col-12 " >
                                        <Modal style={{ textAlign: 'center' }} size="lg" show={open} onHide={() => handleArchiveClose()}>
                                            <Modal.Header style={{ backgroundColor: '#D2ECDF', margin: 0 }} >
                                                <Modal.Title> <h6 class="modal-title" style={{ paddingTop: 8, paddingLeft: 2, fontWeight: '600' }}>Are you sure you want to reopen {projects.project_name} ?</h6></Modal.Title>
                                                <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" onClick={() => handleArchiveClose()} className="d-flex align-items-right" data-dismiss="modal"><i class="mdi mdi-close text-black"></i></button>

                                            </Modal.Header>
                                            <Modal.Body style={{ height: 90, width: 320 }}>
                                                <label className='mt-3' style={{ display: 'flex', justifyContent: 'flex-start' }}>{AGILE_PROJECT_NAME}: {projects.project_name} </label>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <button className="btn-outline-success text-right" style={{ borderRadius: '20px' }} onClick={() => reOpenProject()}>
                                                    Reopen
                                                </button>
                                                <button className="btn-outline-fail text-left" style={{ borderRadius: '20px' }} onClick={() => handleArchiveClose()}>
                                                    Close
                                                </button>
                                            </Modal.Footer>
                                        </Modal>

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