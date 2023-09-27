import React, { useEffect, useState, useReducer } from 'react'
import API from '../../Common/Network/API';
import { dashboardReducer, initialState } from './dashboardReducer';
import { useSelector } from "react-redux";
import TopNavWithOutProject from '../Utility/TopNav/topnav'
import { setStatus, setToken, setRoleCount, getRoleCount } from '../../Common/LocalStorage';
import { setCurrentUser } from '../../Common/Actions';
import jwt_decode from "jwt-decode";
import { Redirect } from 'react-router-dom';
import { getSquadsList, onProjectCreate } from './network';
import * as actions from './actions'
import RootLoader from '../../Common/Loader/RootLoader';
// import AOS from 'aos'
// import 'aos/dist/aos.css'



export default function Dashboard() {
  // AOS.init({
  //     duration: 1000
  // })
  const [state, dispatch] = useReducer(dashboardReducer, initialState)

  const getUser = useSelector(state => state.auth)
  const [redirect, setRedirect] = useState(false);
  const [squadName, updateSquadName] = useState('')
  const [userSquad, UpdateUserSquad] = useState(getUser.user.corp);
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fun()
    // eslint-disable-next-line
}, [])
    const fun = () => {
        if (window.localStorage) {
            if (!localStorage.getItem('firstLoad')) {
                localStorage['firstLoad'] = true;
                window.location.reload();
            }
            else
                localStorage.removeItem('firstLoad');
        }
    }

  const SquadChangeStatus = async (projectInfo) => {
    try {
      const response = await API.post("squad_login.php", {
        username: getUser.user.empId,
        project_id:projectInfo.id,
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
  }
  
 function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
   getSquadsList(dispatch, getUser.user.empId); // GNK --> 01
    // eslint-disable-next-line
  }, [])

  const handleClose = () => {
    setOpen(false)
    getSquadsList(dispatch, getUser.user.empId);
}

  if (redirect) {
    if ((getRoleCount('roleCount') >= 1)) {
      return <Redirect to="/sprints" />
    } else {
      return <Redirect to="/" />
    }
  }

  return (
    <div>
      <TopNavWithOutProject />

      <div className="row justify-content-center mt-5" >
        <div style={{ marginTop: '30px' }} >
          {open === false ? <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" onClick={() => setOpen(true)}> <img src="images/common/add.png" title='New Project' alt="logo" style={{ width: '20px', height: '20px' }} /><span className="m-1">New Project</span></button> :
            <div>
              <input type='text' className='form-control' placeholder='Project Name' 
               value={state.newProject} 
               onChange={(e) => dispatch(actions.newProject(e.target.value))} />
              <div className="flex-container ">
                <button className='btn-success mt-2 mb-3' onClick={() => onProjectCreate(state, dispatch, getUser.user,handleClose)}>Add</button>
                <button className='btn-danger mt-2 mb-3' onClick={() => setOpen(false)}>Cancel</button>
              </div>
            </div>}

        </div>

        {state.isLoading ? <RootLoader /> :
          state.allProjects.map(projects => {
            return (
              <div className='col-md-3' style={{ marginTop: '30px' }}>
                <div className="shadow-lg p-1 mb-5 bg-white rounded m-5">
                  <div className="dcenter" style={{ backgroundColor: getRandomColor() }}>
                    <b onClick={() => SquadChangeStatus(projects)} style={{ color: 'white', marginTop: 45, cursor: 'pointer', fontSize: '20px' }}>{projects.value} </b>
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
