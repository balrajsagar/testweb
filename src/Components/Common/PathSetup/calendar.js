import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import API from '../../Common/Network/API';
import Alert from '../../Common/Alert';
import { isLoaded, isLoading } from '../../Common/Actions/loading';
// eslint-disable-next-line
import { Redirect, Link } from 'react-router-dom';
import RootLoader from '../../Common/Loader/RootLoader'
// import store from '../../Common/Store';
import jwt_decode from "jwt-decode";
import { setCurrentUser } from '../../Common/Actions';
import { setStatus, setToken, setRoleCount } from '../../Common/LocalStorage';
const qs = require('query-string');
// const CryptoJS = require("crypto-js");

export default function CalendarRedirect(props) {
    const loaderStatus = useSelector(state => state.loading.status)
    const dispatch = useDispatch();
    // eslint-disable-next-line
    const getUser = useSelector(state => state.auth)
    const [redirect, setRedirect] = useState(false)
    const parsed = qs.parse(props.location.search);

    useEffect(() => {
        SquadChangeStatus()
        // eslint-disable-next-line
    },[props])
    // console.log(parsed)

console.log("tokan",getUser)
   // Decrypt
  // const info2 = CryptoJS.AES.decrypt(parsed.key, 'my-secret-key@123').toString(CryptoJS.enc.Utf8);
//     const info3 = JSON.parse(info2);
//  console.log("key",info3)
//Squad Change (Shift the squad)
const SquadChangeStatus = async (e) => {
  if(getUser.user.userName === parsed.empId ){
    dispatch(isLoading());
    try {
      const response = await API.post("squad_login.php", {
        username: parsed.empId,
        project_id: parsed.projectId,
        corp: parsed.key,
        // corp: info3.str,
      }, {}, false);
      if (response.status === 'TRUE') {
        setToken('auth', response.jwt) //store the token information  with exp
        const tokenDetails = jwt_decode(response.jwt);
        // console.log(tokenDetails.data)
        setRoleCount('roleCount', tokenDetails.data.roleCount)
        dispatch(setCurrentUser(tokenDetails.data)); //store the user information
        setStatus('status', tokenDetails.data.empStatus)
        setRedirect(true)
        // UpdateUserSquad(squadName)
      } else {
        // UpdateUserSquad(getUser.user.corp)
      }
    } catch (error) {
      Alert('error',error.message)
    //   UpdateUserSquad(getUser.user.corp)
    }
    dispatch(isLoaded());
  }else{
    Alert('error',"You are already logged in with other user!")
  }
  }


    if (redirect) {
        return <Redirect to="/calendar" />
        // return <h1>Hello</h1>
    }

    const renderContent = () => {
        if (loaderStatus) {
            return <RootLoader />
        }
        return (
            <div>
  </div>
           
        )
    }
    return (
        renderContent()
    );
}