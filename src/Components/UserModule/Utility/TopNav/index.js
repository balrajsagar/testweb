/*
FileName: UserModule/TopNav/index.js
Purpose : Top Nav for Getting the Squads List, Status,User profile and Logout
Developers: Naveen Kumar Gade --> GNK
Changes : 01-->GNK
*/
import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { logoutUser, setCurrentUser } from '../../../Common/Actions';
import { getStatus, setStatus, setToken, setRoleCount, getRoleCount } from '../../../Common/LocalStorage';
import API from '../../../Common/Network/API';
import jwt_decode from "jwt-decode";
import Alert from '../../../Common/Alert';
import store from '../../../Common/Store';
import { isLoading, isLoaded } from '../../../Common/Actions/loading';
import RootLoader from '../../../Common/Loader/RootLoader';
import { serverCheck } from '../../../Maintenance/UnderMaintenance/network';
import { maintenanceReducer, serverInitialState } from '../../../Maintenance/UnderMaintenance/maintenanceReducer';
import {IMG_SRC, VERSION, VERSION_DATE,AGILE_PROJECT_NAME,PROFILE,CHANGE_PASSWORD,LOGOUT,NEW_PROJECT} from '../../../Common/Headers';
import {  SUPPORT,    PAYEMENT, CALENDAR, CONSOLIDATED_TODO, MESSAGES, TODO, CHAT, } from '../../../Common/Headers';
import { getAdmin, getAllMessages } from './network';
import { empReducer, initialState } from './reducer';
// import ChatBot from '../../../Common/chatbot';

