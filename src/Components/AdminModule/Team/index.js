import React, { useEffect, useReducer, useState } from 'react';
import $ from 'jquery';
import { getEmployees, getAllMessages } from './network';
import { useSelector } from 'react-redux';
import { empReducer, initialState } from './empReducer';
// import RootLoader from '../../Common/Loader/RootLoader';
import AdminTopNav from '../Utility/TopNav';
import AdminSideBar from '../Utility/SideNav';
// import DeleteEmployee from './deleteEmpModal';
// import AddEmployee from './addEmployee';
// import EditEmployee from './editEmployee';
// import { Link } from 'react-router-dom';
import UserChat from '../../Common/SquadChat';
import Switch from "react-switch";
import { activeEmployee, deActiveEmployee } from '../Team/network'
import API from '../../Common/Network/API';
import Alert from '../../Common/Alert';
import Select from 'react-select';
import {AGILE_SQUAD,CHAT,USERNAME_EMAIL,CONTACT,SQUAD_MEMBER_NAME,SHIFT_TIMINGS,USER_STATUS,WORKING_STATUS} from '../../Common/Headers'


export default function AgileSquad() {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(empReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [info, setInfo] = useState();
    const [shifts, updateShifts] = useState([]);

    useEffect(() => {
        getEmployees(dispatch, getUser.user);
        getAllMessages(dispatch, getUser.user);
        getShifts();
        // eslint-disable-next-line
    }, [])
    const sortedOne = (msg,emp) =>{
        const sortedUserIds = msg 
          .sort()
           .map(m => m.sendBy)
          .filter(m => m.sendBy !== null)

    const sortedUsers = [...new Set(sortedUserIds)].map(id => emp.find(u => u.id === id))

    const namesToDeleteSet = new Set(sortedUsers);

   const newArr = emp.filter((employee) => {
  return !namesToDeleteSet.has(employee);
    });
//    const sortedEmployees = [...sortedUsers,...newArr]
   const sortedEmployees = sortedUsers.concat(newArr)
   return sortedEmployees;

    }
    const empSorted = sortedOne(state.allMessages,state.employees);
    // console.log("sorted",empSorted)

    const getShifts = async () => {
        try {
            const response = await API.post("get_user_shifts.php", { action: "get_shifts" }, {}, false);
            var shift_times = [];
            if (response.status === 'True') {
                response.data.map((shift) => {
                    return shift_times.push({ value: shift.ts_id, label: shift.start_time + " - " + shift.end_time + " " + shift.time_zone })
                })
                updateShifts(shift_times)
            }
        } catch (error) {
        }
    }
    const selectSprint = async (selectedOption,index) => {
        try {
            const response = await API.post("get_user_shifts.php",
                {
                    action: "update_user_shift",
                    emp_id: empSorted[index].id,
                    shift_id: selectedOption.value
                }, {}, false);
            if (response.status === 'True') {
                Alert('success', response.message);
            }
        } catch (error) {
            Alert('error', error.message);
        }
    }
    useEffect(() => {
        const timer = setInterval(() => { 
        getEmployees(dispatch, getUser.user);
        getAllMessages(dispatch, getUser.user);
     }, 60 * 1000);
      return () => {
        clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
      }
        // eslint-disable-next-line     
    }, []);
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
                employeeId: empSorted[index].employeeId,
                name: empSorted[index].name, action: action,
                designation: empSorted[index].designation,
                email: empSorted[index].email,
                mobile: empSorted[index].mobileNumber,
                userType: empSorted[index].role,
                team: empSorted[index].team,
                reportingManager: empSorted[index].reportingManager,
                functionalManager: empSorted[index].functionalManager,
                userName: empSorted[index].userName,
                userStatus: empSorted[index].workingStatus,
                device_id: empSorted[index].device_id,
                player_id: empSorted[index].player_id,
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

    const getMessagesCount = (data, msg, emp) => {

        const msgCount = msg.filter(message => message.sendBy === emp.id).map((messages, i) => {
            // eslint-disable-next-line
            return i,messages
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
            <AdminTopNav />
            <div className="container-fluid page-body-wrapper">
                <AdminSideBar />
                <div className="main-panel">
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="justify-content-between row">
                                        <h4 className="card-title">{AGILE_SQUAD}</h4>
                                        <div className="d-flex justify-content-end mb-0">
                                            {/* <button onClick={() => handleOpen("", "Add")} style={{ backgroundColor: 'transparent', border: '0' }} type="button" > <img src="images/common/adduser.svg" alt="logo" style={{ width: '25px', height: '25px' }} /><span className="m-1">Add Squad Member</span></button>
                                            {
                                                open.action === "Add" ? <AddEmployee open={open.status} handleClose={handleClose} handleModalClose={handleModalClose}
                                                /> : null
                                            } */}
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
                                                        <th style={{ textTransform: "capitalize", width: '160px' }} >{SQUAD_MEMBER_NAME}</th>
                                                        <th>{USERNAME_EMAIL}</th>
                                                        <th>{CONTACT}</th>
                                                        <th>{SHIFT_TIMINGS}</th>
                                                        <th>{WORKING_STATUS}</th>
                                                        <th>{USER_STATUS}</th>
                                                        {/* {(getUser.user.role !== "Contributor") ? <th style={{ width: '20px' }}>Edit</th> : null}
                                                        {(getUser.user.role !== "Contributor") ? <th style={{ width: '20px' }}>Delete</th> : null} */}
                                                        <th style={{ width: '20px' }}>{CHAT}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        empSorted.length !== 0 ? empSorted.map((employee, index) => {
                                                            const input = employee.name;
                                                            const [name] = input.split('@');
                                                            return (
                                                                <tr key={index}>
                                                                    <td style={{ textTransform: "capitalize" }}>{name}</td>                                                                      
                                                                    <td >{employee.userName}</td>
                                                                    <td style={{ textAlign: 'start' }}>{employee.mobileNumber}</td>
                                                                    <td style={{ textAlign: 'start',width:200 }}> 
                                                                        <Select
                                                                            style={{ width: 15, boarderRadius: 2 }}
                                                                            maxMenuHeight={150}
                                                                            placeholder={employee.shift_hours}
                                                                            onChange={(selectedOption) =>
                                                                                selectSprint(selectedOption,index)
                                                                            }
                                                                            options={shifts}
                                                                        />
                                                                    </td>
                                                                    <td style={{ textAlign: 'center',width:110 }}>{employee.empStatus}</td>
                                                                    <td style={{ textAlign: 'center' }}>
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
                                                                    </td>

                                                                    {/* {(getUser.user.role !== "Contributor") ? <td style={{ textAlign: 'start' }}><span onClick={() => handleOpen(index, "Edit")}><img src="images/common/edit.svg" style={{ width: '18px', height: '18px' }} alt="" /></span></td> : null}
                                                                    {(getUser.user.role !== "Contributor") ? <td style={{ textAlign: 'start' }}><span onClick={() => handleOpen(index, "Delete")}><img src="images/common/delete.svg" style={{ width: '18px', height: '18px' }} alt="" /></span></td> : null} */}
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
                                        </div>
                                        : null}
                                    {/* : <div className="justify-content-between row" > <h4 className="card-title mr-2 text-warning">No Employees Record Found</h4></div> } */}
                                    {/* {
                                        open.action === "Delete" ? <DeleteEmployee open={open.status} handleClose={handleClose} data={info} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "Edit" ? <EditEmployee open={open.status} handleClose={handleClose} data={info} handleModalClose={handleModalClose}
                                        /> : null
                                    } */}
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