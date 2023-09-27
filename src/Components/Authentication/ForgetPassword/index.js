import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import API from '../../Common/Network/API';
import Alert from '../../Common/Alert';
import { isLoaded, isLoading } from '../../Common/Actions/loading';
import { Redirect, Link } from 'react-router-dom';
import RootLoader from '../../Common/Loader/RootLoader'
import store from '../../Common/Store';
import { Client_URL } from '../../Common/config';
import { APP_NAME } from '../../Common/Headers';

// for forgot password
export default function ForgetPassword() {

    // eslint-disable-next-line
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
    // console.log(data.username)
    // send email with url
    const onLogin = async (e) => {
        e.preventDefault()
        store.dispatch(isLoading());
        if (!data.username !== "") {
            try {
                var response = await API.post("authentication.php",
                    {
                        username: data.username,
                        action: "forgotPassword",
                        url: `${Client_URL}`,
                        appName: APP_NAME,
                    },
                    {}, false);
                    if (response.status === "True") {
                        Alert('success', response.message)
                        setRedirect(true)
                    } else {
                        Alert('warning', response.message)
                    }
            } catch (error) {
                Alert("error", error.message)
            }
        } else {
            Alert("Warning", "Please Enter Valid Email")
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
                                <button style={{ backgroundColor: 'transparent', border: '0', marginLeft: "95%", marginTop: "-35px" }} type="submit" 
                                className="d-flex align-items-right" data-dismiss="modal"><Link to={{ pathname: "/login" }}><i class="mdi mdi-close text-black" style={{color:"red", fontSize : "130%"}}></i></Link></button><br />
                                 <h2 className="mt-3 text-center" >Forget Password</h2><br />
                                 <form className="pt-3" onSubmit={(e) => onLogin(e)}>
                                        <div className="form-group" >
                                            <input style={{ borderRadius: '30px', backgroundColor: 'white' }} type="email" className="form-control form-control-lg" id="name" name="username" placeholder="Email*" onChange={e => handleChange(e)} required />
                                        </div>
                                        <div className="mt-3">
                                            {(loaderStatus) ? <RootLoader /> :
                                                <button className="btn btn-block  btn-lg font-weight-medium auth-form-btn" style={{ backgroundColor: 'rgb(2 107 109)', color: 'white', borderRadius: '30px', marginLeft: '30%', width: '40%' }}>Send</button>}
                                        </div>
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