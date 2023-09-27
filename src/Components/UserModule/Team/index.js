import React, { useEffect, useReducer, useState } from 'react';
// import { MDBTable } from 'mdbreact';
import $ from 'jquery';
import { getEmployees, getAllMessages } from './network';
import { useSelector } from 'react-redux';
import { empReducer, initialState } from './empReducer';
// import RootLoader from '../../Common/Loader/RootLoader';
import Header from '../../Common/TopNav';
import AdminSideBar from '../Utility/SideNav';
import DeleteEmployee from './deleteEmpModal';
import AddEmployee from './addEmployee';
import EditEmployee from './editEmployee';
import { Link } from 'react-router-dom';
import UserChat from '../../Common/UserChat';
import Switch from "react-switch";
import { activeEmployee, deActiveEmployee } from '../Team/network'
import { setToken } from '../../Common/LocalStorage';
import { USER_STATUS, LIMITED_ACCESS_CONTRIBUTOR, DELETE, CONTRIBUTOR, CHAT, ADD_SQUAD_MEMBER, AGILE_SQUAD, SQUAD_MEMBER_NAME, USERNAME_EMAIL, CONTACT, ROLE, SHIFT_TIMINGS, WORKING_STATUS, AGILE_EDIT } from '../../Common/Headers'
import { role_array } from '../../Common/getDefaultRoles';

