import React, { useState, useEffect } from 'react'
import {  useSelector } from 'react-redux';
import API from '../../Common/Network/API';
import Alert from '../../Common/Alert';
import { isLoaded, isLoading } from '../../Common/Actions/loading';
// eslint-disable-next-line
import { Redirect, Link } from 'react-router-dom';
import RootLoader from '../../Common/Loader/RootLoader'
import store from '../../Common/Store';
const qs = require('query-string');

export default function Verify(props) {
    const loaderStatus = useSelector(state => state.loading.status)
    // eslint-disable-next-line
    const [data, setData] = useState({})
    const [redirect, setRedirect] = useState(false)
    const parsed = qs.parse(props.location.search);

    // console.log(parsed.key);
    useEffect(() => {
        onLogin();
        // eslint-disable-next-line
    },[props])
// console.log(parsed);
// console.log(parsed.key);
    const onLogin = async (e) => {
        // console.log(parsed.key);
        store.dispatch(isLoading());
            try {
                // const response = await API.post("", {
                    const response = await API.post("authentication.php", {
                    key: parsed.key,
                    action: "verify"
                }, 
                {}, false);
                // console.log(response)
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
        store.dispatch(isLoaded());
    }

    if (redirect) {
        return <Redirect to="/login" />
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