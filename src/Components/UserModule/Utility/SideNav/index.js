import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { getProperties } from '../../../Common/getProperties';
import {ACTIVE_SPRINT, MODULES, KANBAN,LIMITED_ACCESS_CONTRIBUTOR,SCRUM_MASTER,PRODUCT_OWNER,MANAGEPROJECTS, COMPLETED_PROJECTS, USERS_ROADBLOCKS, PENDING_SUBTASKS, EMPLOYEES,ARCHIVE, CALENDAR, REPORTS, MURAL_BOARD, KANBAN_NAME } from '../../../Common/Headers';
import { role_array } from '../../../Common/getDefaultRoles';

export default function SideBar() {
  const getUser = useSelector(state => state.auth)
  // const properties = useSelector(state => state.landingReducer.properties)
 
    // render(){
        return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <ul className="nav">
            <li className="nav-item">
              <NavLink 
                 activeStyle={{
                  fontWeight: "bold",
                  color: "#007bff"
                }}
              className="nav-link"  to={{ pathname: '/dashboard'}}>
              <img src="images/common/homepage.png" alt="logo" style={{width:'30px',height:'30px'}}/>
              <span className="menu-title pl-3">Dashboard</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                 activeStyle={{
                  fontWeight: "bold",
                  color: "#007bff"
                }}
              className="nav-link" to={{ pathname :`/${MODULES}`}}>
              <img src="images/common/module.svg" alt="logo" style={{width:'30px',height:'30px'}}/>
                <span className="menu-title pl-3">{ACTIVE_SPRINT}</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                 activeStyle={{
                  fontWeight: "bold",
                  color: "#007bff"
                }}
              className="nav-link" to={{ pathname :`/${KANBAN_NAME}`}}>
              <img src="images/common/clipboard.png" alt="logo" style={{width:'30px',height:'30px'}}/>
                <span className="menu-title pl-3">{KANBAN}</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                 activeStyle={{
                  fontWeight: "bold",
                  color: "#007bff"
                }}
                className="nav-link" to={{ pathname: `/user/${MANAGEPROJECTS}`}}>
                <img src="images/common/projects.svg" alt="logo" style={{width:'30px',height:'30px'}}/>
                <span className="menu-title pl-3">{MANAGEPROJECTS}</span>
              </NavLink>
            </li>
            
            {/* <li className="nav-item">
              <NavLink 
                 activeStyle={{
                  fontWeight: "bold",
                  color: "#007bff"
                }}
              className="nav-link" to={{pathname : "/managetasks"}}>
              <img src="images/common/managetasks.svg" alt="logo" style={{width:'30px',height:'30px'}}/>
                <span className="menu-title pl-3">{MAINTASKS}</span>
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink 
                 activeStyle={{
                  fontWeight: "bold",
                  color: "#007bff"
                }}
              className="nav-link" to={{pathname : `/${PENDING_SUBTASKS}`}}>
              <img src="images/common/sidesubtask.svg" alt="logo" style={{width:'30px',height:'30px'}}/>
                <span className="menu-title pl-3">{PENDING_SUBTASKS}</span>
              </NavLink>
            </li> 
            <li className="nav-item">
              <NavLink 
                 activeStyle={{
                  fontWeight: "bold",
                  color: "#007bff"
                }}
              className="nav-link" to={{pathname : `/${ARCHIVE}`}}>
              <img src="images/common/server.png" alt="logo" style={{width:'30px',height:'30px'}}/>
                <span className="menu-title pl-3">{ARCHIVE}</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                 activeStyle={{
                  fontWeight: "bold",
                  color: "#007bff"
                }}
              className="nav-link" to={{pathname : `/${MURAL_BOARD}`}}>
              <img src="images/common/mural_icon.png" alt="logo" style={{width:'30px',height:'30px'}}/>
                <span className="menu-title pl-3">{MURAL_BOARD}</span>
              </NavLink>
            </li>
         
            {(role_array[getUser.user.role] === SCRUM_MASTER || role_array[getUser.user.role] === PRODUCT_OWNER) ? <li className="nav-item">
              <NavLink 
                 activeStyle={{
                  fontWeight: "bold",
                  color: "#007bff"
                }}
              className="nav-link" to={{pathname : `/${USERS_ROADBLOCKS}`}}>
              <img src="images/common/roadside.svg" alt="logo" style={{width:'30px',height:'30px'}}/>
                <span className="menu-title pl-3">{USERS_ROADBLOCKS}</span>
              </NavLink>
            </li> : null}
            <li className="nav-item">
              <NavLink 
                 activeStyle={{
                  fontWeight: "bold",
                  color: "#007bff"
                }}
              className="nav-link" to={{pathname : "/reports"}}>
              <img src="images/common/reports.svg" alt="logo" style={{width:'30px',height:'30px'}}/>
                <span className="menu-title pl-3">{REPORTS}</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                 activeStyle={{
                  fontWeight: "bold",
                  color: "#007bff"
                }}
              className="nav-link" to={{pathname : `/${COMPLETED_PROJECTS}`}}>
              <img src="images/common/completed.png" alt="logo" style={{width:'30px',height:'30px'}}/>
                <span className="menu-title pl-3">{COMPLETED_PROJECTS}</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                 activeStyle={{
                  fontWeight: "bold",
                  color: "#007bff"
                }}
              className="nav-link" to={{pathname : "/calendar"}}>
              <img src="images/common/calender.jpeg" alt="logo" style={{width:'30px',height:'30px'}}/>
                <span className="menu-title pl-3">{CALENDAR}</span>
              </NavLink>
            </li>
           {role_array[getUser.user.role] !== LIMITED_ACCESS_CONTRIBUTOR && <li className="nav-item">
              <NavLink 
                 activeStyle={{
                  fontWeight: "bold",
                  color: "#007bff"
                }}
              className="nav-link" to={{pathname : "/teams"}}>
              <img src="images/common/teams.png" alt="logo" style={{width:'30px',height:'30px'}}/>
                <span className="menu-title pl-3">{EMPLOYEES}</span>
              </NavLink>
            </li>}
            <li className="nav-item">
              <NavLink 
                 activeStyle={{
                  fontWeight: "bold",
                  color: "#007bff"
                }}
              className="nav-link" to={{pathname : "/chat"}}>
              <img src="images/common/chat-3.png" alt="logo" style={{width:'30px',height:'30px'}}/>
                <span className="menu-title pl-3">Chat Room</span>
              </NavLink>
            </li>
        
            
          </ul>
        </nav>
       
       )
    // }
}