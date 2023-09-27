import React, { useEffect, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import API from '../../Common/Network/API';
import jwt_decode from "jwt-decode";
import { setCurrentUser } from '../../Common/Actions';
import { setToken, setRoleCount, setStatus } from '../../Common/LocalStorage';
import Switch from 'react-switch';
import { ARCHIVE_PROJECT, AGILE, MODULES } from '../../Common/Headers';
// import { MODULES,CONTRIBUTOR,  MANAGEPROJECTS, COMPLETED_PROJECTS, USERS_ROADBLOCKS, PENDING_SUBTASKS,
//      EMPLOYEES,ARCHIVE, CALENDAR, REPORTS, MURAL_BOARD } from '../../Common/Headers';

export default function SideBar(props) {
  const getUser = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const [userSquadList, UpdateUserSquadList] = useState([]) //Show the list of Squad Names Based on username
  const [redirect, setRedirect] = useState(false);
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    getSquadsList(getUser.user.empId); // GNK --> 01
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    getSquadsList(getUser.user.empId); // Calling for Archived the Project is done
    // eslint-disable-next-line
  }, [props.squads])

  const collapseAll = () => {
    setCollapse(!collapse);
};
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
        setRoleCount('roleCount', tokenDetails.data.roleCount)
        dispatch(setCurrentUser(tokenDetails.data)); //store the user information
        setStatus('status', tokenDetails.data.empStatus)
        setRedirect(true)
      }
    } catch (error) {

    }
    // dispatch(isLoaded());
  }

  // Squads list can be enable or disable on user convience
  const isProjectsEnable = async (project_id, emp_id, is_enable) => {
    try {
      var response = await API.post("squads.php", {
        emp_id: emp_id,
        project_id: project_id,
        action: "is_project_enable",
        is_enable: is_enable === '1' ? '0' : '1',
      }, {}, false);
      if (response.status === 'True') {
        getSquadsList(getUser.user.empId);
      }
    } catch (error) {
      // Alert('error',error.message)
    }
  }
  if (redirect) {
    return <Redirect to = {`/${MODULES}`} />
  }
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item">
          <NavLink
            activeStyle={{
              fontWeight: "bold",
              color: "#007bff"
            }}
            className="nav-link" to={{ pathname: '/dashboard' }}>
            <img src="images/common/homepage.png" alt="logo" style={{ width: '20px', height: '20px' }} />
            <span className="menu-title pl-3">Dashboard</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <div
            activeStyle={{
              fontWeight: "bold",
              color: "#007bff",
            }}
            class="btn dropdown-toggle"
            onClick={()=> collapseAll()}
            style={{ fontWeight: "bold" }}
            className="nav-link" >
            <span style={{ width: '20px', height: '20px', borderColor: 'transparent' }} />
            <span className="menu-title pl-0" style={{ fontWeight: "bold", color: 'green' }}>{AGILE} Projects </span>
            <i class="material-icons" style={{ cursor: 'pointer' }}>{collapse ? 'arrow_drop_up' : 'arrow_drop_down'}</i>
          </div>
        </li>
        {userSquadList !== [] && collapse ? userSquadList.map((list, index) => {
          return (
            <li className="nav-item" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignContent: 'center',
              marginRight: '1rem',
              alignItems: 'flex-end',
            }}>
              <div
                activeStyle={{
                  fontWeight: "bold",
                  color: "#007bff",
                }}
                className="nav-link">
                <div onClick={() => SquadChangeStatus(list)}>
                  <img alt='' style={{ width: '20px', height: '20px', backgroundColor: list.color }} />
                  <span className="menu-title pl-3" style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '8rem',
                    lineHeight: '1.5',
                  }}>{list.value}</span>
                </div>
              </div>
              <div title='Hide or Un Hide Project'>
                <Switch
                  checked={(list.is_enable === "1") ? true : false}
                  onChange={() => isProjectsEnable(list.id, list.emp_id, list.is_enable)}
                  className="react-switch"
                />
              </div>
            </li>
          )
        }) : null}
        <li className="nav-item">
          <NavLink
            activeStyle={{
              fontWeight: "bold",
              color: "#007bff"
            }}
            className="nav-link" to={{ pathname: '/user/archiveProjetcs' }}>
            <img src="images/common/managetasks.svg" alt="logo" style={{ width: '20px', height: '20px' }} />
            <span className="menu-title pl-3">{ARCHIVE_PROJECT}</span>
          </NavLink>
        </li>
      </ul>
    </nav>

  )

}