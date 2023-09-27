import { useSelector } from "react-redux";
import AdminTopNav from "../../AdminModule/Utility/TopNav";
import TopNav from "../../UserModule/Utility/TopNav";
import React from 'react'

export default function Header(){
    const getUser = useSelector(state => state.auth)
    return(
    <div>{getUser.user.role === "admin" || getUser.user.role === "Admin" ? <AdminTopNav/> : <TopNav/>} </div>
    )
}