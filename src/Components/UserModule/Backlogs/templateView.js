/* 
FileName:templateView.js
purpose:Template View
Developers:Rohini
 */
import React, { useEffect, useState, useReducer } from 'react';
import $ from 'jquery';
// eslint-disable-next-line
import SideBar from '../Utility/SideNav';
import Header from '../Utility/TopNav/topnav';
// import RootLoader from '../../Common/Loader/RootLoader';
import { useSelector } from 'react-redux';
import { getTemplate } from './network';
import { tasksReducer, initialState } from './tasksReducer';
import { CHAT, SQUAD_MEMBER_NAME, ACTION_ICON } from '../../Common/Headers';
import ModifyTemplate from '../../Common/TasksModals/modifyTemplate';
import DeleteTemplate from '../../Common/TasksModals/deleteTemplate';
import EditTemplate from '../../Common/TasksModals/editTemplate';
import { useHistory } from 'react-router-dom';

export default function TemplateView() {
    const history = useHistory()
    const getUser = useSelector(state => state.auth)
    const [cardInfo, setCardInfo] = useState()
    const [state, dispatch] = useReducer(tasksReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    useEffect(() => {
        // getAllMessages(dispatch, getUser.user);
        getTemplate(dispatch, getUser.user)
        // eslint-disable-next-line
    }, [])
    const handleOpen = (action, data) => {
        // eslint-disable-next-line
        var info
        setOpen({ status: true, action: action });
        if (action === "modifyTemplate") {
            var status = "backlog_addUser"
            info = { view: status, data: data }
        } else if (action === "deleteTemplate") {
            status = "deleteTemplate"
            info = { view: status, data: data }
        } else if (action === "editTemplate") {
            status = "editTemplate"
            info = { view: status, data: data }
        }
        setCardInfo(info)
    }
    const handleClose = () => {
        setOpen({ status: false, index: 0 })
        getTemplate(dispatch, getUser.user);
    };
    useEffect(() => {
        if (state.template.length > 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                })
            })
        }
    }, [state.template])


    // console.log("user",getUser.user)
    // console.log("template",state.template)
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
                                    <div className='row' style={{ backgroundColor: 'rgb(210, 236, 223)', marginBottom: '5px', padding: '10px' }}>
                                        <label className="card-title col-6" style={{ overflowWrap: "break-word", color: 'blue', backgroundColor: 'transparent', margin: 'auto' }}>Templates</label>
                                        <label onClick={() => history.push({ pathname: '/backlogs', state: { action: 'add' } })} className="card-title col-6" style={{ overflowWrap: "break-word", color: 'black', backgroundColor: 'transparent', cursor: 'pointer', textAlign: 'end', margin: 'auto' }}>x</label>
                                        {/* <label className="card-title col-3" /> */}
                                    </div>
                                    {/* start  */}
                                    {/* {state.isLoading ? <RootLoader /> : */}
                                    <div>
                                        {/* {state.template.length > 0 ? state.template.map((group, index) => {
                                                return(
                                                    <div className="col-12"key={group.id}>
                                                            <div className="card col-12">
                                                                <div className="container-fluid col-12 row" >
                                                                    <div className="d-flex col-12" style={{ padding: 0 }}>
                                                                        <div className="mr-auto p-2">
                                                    <b style={{ cursor: 'pointer', paddingTop: 10, fontSize: '12px' }} 
                                                    data-toggle="tooltip" data-placement="right" title={group.members_name}
                                                    >{group.name}</b>
                                                                        </div>
                                                                        <button type="button" style={{ backgroundColor: 'transparent', border: "0", marginLeft: 10, width: '10px', padding: "0" }} >
                                                                        {
                                                                                getMessagesCount(index, state.allMessages, group)
                                                                            }
                                    </button>


                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                       
                                                )
                                            }) : null} */}

                                        {/* Table Form */}
                                        {state.template.length !== 0 ?
                                            <div className="table-responsive">

                                                {/* <MDBTable> */}
                                                <table
                                                    search="true"
                                                    id="example" className="table table-striped table-bordered"
                                                    data-pagination="true"
                                                >
                                                    <thead style={{ backgroundColor: '#F4FAF7', display: "none" }}>
                                                        <tr>
                                                            <th style={{ textTransform: "capitalize", width: '160px' }} >{SQUAD_MEMBER_NAME}</th>
                                                            <th style={{ width: '20px', alignItems: "center" }}>{CHAT}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            state.template.length !== 0 ? state.template.map((template, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        {/* {employee.email !== getUser.user.userName ? : ""} */}
                                                                        {/* eslint-disable-next-line */}
                                                                        <td style={{ textTransform: "capitalize", paddingLeft: "2%" }} ><a onClick={(event) => handleOpen("modifyTemplate", template)}>{template.story_title}</a></td>
                                                                        <td style={{ width: '8px', height: "35px", paddingLeft: "-10%" }}>
                                                                            {/* <button type="button" style={{ paddingLeft:"-5%",backgroundColor: 'transparent', border: "0", width: '5px', padding: "0", marginLeft:"15px"  }} >
                                                                        {
                                                                                getMessagesCount(index, state.allMessages, employee)
                                                                            }
                                                                        </button> */}
                                                                            <div className="dropdown show" style={{ cursor: 'pointer', marginLeft: 15, marginRight: 15, padding: '5px', marginTop: 5, float: "right" }}>
                                                                                {/* eslint-disable-next-line */}
                                                                                <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                                                                    <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo" style={{ width: '15px', height: '15px', borderRadius: '0' }} />
                                                                                </a>
                                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0' }}>
                                                                                    <div>
                                                                                        <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#203B5A", color: 'white' }}
                                                                                            onClick={(event) => handleOpen("modifyTemplate", template)}
                                                                                        >Add as user story</button>
                                                                                        {getUser.user.empId === template.assigned_by ?
                                                                                            <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "rgb(99, 4, 54)", color: 'white' }}
                                                                                                onClick={(event) => handleOpen("editTemplate", template)}
                                                                                            >Edit Template</button>
                                                                                            : ""}
                                                                                        {getUser.user.empId === template.assigned_by ?
                                                                                            <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#76C54E", color: 'white' }}
                                                                                                onClick={(event) => handleOpen("deleteTemplate", template)}
                                                                                            >Delete</button>
                                                                                            : ""}

                                                                                    </div>
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
                                            : null}
                                        {open.action === "modifyTemplate" ?
                                            <ModifyTemplate open={open.status} data={cardInfo} handleClose={handleClose} handleModalClose={handleClose}
                                            /> : null
                                        }
                                        {open.action === "deleteTemplate" ?
                                            <DeleteTemplate open={open.status} data={cardInfo} handleClose={handleClose} handleModalClose={handleClose}
                                            /> : null
                                        }
                                        {open.action === "editTemplate" ?
                                            <EditTemplate open={open.status} data={cardInfo} handleClose={handleClose} handleModalClose={handleClose}
                                            /> : null
                                        }
                                    </div>
                                    {/* // } */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}