export default function TopNav() {
  const dispatch = useDispatch();
  const getUser = useSelector(state => state.auth)
  const loaderStatus = useSelector(state => state.loading.status)
  const [userStatus, UpdateUserStatus] = useState(getUser.user.empStatus);
  const [userSquad, UpdateUserSquad] = useState(getUser.user.corp);//Show the Squad Name
  const [userSquadList, UpdateUserSquadList] = useState([]) //Show the list of Squad Names Based on username
  const [statusList, updateStatusList] = useState([])
  const [redirect, setRedirect] = useState(false);
  const [squadName, updateSquadName] = useState('')
  const [show, updateShow] = useState(false)
  const [state, dispatch1] = useReducer(maintenanceReducer, serverInitialState)
  const [data, setData] = useReducer(empReducer, initialState)
  const onLogout = () => {
    dispatch(logoutUser);
    setRedirect(true)
  }
  useEffect(() => {
    serverCheck(dispatch1)
    getStatusOfEmployee();
    getSquadsList(getUser.user.empId); // GNK --> 01
    getAdmin(setData, getUser)
    getAllMessages(setData, getUser.user)
    // eslint-disable-next-line
  }, [])

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
        getUser.user.empStatus=status
        dispatch(setCurrentUser(getUser.user));
      } else {
        UpdateUserStatus(getStatus('status'))
      }
    } catch (error) {
      // Alert('error',error.message)
    }
    // dispatch(isLoaded());
  }
  // GNK --> start 01
  // Squads List Getting Based on UserName
  const getSquadsList = async (empId) => {
    try {
      var response = await API.post("squads.php", {
        empId: empId,
        action: "get_squads"
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
  //Squad Change (Shift the squad)
  const SquadChangeStatus = async (projectInfo) => {
    try {
      const response = await API.post("squad_login.php", {
        username: getUser.user.empId,
        project_id: projectInfo.id,
        corp: projectInfo.value,
      }, {}, false);
      if (response.status === 'TRUE') {
        setToken('auth', response.jwt) //store the token information  with exp
        const tokenDetails = jwt_decode(response.jwt);
        // console.log(tokenDetails.data)
        setRoleCount('roleCount', tokenDetails.data.roleCount)
        dispatch(setCurrentUser(tokenDetails.data)); //store the user information
        setStatus('status', tokenDetails.data.empStatus)
        setRedirect(true)
        UpdateUserSquad(squadName)
      } else {
        UpdateUserSquad(getUser.user.corp)
      }
    } catch (error) {
      // Alert('error',error.message)
      UpdateUserSquad(getUser.user.corp)
    }
    // dispatch(isLoaded());
  }
  // GNK --> End 01
  // Agile Project Validation GNK --->start 03
  const onValidate = () => {
    var validationRule = /^\S{3,}$/;
    if (squadName === "") {
      Alert('warning', "please give the project name")
    } else if (!validationRule.test(squadName)) {
      Alert('warning', " please do not use spaces, '.' and '-' in between words")
    } else if (squadName.length < 4 || squadName.length > 16) {
      Alert('warning', " project name should having length 4 to 15 characters")
    } else {
      return true
    }
  }
  // GNK --> End 03
  // Agile Project Creation GNK --->start 02
  const onProjectCreate = async () => {
    var user='admin@'
    var [,extension]=getUser.user.userName.split('@')
    store.dispatch(isLoading());
    if (onValidate()) { //Validate the project name
      try {
        const response = await API.post("squads.php", {
          adminUsername:user.concat(extension),
          extension:extension,
          username: getUser.user.userName,
          squadName: squadName,
          action: "new_squad",
          empId: getUser.user.empId
        }, {
        });
        if (response.status === "True") {
          Alert('success', response.message)
          setRedirect(true)
        } else {
          Alert('warning', response.message)
        }
      }
      catch (error) {
        Alert('error', error.message)
      }
    } else {
      // Alert('warning', "please give the project name")
    }
    updateShow(!show)
    store.dispatch(isLoaded());
  }
  // console.log("userSquad list",userSquadList)
  // console.log("squad", userSquad)
  // Agile Project Creation GNK --->End 02
  return (
    <div>
      {/* <ChatBot /> */}
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

         <ul className="navbar-nav navbar-nav-left">

            <li className=" nav-item nav-profile dropdown show" title={AGILE_PROJECT_NAME}>
            {/* {!show ?<span className="text-black mr-2">{AGILE_PROJECT_NAME}</span>:null} */}
              {/* eslint-disable-next-line */}
              <a style={{ border: '2px solid grey', borderRadius: '30px' }} className="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="text-black">{userSquad}</span>
              </a>
              <div className="dropdown-menu dropdown-menu-left navbar-dropdown" aria-labelledby="dropdownMenuLink">
                
                {/* {!show ? 
            <a className="dropdown-item" onClick={() => updateShow(!show)}>Add Project</a> :
          
          <div><input style={{ borderRadius: '30px', backgroundColor: 'white',marginTop:'12px' ,borderColor:'black',marginRight:'-50px'}}  type="text" className="form-control-sm " id="projectName" name="projectName" placeholder="Agile Project Name*" onChange={(event) => { updateSquadName(event.target.value)}} /> 
          <button style={{ backgroundColor: 'green',border:'0px',padding:'3px',textAlign:"center",color:"white",borderRadius: '10px',fontSize:'12px'}}  onClick={() => onProjectCreate()}>ADD </button>
          </div>} */}
                {userSquadList !== [] ? userSquadList.map((list, index) => {
                  return (
                    // eslint-disable-next-line 
                    <a className="dropdown-item" onClick={() => SquadChangeStatus(list)}>{list.value}</a>

                  )
                }) : null}
              </div>
            </li>
          </ul>
          <div className="form-group row">
            {loaderStatus ? <RootLoader /> :
              show ?
                <div >
                  <input style={{ borderRadius: '30px', backgroundColor: 'white', marginTop: '12px', borderColor: 'black' }} type="text" className="form-control-sm " id="projectName" name="projectName" placeholder="Enter Project Name*" onChange={(event) => { updateSquadName(event.target.value) }} />
                  <button style={{ backgroundColor: 'green', border: '0px', padding: '5px', textAlign: "center", color: "white", borderRadius: '10px', fontSize: '12px', marginLeft: '5px' }} onClick={() => onProjectCreate()}>ADD </button>
                </div> : null}
            {!show && !loaderStatus ? <button data-toggle="tooltip" data-placement="bottom" title="Create New Agile Project" style={{ backgroundColor: 'transparent', border: '0px', height: '30px', width: '200px', marginLeft: '-30px', flexDirection: 'row', marginTop: '13px' }} onClick={() => updateShow(!show)} ><img src="images/common/add.png" title='New Project' alt="logo" style={{ width: '20px', height: '20px' }} /> Add {NEW_PROJECT}</button> : null}
            {show && !loaderStatus ? <button style={{ backgroundColor: 'transparent', border: '0px', height: '30px', width: '20px', marginLeft: '5px' }} onClick={() => updateShow(!show)} ><img style={{ width: '25px', height: '25px', marginTop: '12px' }} src="images/common/addremove.png" alt="profile" /></button> : null}

          </div>
          <ul className="navbar-nav navbar-nav-right">
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
              <button type="button" title={SUPPORT} style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "2", marginLeft: '18px' }}>
                <Link to={{ pathname: "/reportBugUser" }} >
                  <img src="images/common/supp.png" alt="logo" style={{ width: '27px', height: '27px', marginTop: '6px', marginLeft:"7px" }}
                  />
                </Link>
                <p style={{ marginTop: "-3px" }}>{SUPPORT}</p>
              </button>
            </li>


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
                    <a className="dropdown-item" onClick={() => UserStatus(list.value)}>{list.value}</a>

                  )
                }) : null}
              </div>
            </li>


            <li className="nav-item nav-profile dropdown">
              {/* {getUser.user.email_status === '1' ? <span className="text-success mr-3 ">{VERIFIED_ACCOUNT} </span> : <span className="text-danger mr-3">{NOT_VERIFIED_ACCOUNT}</span>} */}
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
                  {PROFILE}
                </Link>

                <Link className="dropdown-item" to={{ pathname: "/payement" }}>
                  <i className="mdi mdi-paypal text-primary"></i>
                  {PAYEMENT}
                </Link>
                <Link className="dropdown-item" to={{ pathname: "/changePasswordUser" }}>
                  <i className="mdi mdi-security text-primary"></i>
                  {CHANGE_PASSWORD}
                </Link>
                {/* eslint-disable-next-line */}
                <a className="dropdown-item" onClick={() => onLogout()}>
                  <i className="mdi mdi-logout text-primary"></i>
                  {LOGOUT}
                </a>
              </div>
            </li>
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    </div>
  )

}