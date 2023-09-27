/*
FileName: UserModule/TopNav/index.js
Purpose : Top Nav for Getting the Squads List, Status,User profile and Logout
Developers: Naveen Kumar Gade --> GNK
Changes : 01-->GNK
*/
import React, { useState, useEffect, useReducer } from 'react';
import { setCurrentUser } from '../../../Common/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { logoutUser } from '../../../Common/Actions';
import { getStatus, setStatus, getRoleCount, getToken, clearToken } from '../../../Common/LocalStorage';
import API from '../../../Common/Network/API';
import { serverCheck } from '../../../Maintenance/UnderMaintenance/network';
import { maintenanceReducer, serverInitialState } from '../../../Maintenance/UnderMaintenance/maintenanceReducer';
import { IMG_SRC, VERSION, VERSION_DATE, MESSAGES, CONSOLIDATED_TODO, PAYEMENT, CALENDAR, CHAT, TODO, SUPPORT } from '../../../Common/Headers';
import UserChat from '../../../Common/AdminChat';
import SquadChat from '../../SquadChat';
import { getAllMessages, getAdmin } from './network';
import { empReducer, initialState } from './reducer';
import jwt_decode from "jwt-decode";
import store from '../../../Common/Store';
import axios from 'axios';


export default function TopNavWithOutProject() {
  const dispatch = useDispatch();
  const getUser = useSelector(state => state.auth)
  const [userStatus, UpdateUserStatus] = useState(getUser.user.empStatus);
  const [statusList, updateStatusList] = useState([])
  const [redirect, setRedirect] = useState(false);
  const [state, dispatch1] = useReducer(maintenanceReducer, serverInitialState)
  const [open, setOpen] = useState({ status: false, index: 0 })
  const [info, setInfo] = useState();
  // eslint-disable-next-line
  const [data, setData] = useReducer(empReducer, initialState)
  const checkToken = () => {
    if (getToken('auth')) {
      const tokenDetails = jwt_decode(getToken('auth'));
      store.dispatch(setCurrentUser(tokenDetails.data)); //store the user information
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (tokenDetails.exp < currentTime) {
        localStorage.removeItem('auth');
        // Remove auth header for future requests
        delete axios.defaults.headers.common['x-access-token'];
        // Set current user to empty object {} which will set isAuthenticated to false
        clearToken();
        localStorage.removeItem('persist:main-root');
        store.dispatch(setCurrentUser({}));
        window.location.href = "/";
      }
    }
  }

  useEffect(() => {
    if(IMG_SRC === undefined){
      window.location.reload()
    }
  },[IMG_SRC])

  const onLogout = () => {
    dispatch(logoutUser);
    setRedirect(true)
  }
  useEffect(() => {
    checkToken()
    serverCheck(dispatch1)
    getStatusOfEmployee();
    getAdmin(setData, getUser)
    getAllMessages(setData, getUser.user)
    // eslint-disable-next-line
  }, [])
  // console.log(getUser.user)
  // console.log("admin details", data.adminDetails[0])
  // console.log("data messages",data.allMessages)
  const handleClose = () => {
    setOpen({ status: false, index: 0 });
    getAllMessages(setData, getUser.user)
  };
  const handleModalClose = () => {
    setOpen({ status: false, index: 0 });
    getAllMessages(setData, getUser.user)
  }
  if (redirect) {
    if ((getRoleCount('roleCount') >= 1)) {
      window.location.reload();
    } else {
      return <Redirect to="/" />
    }
  }
  //For Redirecting Maintenance Page 
  if (state.server.value === "not connected" || state.server.value === "Network Error") {
    // console.log(JSON.stringify(state.server.value))
    return <Redirect to="/UnderMaintenance" />
  }

  const getStatusOfEmployee = async () => {
    // console.log(getUser.user.corp)
    try {
      var response = await API.post("user_status.php", {
        "corp": getUser.user.corp,
        "action": 'status',
      }, {}, false);
      if (response.status === 'True') {
        updateStatusList(response.data)
      } else {
        updateStatusList([])
      }
    } catch (error) {
      // Alert('error',error.message)
    }
  }
  //Update the Status of Employee
  const UserStatus = async (status) => {
    // dispatch(isLoading());
    try {
      const response = await API.post("user_status.php", {
        corp: getUser.user.corp,
        action: 'update_status',
        status: status,
        empId: getUser.user.empId
      }, {}, false);
      if (response.status === 'True') {
        setStatus('status', status)
        UpdateUserStatus(status)
        getUser.user.empStatus = status
        dispatch(setCurrentUser(getUser.user));
      } else {
        UpdateUserStatus(getStatus('status'))
      }
    } catch (error) {
      // Alert('error',error.message)
    }
    // dispatch(isLoaded());
  }

  const handleOpen = (action, data, sno) => {
    if (action === "UserChat") {
      setOpen({ status: true, index: data, action: action });
      // eslint-disable-next-line
      var info = {
        id: data.id,
        employeeId: data.employeeId,
        name: data.name,
        action: action,
        designation: data.designation,
        email: data.email,
        mobile: data.mobileNumber,
        userType: data.role,
        team: data.team,
        reportingManager: data.reportingManager,
        functionalManager: data.functionalManager,
        userName: data.userName,
        userStatus: data.workingStatus,
        device_id: data.device_id,
        sno: sno
      }
      setInfo(info)
    } else if (action === "SquadChat") {
      setOpen({ status: true, index: data, action: action });
    }
  };

  // eslint-disable-next-line
  const getMessagesCount = (msg, emp) => {
    console.log(msg)
    console.log(emp)
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
              <img src="images/common/chat.svg" title={MESSAGES} alt="logo" style={{ width: '50px', height: '27px', marginTop: '29px' }}
                onClick={(event) => handleOpen("UserChat", emp, msgCount)} />
              <span style={{ color: 'red', fontWeight: "bold", marginLeft: "25px", marginTop: "-29px" }}>{msgCount.length}</span>
            </div>
            :
            <div className="row">
              <img src="images/common/chat.svg" title={MESSAGES} alt="logo" style={{ width: '50px', height: '27px', marginTop: '29px' }}
                onClick={(event) => handleOpen("UserChat", emp, msgCount)} />
            </div>
        }
      </i>
    )
  }


  return (
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="navbar-brand-wrapper d-flex justify-content-center">
        <div className="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">
          <a className="navbar-brand brand-logo" href="/"><img src={IMG_SRC} alt="logo" /></a>
          <p className="navbar-brand brand-logo pt-3" style={{ fontSize: '10px', paddingRight: '0px', }}>{VERSION} <br />{VERSION_DATE}</p>
          <a className="navbar-brand brand-logo-mini" href="/"><img src={IMG_SRC} alt="logo" /></a>
          <button className="navbar-toggler align-self-center" type="button" data-toggle="minimize">
            <span className="mdi mdi-sort-variant"></span>
          </button>
        </div>
      </div>
      <div className="navbar-menu-wrapper d-flex  justify-content-end">



        <ul className="navbar-nav navbar-nav-right">

          {/* <li className=" nav-item nav-profile dropdown show">
          <button type="button" title={CONSOLIDATED_TODO} style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "2", marginLeft: '10px' }}>
            <Link to={{ pathname: "/dashboard/todo" }} style={{ textDecorationStyle: "none", marginLeft: "-50px", color: "black" }}>{TODO}
                    <img src="images/common/todo.png"  alt="logo" style={{ width: '35px', height: '35px', marginTop: '0px' }}
                    />
           </Link>
        </button>
        </li> */}
          <li className=" nav-item nav-profile dropdown show">
            <button type="button" title={CONSOLIDATED_TODO} style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "2", marginLeft: '10px' }}>
              <Link to={{ pathname: "/dashboard/todo" }} >
                <img src="images/common/todo.png" alt="logo" style={{ width: '35px', height: '35px', marginTop: '0px' }}
                />
              </Link>
              <p style={{ marginTop: "-5px" }}>{TODO}</p>
            </button>
            <button type="button" title={MESSAGES} style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "2", marginLeft: '10px' }} >
              {data.allMessages.length > 0 ?
                <div className="row">
                  <Link to={{ pathname: "/squadChat" }}>
                    <img src="images/common/chat.svg" alt="logo" style={{ width: '47px', height: '27px', marginTop: '2px' }}
                    /><span style={{ color: 'red', fontWeight: "bold", marginLeft: "-10px", marginTop: "-29px" }}>{data.allMessages.length}</span>
                  </Link>
                </div> :
                <div className="row">
                  <Link to={{ pathname: "/squadChat" }} >
                    <img src="images/common/chat.svg" alt="logo" style={{ width: '47px', height: '27px', marginTop: '2px' }}
                    /></Link>
                </div>
              }
              <p>{CHAT}</p>
            </button>
            <button type="button" title={CALENDAR} style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "2", marginLeft: '10px' }}>
              <Link to={{ pathname: "/calendarDash" }} >
                <img src="images/common/calender.jpeg" alt="logo" style={{ width: '24px', height: '24px', marginTop: '5px', marginLeft: "7px" }}
                />
              </Link>
              <p>{CALENDAR}</p>
            </button>
            {/* <button type="button" title={SUPPORT} style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "2", marginLeft: '18px' }}>
              <Link to={{ pathname: "/reportBugUser" }} >
                <img src="images/common/supp.png" alt="logo" style={{ width: '27px', height: '27px', marginTop: '6px', marginLeft: "7px" }}
                />
              </Link>
              <p style={{ marginTop: "-3px" }}>{SUPPORT}</p>
            </button> */}
          </li>
          <li className=" nav-item nav-profile dropdown show">
            {/* eslint-disable-next-line */}
            <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src="images/common/supp.png" alt="logo" style={{ width: '27px', height: '27px', marginTop: '6px', marginLeft: "7px" }}
              />
              <p style={{ marginTop: "-3px" }}>{SUPPORT}</p>
            </a>
            <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="dropdownMenuLink">
              {/* <a  onClick={() => UserStatus(list.value)}>{list.value}</a> */}
              <Link className="dropdown-item" to={{ pathname: "/reportBugUser" }} >
                Report bug
              </Link>
              <Link className="dropdown-item" to={{ pathname: "/userFaqs" }} >
                FAQs
              </Link>
            </div>
          </li>
          {/* <li className=" nav-item nav-profile dropdown show">
          <button type="button" title={CALENDAR} style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "2", marginLeft: '10px' }}>
            <Link to={{ pathname: "/calendarDash" }} style={{ textDecorationStyle: "none", marginLeft: "-65px", color: "black" }}>{CALENDAR}
                    <img src="images/common/calender.jpeg"  alt="logo" style={{ width: '24px', height: '24px', marginTop: '0px', marginLeft:"7px" }}
                    />
           </Link>
        </button>
        </li> */}
          {
            open.action === "SquadChat" ? <SquadChat open={open.status} handleClose={handleClose} data={info} handleModalClose={handleModalClose}
            /> : null
          }
          {
            open.action === "UserChat" ? <UserChat open={open.status} handleClose={handleClose} data={info} handleModalClose={handleModalClose}
            /> : null
          }
          <li className=" nav-item nav-profile dropdown show">
            <span className="text-black mr-2">Status</span>
            {/* eslint-disable-next-line */}
            <a style={{ border: '2px solid grey', borderRadius: '30px' }} className="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="text-black">{userStatus}</span>
            </a>

            <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="dropdownMenuLink">
              {statusList !== [] ? statusList.map((list, index) => {
                return (
                  // eslint-disable-next-line 
                  <a className="dropdown-item" key={index} onClick={() => UserStatus(list.value)}>{list.value}</a>

                )
              }) : null}
            </div>
          </li>


          <li className="nav-item nav-profile dropdown">
            {/* {getUser.user.email_status === '1' ? <span className="text-success mr-3 ">{VERIFIED_ACCOUNT} </span>:<span className="text-danger mr-3">{NOT_VERIFIED_ACCOUNT}</span>} */}
            {/* eslint-disable-next-line */}
            <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
              <img src="images/common/user1.svg" alt="profile" />
              <span className="nav-profile-name">{getUser.user.fullName}</span>
              {/* {getUser.user.email_status === '1' ?  <span className='text-success' title={VERIFIED_ACCOUNT} style={{marginTop:'10px',fontSize:'20px',fontWeight:'bold'}}>☑</span> : null} */}
            </a>
            <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
              {/* eslint-disable-next-line */}
              <Link className="dropdown-item" to={{ pathname: "/userProfile" }}>
                <i className="mdi mdi-account text-primary"></i>
                Profile
              </Link>
              <Link className="dropdown-item" to={{ pathname: "/payement" }}>
                <i className="mdi mdi-paypal text-primary"></i>
                {PAYEMENT}
              </Link>
              <Link className="dropdown-item" to={{ pathname: "/changePasswordUser" }}>
                <i className="mdi mdi-security text-primary"></i>
                Change Password
              </Link>
              {/* eslint-disable-next-line */}
              <a className="dropdown-item" onClick={onLogout}>
                <i className="mdi mdi-logout text-primary"></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
          <span className="mdi mdi-menu"></span>
        </button>
      </div>
    </nav>
  )

}
