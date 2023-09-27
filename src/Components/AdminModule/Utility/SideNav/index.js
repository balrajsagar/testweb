import React from 'react';
import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { EMPLOYEES, TIMESHEET, REPORTS, USAGE_REPORTS, PROJECT_REPORTS, ARCHIVE_PROJECT } from '../../../Common/Headers';
export default function AdminSideBar() {

  const getUser = useSelector(state => state.auth)
  const properties = useSelector(state => state.landingReducer.properties)
  const [, extension] = (getUser.user.userName).split('@')



  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">

      <ul className="nav">

        {/* <li className="nav-item">
              <Link className="nav-link" to={{pathname:"/userDashboard"}}>
              <img src="images/common/dashboard.png" alt="logo" style={{width:'30px',height:'30px'}}/>
                <span className="menu-title pl-3">Dashboard</span>
              </Link>
            </li> */}

        <li className="nav-item">
          <NavLink
            activeStyle={{
              fontWeight: "bold",
              color: "#007bff"
            }}
            className="nav-link" to={{ pathname: "/admin/reports" }}>
            <img src="images/common/reports.svg" alt="logo" style={{ width: '30px', height: '30px' }} />
            <span className="menu-title pl-3">{properties.REPORTS || REPORTS}</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            activeStyle={{
              fontWeight: "bold",
              color: "#007bff"
            }}
            className="nav-link" to={{ pathname: "/admin/projectReports" }}>
            <img src="images/common/analytics.png" alt="logo" style={{ width: '30px', height: '30px' }} />
            <span className="menu-title pl-3">{properties.PROJECT_REPORTS || PROJECT_REPORTS}</span>
          </NavLink>
        </li>
        {/* <li class="nav-item">
            <div class="dropdown nav-link">
            <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src="images/common/usagereports1.png" alt="logo" style={{ width: '30px', height: '30px' }} />
              <span className="menu-title pl-3">{USAGE_REPORTS}</span>
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <NavLink
                className="dropdown-item nav-link" to={{ pathname: "/admin/usageReports" }}>
                <img src="images/common/usagereports1.png" alt="logo" style={{ width: '30px', height: '30px' }} />
                <span className="menu-title pl-3">{USAGE_REPORTS}</span>
              </NavLink>
              <NavLink
                className="dropdown-item nav-link" to={{ pathname: "/admin/reports" }}>
                <img src="images/common/usagereports1.png" alt="logo" style={{ width: '30px', height: '30px' }} />
                <span className="menu-title pl-3">{USAGE_REPORTS}</span>
              </NavLink>
            </div>
            </div>
          </li> */}
        {(extension === 'agile24x7.com' || 'task24x7.com') && <li className="nav-item">
          <NavLink
            activeStyle={{
              fontWeight: "bold",
              color: "#007bff"
            }}
            className="nav-link" to={{ pathname: "/admin/usageReports" }}>
            <img src="images/common/usagereports1.png" alt="logo" style={{ width: '30px', height: '30px' }} />
            <span className="menu-title pl-3">{properties.USAGE_REPORTS || USAGE_REPORTS}</span>
          </NavLink>
        </li>}
        {/* <li className="nav-item">
            <NavLink
              activeStyle={{
                fontWeight: "bold",
                color: "#007bff"
              }}
              className="nav-link" to={{ pathname: "/projects" }}>
              <img src="images/common/projects.svg" alt="logo" style={{ width: '30px', height: '30px' }} />
              <span className="menu-title pl-3">{MANAGEPROJECTS}</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeStyle={{
                fontWeight: "bold",
                color: "#007bff"
              }}
              className="nav-link" to={{ pathname: "/adminModules" }}>
              <img src="images/common/module.svg" alt="logo" style={{ width: '30px', height: '30px' }} />
              <span className="menu-title pl-3">{MODULES}</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeStyle={{
                fontWeight: "bold",
                color: "#007bff"
              }}
              className="nav-link" to={{ pathname: "/adminManageTasks" }}>
              <img src="images/common/managetasks.svg" alt="logo" style={{ width: '30px', height: '30px' }} />
              <span className="menu-title pl-3">{MAINTASKS}</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeStyle={{
                fontWeight: "bold",
                color: "#007bff"
              }}
              className="nav-link" to={{ pathname: "/roadBlock" }}>
              <img src="images/common/roadside.svg" alt="logo" style={{ width: '30px', height: '30px' }} />
              <span className="menu-title pl-3">{ROADBLOCKS}</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeStyle={{
                fontWeight: "bold",
                color: "#007bff"
              }}
              className="nav-link" to={{ pathname: "/completedProjects" }}>
              <img src="images/common/completed.png" alt="logo" style={{ width: '30px', height: '30px' }} />
              <span className="menu-title pl-3">{COMPLETED_PROJECTS}</span>
            </NavLink>
          </li>*/}
        <li className="nav-item">
          <NavLink
            activeStyle={{
              fontWeight: "bold",
              color: "#007bff"
            }}
            className="nav-link" to={{ pathname: "/employees" }}>
            <img src="images/common/teams.png" alt="logo" style={{ width: '30px', height: '30px' }} />
            <span className="menu-title pl-3">{properties.EMPLOYEES || EMPLOYEES}</span>
          </NavLink>
        </li>
        {extension === 'agile24x7.com' && <li className="nav-item">
          <NavLink
            activeStyle={{
              fontWeight: "bold",
              color: "#007bff"
            }}
            className="nav-link" to={{ pathname: "/accounts" }}>
            <img src="images/common/server.png" alt="logo" style={{ width: '30px', height: '30px' }} />
            <span className="menu-title pl-3">Accounts</span>
          </NavLink>
        </li>}
        <li className="nav-item">
          <NavLink
            activeStyle={{
              fontWeight: "bold",
              color: "#007bff"
            }}
            className="nav-link" to={{ pathname: "/timesheet" }}>
            <img src="images/common/timesheet.png" alt="logo" style={{ width: '30px', height: '30px' }} />
            <span className="menu-title pl-3">{properties.TIMESHEET || TIMESHEET}</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            activeStyle={{
              fontWeight: "bold",
              color: "#007bff"
            }}
            className="nav-link" to={{ pathname: "/admin/chat" }}>
            <img src="images/common/chat-3.png" alt="logo" style={{ width: '30px', height: '30px' }} />
            <span className="menu-title pl-3">Chat Room</span>
          </NavLink>
        </li>
        {extension === 'agile24x7.com' && <li className="nav-item">
          <NavLink
            activeStyle={{
              fontWeight: "bold",
              color: "#007bff"
            }}
            className="nav-link" to={{ pathname: "/admin/faqs" }}>
            <img src="images/common/faq.png" alt="logo" style={{ width: '30px', height: '30px' }} />
            <span className="menu-title pl-3">FAQ's</span>
          </NavLink>
        </li>}

        {extension === 'agile24x7.com' && <li className="nav-item">
          <NavLink
            activeStyle={{
              fontWeight: "bold",
              color: "#007bff"
            }}
            className="nav-link" to={{ pathname: "/admin/archiveProject" }}>
            <img src="images/common/managetasks.svg" alt="logo" style={{ width: '30px', height: '30px' }} />
            <span className="menu-title pl-3">{ARCHIVE_PROJECT}s</span>
          </NavLink>
        </li>}
      </ul>
    </nav>

  )

}