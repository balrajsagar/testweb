import { useSelector } from "react-redux"
import React, { useEffect, useState } from "react"
import SideBar from "../SquadChat/sideNav"
import TopNavWithOutProject from "../Utility/TopNav/topnav"
import { Modal } from 'react-bootstrap';
import API from "../../Common/Network/API"

import { AGILE_PROJECT_NAME, APP_NAME, ARCHIVE_PROJECT, PRODUCT_OWNER, SCRUM_MASTER, SUPPORT_EMAIL } from "../../Common/Headers"
import Alert from "../../Common/Alert"
import { role_array } from '../../Common/getDefaultRoles';


export default function UserArchiveProjects() {
    const getUser = useSelector(state => state.auth)
    const [userSquadList, UpdateUserSquadList] = useState([]) //Show the list of Squad Names Based on username
    const [open, setOpen] = useState(false);
    const [cardInfo, setCardInfo] = useState({project_id:'', project_name:''})
    
    useEffect(() => {
      getSquadsList(getUser.user.empId); // GNK --> 01
      // eslint-disable-next-line
    }, [])
  
    // Squads List Getting Based on UserName
    const getSquadsList = async (empId) => {
      try {
        var response = await API.post("squads.php", {
          empId: empId,
          action: "get_all_projects"
        }, {}, false);
        if (response.status === 'True') {
            // console.log(response.data)
          UpdateUserSquadList(response.data)
        } else {
          UpdateUserSquadList([])
        }
      } catch (error) {
        // Alert('error',error.message)
      }
    }

    const handleArchiveOpen = ( squads ) => {
        setOpen(true);
        var project_info = {project_id:squads.id, project_name:squads.value}
        setCardInfo(project_info)
    }

    const handleArchiveClose = () => {
        setOpen(false)
        setCardInfo({project_id:'', project_name:''})
    };

    const archiveProject = async ({project_id, project_name}) => {
        try {
            var response = await API.post("squads.php", {
                action: "archive_project",
                project_id: project_id,
                is_active: 0,
            }, {}, false);
            if (response.status === 'True') {
                Alert('success', `${project_name} Project Archived Successfully`);
                setOpen(false);
                getSquadsList(getUser.user.empId); 
            } else {
                //switchProject();
            }
        } catch (error) {
            Alert('error',error.message)
            setOpen(false);
        }
    }

    const requestReopenArchiveProject = async (squads) => {
        try {
            var response = await API.post("squads.php", {
                action: "reopen_notification",
                project_name: squads.value,
                username: getUser.user.fullName,
                email: SUPPORT_EMAIL,
                role: role_array[getUser.user.role],
                appname: APP_NAME
            }, {}, false);
            if (response.status === 'True') {
                Alert('success', `Reopen Request sent to ADMIN`);
            } else {
            }
        } catch (error) {
            Alert('error',error.message)
            setOpen(false);
        }
    }

    return (
        <div className="container-scroller">
            <TopNavWithOutProject />
            <div className="container-fluid page-body-wrapper">
                <SideBar squads={userSquadList}/>
                <div className="main-panel">
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="justify-content-between row">
                                        <h4 className="card-title" style={{ paddingLeft: 10, paddingTop: 20, margin: 0 }}>{ARCHIVE_PROJECT}</h4>
                                    </div>
                                    <p style={{ padding: '0.6rem 0rem', color: 'red' }}>Note : Once the project is archived you will no longer have access. Only admin can reopen the Archived Projects.</p>
                                    {/* eslint-disable-next-line */}
                                    {userSquadList.length > 0 ? userSquadList.map((squads, index) => {
                                        return (
                                            <div className="col-9">
                                                <div className="card col-12" style={{ backgroundColor: squads.is_active === '0'? 'rgb(245, 132, 132)' : ''}}>
                                                    <div className="container-fluid col-12 row" >
                                                        <div class="d-flex col-12"  >
                                                            <div class="mr-auto p-2">
                                                                <b style={{ width: '500px', cursor: 'pointer', paddingTop: 10, textTransform: 'capitalize' }} title={squads.value}> {squads.value} </b>
                                                            </div>
                                                            {/* <p style={{ backgroundColor: 'teal', cursor: 'pointer', color: 'white', marginLeft: 5, padding: '3px', marginTop: 5, marginBottom: 5, width: '25px', textAlign: 'center' }} title={PRIORITY_LEVEL}>P</p> */}
                                                            {((role_array[squads.role] === SCRUM_MASTER || role_array[squads.role] ===  PRODUCT_OWNER) && squads.is_active === '1') ? <p title="Once the project is archived you will no longer have access. Only admin can reopen the Archived Projects." data-toggle="modal" data-target="#exampleModal" 
                                                             style={{ cursor: 'pointer', color: 'white', marginLeft: 5, padding: '5px', marginTop: 5, marginBottom: 5, textAlign: 'center' }} className='btn-success' onClick={() => handleArchiveOpen(squads)}>{ARCHIVE_PROJECT}</p> : ((role_array[squads.role] === SCRUM_MASTER || role_array[squads.role] ===  PRODUCT_OWNER) && squads.is_active === '0') ?
                                                             <p data-toggle="modal" data-target="#exampleModal" title="Request Admin to REOPEN this Project"
                                                             style={{ cursor: 'pointer', color: 'white', marginLeft: 5, padding: '5px', marginTop: 5, marginBottom: 5, textAlign: 'center' }} className='btn-success' onClick={() => requestReopenArchiveProject(squads)}>Request Reopen</p>: null }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                        : null}

                                </div>
                                <div className="col-12 " >
                                <Modal style={{ textAlign: 'center' }} size="lg" show={open} onHide={() => handleArchiveClose()}>
                                    <Modal.Header style={{ backgroundColor: '#D2ECDF', margin: 0 }} >
                                        <Modal.Title> <h6 class="modal-title" style={{ paddingTop: 8, paddingLeft: 2, fontWeight: '600' }}>Are you sure you want to {ARCHIVE_PROJECT} ?</h6></Modal.Title>
                                        <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" onClick={() => handleArchiveClose()} className="d-flex align-items-right" data-dismiss="modal"><i class="mdi mdi-close text-black"></i></button>
                                    </Modal.Header>
                                    <Modal.Body style={{ height: 90, width: 320 }}>
                                        <label className='mt-3' style={{ display: 'flex', justifyContent: 'flex-start' }}>{AGILE_PROJECT_NAME}: {cardInfo.project_name} </label>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button className="btn-outline-success text-right" style={{ borderRadius: '20px' }} onClick={() => archiveProject(cardInfo)}>
                                            {ARCHIVE_PROJECT}
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
    )
}