import React, { useEffect, useReducer, useState } from 'react';
import $ from 'jquery';
import { getEmployees } from './network';
import { useSelector } from 'react-redux';
import { accountReducer, initialState } from './accountReducer';
import AdminTopNav from '../Utility/TopNav';
import AdminSideBar from '../Utility/SideNav';
import UserChat from '../../Common/SquadChat';
// import Switch from "react-switch";
// import { activeEmployee, deActiveEmployee } from '../Team/network'
import {CONTACT, CLIENT_NAME, EMAIL, USERNAME, NO_OF_PROJECTS, NO_OF_USERS, ACCOUNTS} from '../../Common/Headers'
import AddAccount from './addAccount';
import EditAccount from './editAccount';


export default function AgileAccount() {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(accountReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [info, setInfo] = useState();

    useEffect(() => {
        getEmployees(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [])
    const empSorted = state.employees;

    useEffect(() => {
        if (empSorted.length > 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                    "ordering": false 
                })
            })
        }
    }, [empSorted])
   
    const handleOpen = (index, action, sno) => {
        if (action === "Add") {
            setOpen({ status: true, action: action });
        } else {
            setOpen({ status: true, index: index, action: action });
            var info = {
                id: empSorted[index].id,
                employeeId: empSorted[index].id,
                name: empSorted[index].name, 
                action: action,
                email: empSorted[index].email,
                mobile: empSorted[index].mobileNumber,
                userName: empSorted[index].userName,
                clientname: empSorted[index].clientname,
                no_of_projects: empSorted[index].projectscount,
                no_of_users: empSorted[index].userscount,
                workingStatus: empSorted[index].workingStatus,
            }
            setInfo(info)
        }
    };
    const handleClose = () => {
        setOpen({ status: false, index: 0 });
        getEmployees(dispatch, getUser.user);
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
    }


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
                                        <h4 className="card-title">{ACCOUNTS}</h4>
                                        <div className="d-flex justify-content-end mb-0">
                                            <button onClick={() => handleOpen("", "Add")} style={{ backgroundColor: 'transparent', border: '0' }} type="button" > <img src="images/common/adduser.svg" alt="logo" style={{ width: '25px', height: '25px' }} /><span className="m-1">Add Account</span></button>
                                            {
                                                open.action === "Add" ? <AddAccount open={open.status} handleClose={handleClose} handleModalClose={handleModalClose}
                                                /> : null
                                            }
                                        </div>
                                    </div>
                                    {state.employees.length !== 0 ?
                                        <div className="table-responsive">
                                            <table
                                                search="true"
                                                id="example" className="table table-striped table-bordered"
                                                data-pagination="true"
                                            >
                                                <thead style={{ backgroundColor: '#F4FAF7' }}>
                                                    <tr>
                                                        <th style={{ textTransform: "capitalize", width: '160px' }} >{CLIENT_NAME}</th>
                                                        <th>{USERNAME}</th>
                                                        <th>{EMAIL}</th>
                                                        <th>{CONTACT}</th>
                                                        <th>{NO_OF_PROJECTS}</th>
                                                        <th>{NO_OF_USERS}</th>
                                                        {/* <th>{ACCOUNTS_STATUS}</th> */}
                                                        <th style={{ width: '20px' }}>Edit</th>
                                                        {/* {(getUser.user.role !== "Contributor") ? <th style={{ width: '20px' }}>Delete</th> : null} */}
                                                        {/* <th style={{ width: '20px' }}>{CHAT}</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        empSorted.length !== 0 ? empSorted.map((employee, index) => {
                                                            const input = employee.name;
                                                            const [name] = input.split('@');
                                                            return (
                                                                <tr key={index}>
                                                                    <td style={{ textTransform: "capitalize" }}>{employee.clientname}</td> 
                                                                    <td style={{ textAlign: 'center',width:110 }}>{name}</td>                                                                     
                                                                    <td >{employee.email}</td>
                                                                    <td style={{ textAlign: 'start' }}>{employee.mobileNumber}</td>
                                                                    <td>{employee.projectscount}</td>
                                                                    <td>{employee.userscount}</td>
                                                                    {/* <td style={{ textAlign: 'center' }}>
                                                                        <Switch
                                                                            checked={(employee.workingStatus === "1") ? true : false}
                                                                            onChange={() => (employee.workingStatus === "1") ? deActiveEmployee(dispatch, getUser.user,employee.id, employee.email, handleClose, handleModalClose) : activeEmployee(dispatch, getUser.user,employee.id, employee.email, handleClose, handleModalClose) }
                                                                            handleDiameter={28}
                                                                            offColor="#CD5C5C"
                                                                            onColor="#008000"
                                                                            offHandleColor="#fff"
                                                                            onHandleColor="#fff"
                                                                            height={30}
                                                                            width={100}
                                                                            borderRadius={6}
                                                                            activeBoxShadow="0px 0px 1px 2px #fffc35"
                                                                            uncheckedIcon={
                                                                                <div style={{ paddingTop: 10, marginLeft: -10 }}>
                                                                                    <b style={{ color: 'white' }} >Inactive</b>
                                                                                </div>
                                                                            }
                                                                            checkedIcon={
                                                                                <div style={{ paddingTop: 10 ,marginLeft: 5  }}>
                                                                                    <b style={{ color: 'white' }}>Active</b>
                                                                                </div>
                                                                            }
                                                                            className="react-switch"
                                                                            id="small-radius-switch"
                                                                        />
                                                                    </td> */}
                                                                    <td style={{ textAlign: 'start' }}><span onClick={() => handleOpen(index, "Edit")}><img src="images/common/edit.svg" style={{ width: '18px', height: '18px' }} alt="" /></span></td>
                                                                    {/*{(getUser.user.role !== "Contributor") ? <td style={{ textAlign: 'start' }}><span onClick={() => handleOpen(index, "Delete")}><img src="images/common/delete.svg" style={{ width: '18px', height: '18px' }} alt="" /></span></td> : null} */}
                                                                    {/* <td style={{width:'8px'}}><button style={{ backgroundColor: 'transparent',border:"0", width:'5px',padding:"0"}} type="button" > <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={(event) => handleOpen(index, "UserChat")} /></button></td> */}
                                                                    {/* <td style={{ width: '8px' }}>
                                                                        <button type="button" style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0", marginLeft: '15px' }} >
                                                                            {
                                                                                getMessagesCount(index, state.allMessages, employee)
                                                                            }
                                                                        </button>
                                                                    </td> */}
                                                                </tr>
                                                            )
                                                        }) : null}
                                                </tbody>
                                            </table>
                                        </div>
                                        : null}
                                    {/* {
                                        open.action === "Delete" ? <DeleteEmployee open={open.status} handleClose={handleClose} data={info} handleModalClose={handleModalClose}
                                        /> : null
                                    }*/}
                                    {
                                        open.action === "Edit" ? <EditAccount open={open.status} handleClose={handleClose} data={info} handleModalClose={handleModalClose}
                                        /> : null
                                    } 
                                    {
                                        open.action === "UserChat" ? <UserChat open={open.status} handleClose={handleClose} data={info} handleModalClose={handleModalClose}
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