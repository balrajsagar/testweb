import { useSelector } from "react-redux";
import React from 'react'
import AdminSideBar from "../../AdminModule/Utility/SideNav";
import SideBar from "../../UserModule/Utility/SideNav";

export default function SideNavigation(){
    const getUser = useSelector(state => state.auth)
    return(
    <div>{getUser.user.role === "admin" ? <AdminSideBar/> : <SideBar/>} </div>
    )
}