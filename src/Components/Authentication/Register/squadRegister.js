import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setStatus, setToken, setRoleCount } from '../../Common/LocalStorage';
import jwt_decode from "jwt-decode";
import API from '../../Common/Network/API';
import Alert from '../../Common/Alert';
import { isLoaded, isLoading } from '../../Common/Actions/loading';
import { setCurrentUser } from '../../Common/Actions';
import { Redirect } from 'react-router-dom';
import RootLoader from '../../Common/Loader/RootLoader'
import store from '../../Common/Store';
import { getToken } from '../../Common/LocalStorage';
import {AGILE_PROJECT_NAME } from '../../Common/Headers';


export default function SquadRegister() {

    const dispatch = useDispatch();
    const loaderStatus = useSelector(state => state.loading.status)
    const [data, setData] = useState({})
    const [redirect, setRedirect] = useState(false)

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    // Agile Project Validation GNK --->start 03
  const onValidate=(squadName)=>{
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
  // GNK --> End 03

    const onLogin = async (e) => {
        e.preventDefault()
        store.dispatch(isLoading());
        if (onValidate(data.username)) {
            try {
                const response = await API.post("squads.php", {
                    username: getToken('user'),
                    empId:getToken('empId'),
                    squadName: data.username,
                    action: "new_squad",
                }, {
                },false);
                console.log(response)
                if (response.status === "True") {
                     squadLogin(data.username, getToken('user')) //to be add for login after project added
                    // Alert('success', response.message)
                    // setRedirect(true)
                } else {
                    Alert('warning', response.message)
                }
            }
            catch (error) {
                Alert('error', error.message)
            }
        } else {
            // Alert('warning', "please fill the user credentials")
        }
        store.dispatch(isLoaded());
    }
    //Login After Create the New Project
    const squadLogin = async (squadName, username) => {
        try {
            const response = await API.post("squad_login.php", {
                username: username,
                corp: squadName,
            }, {
            });
            if (response.status === "TRUE") {
                setToken('auth', response.jwt) //store the token information  with exp
                const tokenDetails = jwt_decode(response.jwt);
                console.log(tokenDetails.data)
                setRoleCount('roleCount', tokenDetails.data.roleCount)
                dispatch(setCurrentUser(tokenDetails.data)); //store the user information
                setStatus('status', tokenDetails.data.empStatus)
                setRedirect(true)
            } else {
                Alert('warning', response.message)
            }
        }
        catch (error) {
            Alert('error', error.message)
        }
        store.dispatch(isLoaded());
    }

    if (redirect) {
        return <Redirect to="/" />
    }

    const renderContent = () => {
        if (loaderStatus) {
            return <RootLoader />
        }
        return (
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper " >
                    <div className="content-wrapper d-flex align-items-center auth px-0 bglogin">
                        <div className="row w-100 mx-0">

                            <div className="col-lg-4 mx-auto">

                                <div className="auth-form-light text-left py-5 px-4 px-sm-5" style={{ backgroundImage: "linear-gradient(135deg,#2DCE8B, #2DCECB)", borderRadius: '20px' }}>
                                    <form className="pt-1" onSubmit={(e) => onLogin(e)}>
                                        <h4 className="col-12 pb-2 pt-2" style={{ textAlign: 'center' }}>ADD AGILE PROJECT</h4>
                                        <div className="form-group row" >

                                            <input data-toggle="tooltip" data-placement="bottom" title="Please enter Agile project name" style={{ borderRadius: '30px', backgroundColor: 'white' }} type="text" className="form-control form-control-lg" id="name" name="username" placeholder={AGILE_PROJECT_NAME} onChange={e => handleChange(e)} required />


                                        </div>
                                        {/* <div className="form-group">
                                            <input style={{ borderRadius: '30px', backgroundColor: 'white' }} type={enablePassword ? 'text' : 'password'} className="form-control form-control-lg" id="password-field" name="password" placeholder="Password*" onChange={e => handleChange(e)} required />
                                            {!enablePassword &&  className="passwordimg" src="images/common/hide.svg" alt="logo"<img style={{ width: '20px', height: '20px' }} onClick={() => handlePasswordView()} />}
                                            {enablePassword && <img className="passwordimg" src="images/common/show.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={() => handlePasswordView()} />}
                                        </div> */}
                                        {/* <div className="form-group">
                                            <input style={{ borderRadius: '30px', backgroundColor: 'white' }} type="text" className="form-control form-control-lg" id="corpCode" name="corpCode" placeholder="Squad Name*" onChange={e => handleChange(e)} required />
                                        </div> */}
                                        {/* <div className="row m-4">
                                        <input className="mt-1" type="radio" name="userType" value="admin" aria-label="Radio button for following text input" onChange={e => handleChange(e)} required />
                                        <span className="ml-3">Admin</span>
                                        <input className="ml-3 mt-1" type="radio" name="userType" value="user" aria-label="Radio button for following text input" onChange={e => handleChange(e)} required />
                                        <span className="ml-3">User</span>
                                    </div> */}
                                        <div className="mt-3">
                                            {(loaderStatus) ? <RootLoader /> :
                                                <button className="btn btn-block  btn-lg font-weight-medium auth-form-btn" style={{ backgroundColor: 'rgb(2 107 109)', color: 'white', borderRadius: '30px', marginLeft: '30%', width: '40%' }}>Add Project</button>}
                                        </div>
                                        {/* <div>
                                            <Link style={{color:'black'}} to={{ pathname: "/forgetPassword" }}>Forget Password?</Link>
                                        </div> */}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
    return (
        renderContent()
    );
}