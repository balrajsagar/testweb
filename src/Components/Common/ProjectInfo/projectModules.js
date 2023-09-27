import { getModules } from "./network";
import React, { useEffect, useReducer, useState } from "react";
import $ from 'jquery';
import { projectReducer, initialState } from "./projectReducer";
import { useSelector } from "react-redux";
import RootLoader from "../Loader/RootLoader";
import { MODULENAME, ACTION, EDIT, NEWMAINTASK, VIEWMAINTASKS, STATUS, DELETE, VIEW_DETAILS, ACTION_ICON } from "../Headers";
import { Link } from "react-router-dom";
import AddMainTask from "../TasksModals/addMainTask";
import ModifyModule from "../Modules/modifyModule";
import CheckCondition from "../Modules/CheckCondition";
import MainTaskInfo from '../TasksModals/mainTaskInfo';


export default function ProjectModules(props) {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(projectReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [moduleInfo, setModuleInfo] = useState()
    useEffect(() => {
        getModules(dispatch, getUser.user, props.data.id);
        // eslint-disable-next-line
    }, [props.data])
    useEffect(() => {
        if (state.modules.length >= 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                })
            })
        }
        //  eslint-disable-next-line 
    }, [state.modules])
    const handleOpen = (action, index) => {
        setOpen({ status: true, action: action, index: index });
        if (action === "addMainTask") {
            var info = { moduleId: state.modules[index].moduleId, ideaId: state.modules[index].ideaId }
        } else if (action === "modify") {
            info = { id: state.modules[index].moduleId, title: state.modules[index].moduleDesc, targetDate: state.modules[index].targetDate, startDate: state.modules[index].startDate }
        }
        else if (action === "view_details") {
            var view_status = "sprintInfo"
            info = { view: view_status,id: state.modules[index].moduleId, title: state.modules[index].moduleDesc, targetDate: state.modules[index].targetDate, startDate: state.modules[index].startDate,epic:state.modules[index].ideaTitle,createdBy:state.modules[index].createdBy,created_on:state.modules[index].createdDate }
        }
         else {
            info = { id: state.modules[index].moduleId, title: state.modules[index].moduleDesc, action: action, ideaId: state.modules[index].ideaId }
        }
        setModuleInfo(info)
    };
    const handleClose = () => {
        // state.modules=[];
        setOpen({ status: false, index: 0 });
        getModules(props.data.dispatch, getUser.user);
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
    }
    return <div className="table-responsive">
        {state.isLoading ? <RootLoader /> :
            <table
                search="true"
                id="example" className="table table-striped table-bordered"
                data-pagination="true"
            >
                <thead style={{ backgroundColor: '#F4FAF7' }}>
                    <tr>
                        <th>{MODULENAME}</th>
                        {/* <th>{CREATED_BY} </th>
                        <th>{CREATED_DATE}</th>
                        <th>{TARGET_DATE}</th> */}
                        <th>{STATUS}</th>
                        <th>{ACTION}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.modules !== [] ? state.modules.map((module, index) => {
                            const[year,month,date]=module.startDate.split('-');
                            const[year1,month1,date1]=module.targetDate.split('-');
                            return (
                                <tr key={index}>
                                    <td data-toggle="tooltip" data-placement="left" title={"StartDate      :" + module.startDate + "\n\nEnd Date       :" + module.targetDate + "\n\nCreated By     :" + module.fullName + "\n\nCreated Date  :" + module.createdDate}><b>{module.moduleDesc.concat('['+month+'.'+date+'.'+year+'-'+month1+'.'+date1+'.'+year1+']') }</b></td>
                                    {/* <td>{module.fullName}</td>
                                    <td style={{ textAlign: 'start', width: '120px' }}>{module.createdDate}</td>
                                    <td style={{ textAlign: 'start', width: '120px' }}>{module.targetDate}</td> */}
                                    <td style={{ textAlign: 'center', width: '8px' }}>
                                        {module.status === "pending" ? <span className="badge badge-pill badge-danger border-0" style={{ textTransform: "capitalize" }}>{module.status}</span>
                                            : <span className="badge badge-pill badge-success border-0" style={{ textTransform: "capitalize" }}>{module.status}</span>}
                                    </td>
                                    <td style={{ textAlign:'center',width:'10px' }}>
                                        <div className="dropdown show">{/* eslint-disable-next-line */}
                                            <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                            <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo"  style={{ width: '20px', height: '20px',borderRadius:'0' }} />
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0' }}>
                                                <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "green" }} onClick={(event) => handleOpen("view_details", index)}>{VIEW_DETAILS}</button>
                                                <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#76C54E" ,color:'white'}} onClick={(event) => handleOpen("modify", index)}>{EDIT}</button>
                                                <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#3DA7BF",color:'white' }} >{getUser.user.role === "admin" ? <Link to={{ pathname: '/viewManageTasks', state: { id: state.modules[index].moduleId, title: state.modules[index].moduleDesc, ideaId: state.modules[index].ideaId } }} style={{ color: 'white' }}>{VIEWMAINTASKS}</Link>
                                                    : <Link to={{ pathname: '/viewMainTasks', state: { id: state.modules[index].moduleId, title: state.modules[index].moduleDesc, ideaId: state.modules[index].ideaId,startDate: state.modules[index].startDate,targetDate: state.modules[index].targetDate, } }} style={{ color: 'white' }}>{VIEWMAINTASKS}</Link>}</button>
                                                <button className="dropdown-item badge badge-pill badge-secondary text-center" style={{ backgroundColor: "#227D98",color:'white' }} onClick={(event) => handleOpen("addMainTask", index)}>{NEWMAINTASK}</button>
                                                {(getUser.user.empId === module.createdBy && module.status === "pending") ? <button className="dropdown-item badge badge-pill badge-danger text-center" style={{ backgroundColor: '#ED7173',color:'white'}} onClick={(event) => handleOpen("Delete", index)}>{DELETE}</button> : null}
                                            </div>
                                        </div>

                                    </td>
                                </tr>
                            )
                        }) : null}
                </tbody>
            </table>}
        {
            open.action === "addMainTask" ? <AddMainTask open={open.status} handleClose={handleClose} data={moduleInfo} handleModalClose={handleModalClose}
            /> : null
        }
        {
            open.action === "modify" ? <ModifyModule open={open.status} handleClose={handleClose} data={moduleInfo} handleModalClose={handleModalClose}
            /> : null
        }
        {
            open.action === "Delete" ? <CheckCondition open={open.status} handleClose={handleClose} data={moduleInfo} handleModalClose={handleModalClose}
            /> : null
        }
        {
            open.action === "view_details" ? <MainTaskInfo open={open.status} handleClose={handleClose} data={moduleInfo} handleModalClose={handleModalClose}
            /> : null
        }
    </div>
}
