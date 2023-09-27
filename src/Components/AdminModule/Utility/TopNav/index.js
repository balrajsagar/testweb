import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { logoutUser } from '../../../Common/Actions';
import { getRoleCount } from '../../../Common/LocalStorage';
import { serverCheck } from '../../../Maintenance/UnderMaintenance/network';
import { maintenanceReducer, serverInitialState } from '../../../Maintenance/UnderMaintenance/maintenanceReducer';
import { IMG_SRC, VERSION, VERSION_DATE, LOGOUT, SETTINGS, CHANGE_PASSWORD, PAYEMENT } from '../../../Common/Headers';

export default function AdminTopNav() {
  const dispatch = useDispatch();
  const getUser = useSelector(state => state.auth)
  const getProperties = useSelector(state => state.landingReducer)
  const [webProperties, setWebProperties] = useState(getProperties?.webProperties)
  const [redirect, setRedirect] = useState(false);
  const [state, dispatch1] = useReducer(maintenanceReducer, serverInitialState)

  const onLogout = () => {
    dispatch(logoutUser);
    setRedirect(true)
  }
  useEffect(() => {
    serverCheck(dispatch1)
    // eslint-disable-next-line
  }, [])

  if (redirect) {
    return <Redirect to="/" />
  }
  //For Redirecting Maintenance Page 
  if (state.server.value === "not connected" || state.server.value === "Network Error") {
    // console.log(JSON.stringify(state.server.value))
    return <Redirect to="/UnderMaintenance" />
  }
  return (
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="navbar-brand-wrapper d-flex justify-content-center">
        <div className="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">
          <a className="navbar-brand brand-logo" href="/"><img src={getProperties?.properties?.IMG_SRC || IMG_SRC} alt="logo" /></a>
          <p className="navbar-brand brand-logo pt-3" style={{ fontSize: '10px', paddingRight: '0px', }}>{VERSION} <br />{VERSION_DATE}</p>
          <a className="navbar-brand brand-logo-mini" href="/"><img src={getProperties?.properties?.IMG_SRC || IMG_SRC} alt="logo" /></a>
          <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
            <span className="mdi mdi-sort-variant"></span>
          </button>
        </div>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">

        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-profile dropdown">{/* eslint-disable-next-line */}
            <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
              <img src="images/common/user1.svg" alt="profile" />
              <span className="nav-profile-name">{getUser.user.fullName}</span>
            </a>
            <div style={{backgroundColor: '#FFFFFF' }} className="dropdown-menu dropdown-menu-center navbar-dropdown" aria-labelledby="profileDropdown">
              {/* eslint-disable-next-line */}
              {getRoleCount('roleCount') >= 1 ? <Link className="dropdown-item" to={{ pathname: "/changePassword" }}>
                <i className="mdi mdi-security text-primary"></i>
                {CHANGE_PASSWORD}
              </Link> : null}
              <Link className="dropdown-item" to={{ pathname: "/settings" }}>
                <i className="mdi mdi-settings text-primary"></i>
                {SETTINGS}
              </Link>
              {/* eslint-disable-next-line */}
              <Link className="dropdown-item" to={{ pathname: "/admin/adminPayment" }}>
                <i className="mdi mdi-paypal text-primary"></i>
                {PAYEMENT}
              </Link>
              <Link className="dropdown-item" to={{ pathname: "/properties" }}>
                <i className="mdi mdi-information text-primary"></i>
                Properties
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
  )
}