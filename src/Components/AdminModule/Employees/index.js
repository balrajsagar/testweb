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
import { CHAT } from '../../Common/Headers';

export default function Employees() {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(empReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [info,setInfo] = useState();
    const [seconds, setSeconds] = useState(30);

    useEffect(() => {
        getEmployees(dispatch, getUser.user);
        getAllMessages(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [])
    // console.log(state.allMessages)
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
    setTimeout(() => {
        if (seconds > 0) {
            setSeconds(seconds - 1)
            // console.log("check0"+seconds)
        }
        if (seconds === 0) {
            getEmployees(dispatch, getUser.user);
            getAllMessages(dispatch, getUser.user);

            setSeconds(15)
            } else {
                setSeconds(seconds-1)
            }
    }, 1000);
    const handleOpen = (index,action) => {
        if(action === "Add"){
            setOpen({ status: true, action:action });
        }else{
        setOpen({ status: true, index: index,action:action });
        var info= {id :state.employees[index].id ,
            employeeId :state.employees[index].employeeId ,
            name :state.employees[index].name,action:action,
            designation:state.employees[index].designation,
            email:state.employees[index].email,
            mobile:state.employees[index].mobileNumber,
            userType:state.employees[index].role,
            team :state.employees[index].team,
            reportingManager : state.employees[index].reportingManager,
            functionalManager: state.employees[index].functionalManager,
            userName:state.employees[index].userName,
            userStatus:state.employees[index].workingStatus}
        setInfo(info)
        }
    };
    const handleClose = () => {
        // state.employees=[];
        setOpen({ status: false, index: 0 });
        getEmployees(dispatch, getUser.user);
        // window.location.reload();
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
    }

    const getMessagesCount = (data, msg, emp) => {
      
        const msgCount = msg.filter(message => message.sendBy === emp.id).map((messages, i) => {
            return i
        })

        return (
            <i>
                {msgCount.length > 0 ? msgCount.length : null}
                {
                    msgCount.length > 0 ?
                        <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px', backgroundColor: 'green' }} onClick={(event) => handleOpen(data, "UserChat")} />
                        :
                        <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px' }} onClick={(event) => handleOpen(data, "UserChat")} />

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
                                        <h4 className="card-title">Agile Squad</h4>
                                        <div className="d-flex justify-content-end mb-0">
                                            <button onClick={() => handleOpen("","Add")} style={{ backgroundColor: 'transparent', border: '0' }} type="button" > <img src="images/common/adduser.svg" alt="logo" style={{ width: '20px', height: '20px' }} /><span className="m-1">Add Squad Member</span></button>
                                            {
                                        open.action === "Add" ? <AddEmployee open={open.status} handleClose={handleClose} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                        </div>
                                    </div>
                                    { state.employees.length !== 0 ?
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
                                                        <th >Squad Member ID</th>
                                                        <th style={{textTransform:"capitalize", width:'160px'}} >Squad Member Name</th>
                                                        <th>Username/Email</th>
                                                        {/* <th>Email</th> */}
                                                        <th>Contact</th>
                                                        <th>Role</th>
                                                        <th>Working Status</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                        <th>Chat</th>
                                                    </tr>
                                                </thead>
                                                    <tbody>
                                                        {
                                                            state.employees.length !== 0 ? state.employees.map((employee, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        {/* <td >{index+1}</td> */}
                                                                        <td style={{textAlign:'start'}}>{employee.id}</td>
                                                                        <td style={{textTransform:"capitalize", width:'160px'}}><Link to={{ pathname: '/empInfo', state: { id: state.employees[index].id, name:state.employees[index].name, designation:state.employees[index].designation ,role: state.employees[index].role} }} style={{ color: 'blue',fontWeight:'bold' ,}}>{employee.name}</Link></td>
                                                                        <td >{employee.userName}</td>
                                                                        {/* <td>{employee.email}</td> */}
                                                                        <td style={{textAlign:'start'}}>{employee.mobileNumber}</td>
                                                                        <td style={{textTransform:"capitalize"}}>{ employee.role }</td>
                                                                        {/* <td style={{textAlign:'center'}}>
                                                                            {(employee.empStatus === "Available" || employee.empStatus === "available") ? <span className="badge badge-pill badge-success" style={{width:'100px'}}>{employee.empStatus}</span> :
                                                                                employee.empStatus === "Not_Available" ? <span className="badge badge-pill badge-info " style={{width:'100px'}}>{employee.empStatus}</span> :
                                                                                    employee.empStatus === "Busy" ? <span className="badge badge-pill badge-danger " style={{width:'100px'}}>{employee.empStatus}</span> :
                                                                                        employee.empStatus === "Lunch" ? <span className="badge badge-pill badge-danger " style={{width:'100px'}}>{employee.empStatus}</span> :
                                                                                            <span className="badge badge-pill badge-info " style={{width:'100px'}}>{employee.empStatus}</span>}
                                                                        </td> */}
                                                                        <td style={{textAlign:'center'}}>
                                                                            {(employee.workingStatus === "Active") ? <span className="badge badge-pill badge-success" style={{width:'100px'}}>Active</span> :
                                                                             <span className="badge badge-pill badge-danger " style={{width:'100px'}}>Inactive</span>}
                                                                        </td>
                                                                        <td style={{textAlign:'start'}}><span  onClick={()=>handleOpen(index,"Edit")}><img src="images/common/edit.svg"  style={{ width: '18px', height: '18px' }} alt=""/></span></td>
                                                                        <td style={{textAlign:'start'}}><span  onClick={()=>handleOpen(index,"Delete")}><img src="images/common/delete.svg"  style={{ width: '18px', height: '18px' }} alt=""/></span></td>
                                                                        {/* <td style={{width:'8px'}}><button style={{ backgroundColor: 'transparent',border:"0", width:'5px',padding:"0"}} type="button" > <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={(event) => handleOpen(index, "UserChat")} /></button></td> */}
                                                                        <td style={{ width: '8px' }}>
                                                                        <button type="button" style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0" }} >
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
                                    : <div className="justify-content-between row" > <h4 className="card-title mr-2 text-warning">No Employees Record Found</h4></div> }
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