export default function Teams() {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(empReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [info, setInfo] = useState();
    useEffect(() => {
        getEmployees(dispatch, getUser.user);
        getAllMessages(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        const timer = setInterval(() => {
            getEmployees(dispatch, getUser.user);
            getAllMessages(dispatch, getUser.user);
        }, 60 * 1000);
        return () => {
            clearInterval(timer); // Return a function to clear the timer so that it will stop being called on unmount
        }
        // eslint-disable-next-line     
    }, []);
    useEffect(() => {
        if (state.employees.length > 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                })
            })
        }
    }, [state.employees])


    const handleOpen = (index, action, sno) => {
        if (action === "Add") {
            setOpen({ status: true, action: action });
        } else {
            setOpen({ status: true, index: index, action: action });
            // eslint-disable-next-line
            var info = {
                id: state.employees[index].id,
                employeeId: state.employees[index].employeeId,
                name: state.employees[index].name, action: action,
                designation: state.employees[index].designation,
                email: state.employees[index].email,
                mobile: state.employees[index].mobileNumber,
                userType: state.employees[index].role,
                team: state.employees[index].team,
                reportingManager: state.employees[index].reportingManager,
                functionalManager: state.employees[index].functionalManager,
                userName: state.employees[index].userName,
                userStatus: state.employees[index].workingStatus,
                device_id: state.employees[index].device_id,
                player_id: state.employees[index].player_id,
                sno: sno
            }
            setInfo(info)
        }
    };
    const handleClose = () => {
        // state.employees=[];
        setOpen({ status: false, index: 0 });
        getEmployees(dispatch, getUser.user);
        getAllMessages(dispatch, getUser.user);
        // window.location.reload();
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
        getAllMessages(dispatch, getUser.user);
    }

    function getvalues(id, name, designation, role) {

        setToken('kudo_id', id)
        setToken('kudo_name', name)
        setToken('kudo_designation', designation)
        setToken('kudo_role', role)

    }

    

    const getMessagesCount = (data, msg, emp) => {
        const msgCount = msg.filter(message => message.sendBy === emp.id).map((messages, i) => {
            // eslint-disable-next-line
            return i, messages
        })

        return (
            <i>
                {/* {msgCount.length > 0 ? msgCount.length : null} */}
                {
                    msgCount.length > 0 ?
                        <div className="row">
                            <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px' }}
                                onClick={(event) => handleOpen(data, "UserChat", msgCount)} />
                            <span style={{ color: 'red', fontWeight: "bold", marginLeft: "-2px" }}>{msgCount.length}</span>
                        </div>
                        :
                        <div className="row">
                            <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px' }}
                                onClick={(event) => handleOpen(data, "UserChat", msgCount)} />
                        </div>
                }
            </i>
        )
    }


    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <AdminSideBar />
                <div className="main-panel">
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="justify-content-between row">
                                        <h4 className="card-title" style={{ paddingLeft: 10, paddingTop: 10 }}>{AGILE_SQUAD}</h4>
                                        <div className="d-flex justify-content-end mb-0">
                                            {(role_array[getUser.user.role] !== LIMITED_ACCESS_CONTRIBUTOR) &&
                                                <button onClick={() => handleOpen("", "Add")} style={{ backgroundColor: 'transparent', border: '0' }} type="button" > <img src="images/common/adduser.svg" title={ADD_SQUAD_MEMBER} alt="logo" style={{ width: '25px', height: '25px' }} /><span className="m-1">{ADD_SQUAD_MEMBER}</span></button>
                                            }
                                            {
                                                open.action === "Add" ? <AddEmployee open={open.status} handleClose={handleClose} handleModalClose={handleModalClose}
                                                /> : null
                                            }
                                        </div>
                                    </div>
                                    {state.employees.length !== 0 ?
                                        <div className="table-responsive">

                                            {/* <MDBTable> */}
                                            <table
                                                search="true"
                                                id="example" className="table table-striped table-bordered"
                                                data-pagination="true"
                                            >
                                                <thead style={{ backgroundColor: '#F4FAF7' }}>
                                                    <tr>
                                                        {/* <th></th> */}
                                                        {/* <th >Squad Member ID</th> */}
                                                        <th style={{ textTransform: "capitalize", width: '160px' }} >{SQUAD_MEMBER_NAME}</th>
                                                        <th>{USERNAME_EMAIL}</th>
                                                        {/* <th>Email</th> */}
                                                        <th>{CONTACT}</th>
                                                        <th>{ROLE}</th>
                                                        <th>{SHIFT_TIMINGS}</th>
                                                        <th>{WORKING_STATUS}</th>
                                                        <th>{USER_STATUS}</th>
                                                        {(role_array[getUser.user.role] !== LIMITED_ACCESS_CONTRIBUTOR && role_array[getUser.user.role] !== CONTRIBUTOR) ? <th style={{ width: '20px' }}>{AGILE_EDIT}</th> : null}
                                                        {(role_array[getUser.user.role] !== CONTRIBUTOR && role_array[getUser.user.role] !== LIMITED_ACCESS_CONTRIBUTOR) ? <th style={{ width: '20px' }}>{DELETE}</th> : null}
                                                        <th style={{ width: '20px' }}>{CHAT}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        state.employees.length !== 0 ? state.employees.map((employee, index) => {
                                                            const input = employee.name;
                                                            const [name] = input.split('@');
                                                            // console.log(extension)
                                                            return (
                                                                <tr key={index}>
                                                                    {/* <td >{index+1}</td> */}
                                                                    {/* <td style={{textAlign:'start'}}>{employee.id}</td> */}
                                                                    {role_array[getUser.user.role] !== CONTRIBUTOR ? <td><Link onClick={() => { getvalues(employee.id, employee.name, employee.designation, employee.role) }} to={{ pathname: '/empTrack' }} style={{ color: 'blue', fontWeight: 'bold', textTransform: "capitalize" }}>{name}</Link></td>
                                                                        : <td style={{ textTransform: "capitalize" }}>{name}</td>}                                                                        <td >{employee.userName}</td>
                                                                    {/* <td>{employee.email}</td> */}
                                                                    <td style={{ textAlign: 'start' }}>{employee.mobileNumber}</td>
                                                                    <td style={{ textTransform: "capitalize" }}>{role_array[employee.role]}</td>
                                                                    <td style={{ textAlign: 'center' }}>{employee.shift_hours}</td>
                                                                    {/* <td style={{textAlign:'center'}}>
                                                                            {(employee.empStatus === "Available" || employee.empStatus === "available") ? <span className="badge badge-pill badge-success" style={{width:'100px'}}>{employee.empStatus}</span> :
                                                                                employee.empStatus === "Not_Available" ? <span className="badge badge-pill badge-info " style={{width:'100px'}}>{employee.empStatus}</span> :
                                                                                    employee.empStatus === "Busy" ? <span className="badge badge-pill badge-danger " style={{width:'100px'}}>{employee.empStatus}</span> :
                                                                                        employee.empStatus === "Lunch" ? <span className="badge badge-pill badge-danger " style={{width:'100px'}}>{employee.empStatus}</span> :
                                                                                            <span className="badge badge-pill badge-info " style={{width:'100px'}}>{employee.empStatus}</span>}
                                                                        </td> */}
                                                                    <td>{employee.empStatus}</td>
                                                                    <td style={{ textAlign: 'center' }}>
                                                                        <Switch
                                                                            checked={(employee.workingStatus === "Active") ? true : false}
                                                                            // onChange={() => handleOpen(index, "Delete")}
                                                                            onChange={() => (employee.workingStatus === "Active") ? deActiveEmployee(dispatch, getUser.user, employee.id, employee.email, handleClose, handleModalClose) : activeEmployee(dispatch, getUser.user, employee.id, employee.email, handleClose, handleModalClose)}
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
                                                                                <div style={{ paddingTop: 10, marginLeft: 5 }}>
                                                                                    <b style={{ color: 'white' }}>Active</b>
                                                                                </div>
                                                                            }
                                                                            className="react-switch"
                                                                            id="small-radius-switch"
                                                                        />
                                                                        {/* {(employee.workingStatus === "Active") ? <span className="badge badge-pill badge-success" style={{ width: '100px' }}>Active</span> :
                                                                            <span className="badge badge-pill badge-danger " style={{ width: '100px' }}>Inactive</span>} */}
                                                                    </td>
                                                                    {(role_array[getUser.user.role] !== LIMITED_ACCESS_CONTRIBUTOR && role_array[getUser.user.role] !== CONTRIBUTOR) ? <td style={{ textAlign: 'start' }}><span onClick={() => handleOpen(index, "Edit")}><img src="images/common/edit.svg" style={{ width: '18px', height: '18px' }} title={AGILE_EDIT} alt="" /></span></td> : null}
                                                                    {(role_array[getUser.user.role] !== CONTRIBUTOR && role_array[getUser.user.role] !== LIMITED_ACCESS_CONTRIBUTOR) ? <td style={{ textAlign: 'start' }}><span onClick={() => handleOpen(index, "Delete")}><img src="images/common/delete.svg" style={{ width: '18px', height: '18px' }} title={DELETE} alt="" /></span></td> : null}
                                                                    {/* <td style={{width:'8px'}}><button style={{ backgroundColor: 'transparent',border:"0", width:'5px',padding:"0"}} type="button" > <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={(event) => handleOpen(index, "UserChat")} /></button></td> */}
                                                                    <td style={{ width: '8px' }}>
                                                                        <button type="button" style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0", marginLeft: '15px' }} >
                                                                            {
                                                                                getMessagesCount(index, state.allMessages, employee)
                                                                            }
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }) : null}
                                                </tbody>
                                            </table>
                                            {/* </MDBTable> */}
                                        </div>
                                        : null}
                                    {/* : <div className="justify-content-between row" > <h4 className="card-title mr-2 text-warning">No Employees Record Found</h4></div> } */}
                                    {
                                        open.action === "Delete" ? <DeleteEmployee open={open.status} handleClose={handleClose} data={info} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "Edit" ? <EditEmployee open={open.status} handleClose={handleClose} data={info} handleModalClose={handleModalClose}
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