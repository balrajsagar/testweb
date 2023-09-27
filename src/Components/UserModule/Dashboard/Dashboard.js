import React, { useEffect, useState, useReducer } from 'react'
import API from '../../Common/Network/API';
import { useSelector, useDispatch } from "react-redux";
import TopNavWithOutProject from '../Utility/TopNav/topnav'
import { setStatus, setToken, setRoleCount,getRoleCount, getToken } from '../../Common/LocalStorage';
import { setCurrentUser } from '../../Common/Actions';
import jwt_decode from "jwt-decode";
import { Redirect } from 'react-router-dom';
import Alert from '../../Common/Alert';
import RootLoader from '../../Common/Loader/RootLoader';
import { properties } from '../../AdminModule/Properties/actions';
import store from '../../Common/Store';

import {ACTIVE_STORIES, MODULE, NEW_PROJECT, PRODUCT_OWNER, SCRUM_MASTER,MODULES } from "../../Common/Headers";
import { getAllTaskMessages, getAllUserMessages, getAllGroupMessages } from './network';
import { dashboardReducer, initialState } from "./dashboardReducer";
import { setPlayerId } from '../../Authentication/Login/network';
import OneSignal from 'react-onesignal';
// import store from '../../Common/Store';
// import AOS from 'aos'
// import 'aos/dist/aos.css'
export default function Dashboard() {
    // AOS.init({
    //     duration: 1000
    // })
    // console.log(store.getState())
    const [userSquadList, UpdateUserSquadList] = useState([])
    const [projectSprintActive, UpdateProjectSprintActive] = useState([])

    const getUser = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false);
    const [squadName, updateSquadName] = useState('')
    // eslint-disable-next-line
    const [userSquad, UpdateUserSquad] = useState(getUser.user.corp);
    const [open, setOpen] = useState(false)
    const [loading,setLoading]=useState(false)
    const [info, setInfo] = useReducer(dashboardReducer, initialState);
    const { role } = getUser.user;
  useEffect(() => {
    OneSignal.init({
      // appId: "abea56d5-c615-4e38-b9f3-c5f2da474622"//local
      appId:"6323dec8-20d5-433e-a75c-00734e5f583f"
    });
      OneSignal.getUserId().then(function(userId) {
        // console.log("OneSignal User ID:", userId);
        setToken('player_id', userId) //store the token information  with exp
        setPlayerId(getUser.user)
    });
      // eslint-disable-next-line
  }, [])
    // const [userSquad, UpdateUserSquad] = useState(getUser.user.corp);//Show the Squad Name

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

    const getSquadsList = async (empId) => {
       setLoading(true)
        try {
            var response = await API.post("squads.php", {
                empId: empId,
                action: "get_squads"
            }, {}, false);
            if (response.status === 'True') {
                let projects_list =[];
                response.data.map(projects => {
                  return response.stories_count.filter(stories => projects.id === stories.project_id).map(list => {
                    return projects_list.push({ id:projects.id, color:projects.color,value:projects.value, is_enable:projects.is_enable,emp_id:projects.emp_id ,stories_count: list.stories_count});
                  })
                })
                UpdateProjectSprintActive(response.active_sprint)//Projects Active Sprints
                UpdateUserSquadList(projects_list)
            } else {
                UpdateUserSquadList([])
            }
        } catch (error) {
            Alert('error',error.message)
        }
        setLoading(false)
        
    }
    const onValidate=()=>{
        var validationRule = /^\S{3,}$/;
        if (squadName === "") {
          Alert('warning', "please give the project name")
        } else if(!validationRule.test(squadName)){
          Alert('warning', " please do not use spaces, '.' and '-' in between words")
        }else if(squadName.length < 4 || squadName.length > 16){
          Alert('warning', " project name should having length 4 to 15 characters")
        }else{
          return true
        }
      }

    const onProjectCreate = async () => {
      var user='admin@'
      var [,extension]=getUser.user.userName.split('@')
      setLoading(true)
        if (onValidate()) { //Validate the project name
          try {
            const response = await API.post("squads.php", {
              adminUsername:user.concat(extension),
              extension:extension,
              username: getUser.user.userName,
              squadName: squadName,
              action: "new_squad",
              empId:getUser.user.empId
            }, {
            });
            if (response.status === "True") {
              getSquadsList(getUser.user.empId);
              Alert('success', response.message)
              
            
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
        setOpen(false)
        setLoading(false)
       
      }
    useEffect(() => {
      getAllTaskMessages(setInfo, getUser.user)
      getAllUserMessages(setInfo, getUser.user)
      getAllGroupMessages(setInfo, getUser.user)
      getSquadsList(getUser.user.empId); // GNK --> 01
      store.dispatch(properties(getToken('properties')))
      // eslint-disable-next-line
    }, [])
    if (redirect) {
        if ((getRoleCount('roleCount') >= 1)) {
            return <Redirect to={`/${MODULES}`} />
            
        } else {
          return <Redirect to="/" />
        }
      }
      //Project having Active Sprint 
      const projectActiveSprint =(projectSprintActive, project_id) =>{
        if(MODULE === undefined){
          window.location.reload()
        }
        const activesprint = projectSprintActive.filter(activeSprints => activeSprints.project_id === project_id).map(({sprint_active}) => sprint_active);
        return(activesprint.length > 0 ? `Active ${MODULE}` : `No Active ${MODULE}`);
      }

      const getMessagesCount = (p_id, msg, empId, userMsg, groupMsg) => {
        const msgCount = msg.filter(message => message.readBy.split(",").indexOf(empId) === -1
         && (message.messagedBy !== empId && message.project_id === p_id) ).map((messages, i) => {
            // eslint-disable-next-line
            return i, messages
        })
        const msgCountUser = userMsg.filter(message => message.project_id === p_id).map((messagess, index) => {
          // eslint-disable-next-line
         return index,messagess
     })
     const msgCountGroup =  groupMsg.filter(message => message.readBy.split(",").indexOf(empId) === -1
     && message.messagedBy !== empId && message.project_id === p_id ).map((messagesGroup, id) => {
        // eslint-disable-next-line
        return id, messagesGroup 
    }) 
        return (
          <i>
            {msgCount.length + msgCountUser.length + msgCountGroup.length  > 0  ? (
               <i style={{ background: "whitesmoke" }}>
                <span style={{ marginLeft: '70%'}}>Messages</span>
                <span  title="Unread Messages" style={{ color: "red", fontWeight: "bold", background: "whitesmoke"  }}>
                {msgCount.length + msgCountUser.length + msgCountGroup.length }
                </span>
                </i>
            ) :
            <i style={{ background: "whitesmoke"  }}>
              <span style={{ color: "whitesmoke", fontWeight: "bold", marginLeft:"92%", background: "whitesmoke" }}>
              {msgCount.length}
          </span></i>}
          </i>
        );
      };
      // console.log("function",getMessagesCount('93c869c7c2cea585a1d85063a44b56de',info.allMessages, getUser.user.empId))
      
    return (
        <div>
            <TopNavWithOutProject />
            <div  className="d-flex justify-content-end" style={{ marginTop: 80,}} >
                    {open === false ? <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" onClick={() => setOpen(true)}> <img src="images/common/add.png" title='New Project' alt="logo" style={{ width: '20px', height: '20px' }} /><span className="m-1">Add {NEW_PROJECT}</span></button> :
                        <div className="row" style={{marginRight:30}}>
                            <input style={{width:200}} type='text' className='form-control mr-1' placeholder='   Project Name' value={squadName} onChange={(e) => updateSquadName(e.target.value)} />
                            <div className="flex-container">
                              <button className='btn-success mt-1 mb-3 mr-1' onClick={()=>onProjectCreate()}>Add</button>
                              <button className='btn-danger mt-1 mb-3 mr-1' onClick={()=>setOpen(false)}>Cancel</button> 
                            </div>
                        </div>}

                </div>
            <div className="row justify-content-center" >
               

                {loading===true?<RootLoader/>:
                    userSquadList.filter(projects => projects.is_enable === '1').map(projects => {
                        return (
                          <div key={projects.id}>
                          {/* { getMessagesCount(projects.id,info.allMessages, getUser.user.empId) } */}
                            <div className="shadow-lg bg-white rounded m-5" style={{width:250}}>

                            { getMessagesCount(projects.id,info.allMessages, getUser.user.empId, info.allMessagesUser, info.allGroupMessages) }
                                    <div className="dcenter" style={{ backgroundColor:projects.color, display:'flex',flexDirection: 'column', fontWeight:600, alignItems: 'center' }}>
                                        <p onClick={() => SquadChangeStatus(projects)} 
                                        // corp === projects.value ? 'floralwhite' :  fontWeight: corp === projects.value && 'bold'
                                        style={{ color: '#2f4f4f', marginTop: 45, cursor: 'pointer', fontSize: '20px' }}>
                                          {projects.value}
                                           {/* { getMessagesCount(projects.id,info.allMessages, getUser.user.empId) }  */}
                                           </p>
                                           {(role === SCRUM_MASTER || role === PRODUCT_OWNER) && <p style={{ fontWeight: '600', color: '#2f4f4f' }}>{ACTIVE_STORIES}: {projects.stories_count}</p>}
                                           {<p style={{ fontWeight: '600', color: '#2f4f4f' }}>{projectActiveSprint(projectSprintActive,projects.id)}</p>}
                                           {/* { getMessagesCount(projects.id,info.allMessages, getUser.user.empId) } */}
                                    </div>

                                </div>
                                </div>
                         

                        )
                    })
                }
            </div>
        </div>
    )
}
