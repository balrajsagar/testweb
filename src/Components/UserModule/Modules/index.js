import React, { useEffect, useReducer, useState } from 'react';
import SideBar from '../Utility/SideNav';
import TopNav from '../Utility/TopNav';
// import { MDBTable } from 'mdbreact';
import $ from 'jquery';
import { useSelector } from 'react-redux';
import { moduleReducer, initialState } from './moduleReducer';
import { getModules } from './network';
import RootLoader from '../../Common/Loader/RootLoader';
import { Link } from 'react-router-dom';
import AddMainTask from '../../Common/TasksModals/addMainTask';
import ModifyModule from '../../Common/Modules/modifyModule';
import { MODULES, MODULENAME, NEWMAINTASK, VIEWMAINTASKS, EDIT, DELETE, ACTION,VIEW_DETAILS, ACTION_ICON } from '../../Common/Headers'
import CheckCondition from '../../Common/Modules/CheckCondition';
import EmployeesInvolved from './employees';
import MainTaskInfo from '../../Common/TasksModals/mainTaskInfo';


export default function Modules() {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(moduleReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [moduleInfo, setModuleInfo] = useState()
    useEffect(() => {
        getModules(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (state.modules.length > 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                })
            })
        }
    }, [state.modules])
    const handleOpen = (action, index) => {
        setOpen({ status: true, action: action, index: index });
        if (action === "addMainTask") {
            var info = { moduleId: state.modules[index].moduleId, ideaId: state.modules[index].ideaId }
        }
        else if (action === "employees") {
            info = { moduleId: state.modules[index].moduleId }
        }
        else if (action === "modify") {
            info = { id: state.modules[index].moduleId, title: state.modules[index].moduleDesc, targetDate: state.modules[index].targetDate, startDate: state.modules[index].startDate }
        }
        else if (action === "view_details") {
            var view_status = "sprintInfo"
            info = { view: view_status,id: state.modules[index].moduleId, title: state.modules[index].moduleDesc, targetDate: state.modules[index].targetDate, startDate: state.modules[index].startDate,epic:state.modules[index].ideaTitle,createdBy:state.modules[index].createdBy,created_on:state.modules[index].created_on }
        }
         else {
            info = { id: state.modules[index].moduleId, title: state.modules[index].moduleDesc, action: action, ideaId: state.modules[index].ideaId }
        }
        setModuleInfo(info)
    };
    const handleClose = () => {
        // state.modules=[];
        setOpen({ status: false, index: 0 });
        getModules(dispatch, getUser.user);
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
    }
    console.log(state.modules)
    return (
        <div className="container-scroller">
            <TopNav />
            <div className="container-fluid page-body-wrapper">
                <SideBar />
                <div className="main-panel">
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <h4 className="card-title">{MODULES}</h4>


                                    </div>
                                    {state.isLoading ? <RootLoader /> :
                                        <div className="table-responsive">
                                            <table
                                                search="true"
                                                id="example" className="table table-striped table-bordered"
                                                data-pagination="true"
                                            >
                                                <thead style={{ backgroundColor: '#F4FAF7' }}>
                                                    <tr>
                                                        {/* <th>S.No</th> */}
                                                        {/* {<th>Module ID</th> */}
                                                        <th>{MODULENAME}</th>
                                                        {/* <th>{PROJECTNAME}</th> */}
                                                        {/* <th>{CREATED_BY}</th>
                                                        <th>{CREATED_DATE}</th> */}
                                                        {/* <th>{STATUS}</th> */}
                                                        <th>Squad</th>
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
                                                                    {/* <td className="py-1 " style={{ textAlign: 'end', width: '10px' }}>{index + 1}</td> */}
                                                                    {/* <td>{module.moduleId}</td> */}
                                                                    <td className='link' style={{ fontWeight: 'bold' }} data-toggle="tooltip" data-placement="left" title={"Epic Name       :" + module.ideaTitle + "\n\nStart Date        :" + module.startDate + "\n\nEnd Date          :" + module.targetDate + "\n\nCreated By        :" + module.createdBy + "\n\nCreated Date     :" + module.created_on}><Link to={{ pathname: '/viewMainTasks', state: { id: state.modules[index].moduleId, title: state.modules[index].moduleDesc, ideaId: state.modules[index].ideaId,startDate:state.modules[index].startDate,targetDate:state.modules[index].targetDate } }} >{module.moduleDesc.concat('['+month+'.'+date+'.'+year+'-'+month1+'.'+date1+'.'+year1+']')}</Link></td>
                                                                    {/* <td>{module.ideaTitle}</td> */}
                                                                    {/* <td>{module.createdBy}</td>
                                                                    <td style={{ textAlign: 'start', width: '120px' }}>{module.created_on}</td> */}
                                                                    {/* <td style={{ textAlign: 'center', width: '8px' }}>
                                                                        {module.status === "pending" ? <button className="badge badge-pill badge-danger border-0" >{module.status}</button>
                                                                            : <button className="badge badge-pill badge-success border-0" >{module.status}</button>}
                                                                    </td> */}
                                                                    <td>
                                                                        <input type="image" src="images/common/teams.png" alt="logo" width="25" height="25" onClick={(event) => handleOpen("employees", index)} />
                                                                    </td>
                                                                    <td style={{ textAlign:'center',width:'10px' }}>
                                                                        <div className="dropdown show">{/* eslint-disable-next-line */}
                                                                            <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                                                             
                                                                                <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo"  style={{ width: '20px', height: '20px',borderRadius:'0' }} />
                                                                                
                                                                            </a>
                                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0' }}>
                                                                                <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#203B5A",color:'white' }} onClick={(event) => handleOpen("view_details", index)}>{VIEW_DETAILS}</button>

                                                                                <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#76C54E" ,color:'white'}} onClick={(event) => handleOpen("modify", index)}>{EDIT}</button>
                                                                                <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#3DA7BF",color:'white' }} ><Link to={{ pathname: '/viewMainTasks', state: { id: state.modules[index].moduleId, title: state.modules[index].moduleDesc, ideaId: state.modules[index].ideaId, startDate: state.modules[index].startDate, targetDate: state.modules[index].targetDate } }} style={{ color: 'white' }}>{VIEWMAINTASKS}</Link></button>
                                                                                <button className="dropdown-item badge badge-pill badge-secondary text-center" style={{ backgroundColor: "#227D98",color:'white' }} onClick={(event) => handleOpen("addMainTask", index)}>{NEWMAINTASK}</button>
                                                                                {(getUser.user.empId === module.assignbyId && module.status === "pending") ? <button className="dropdown-item badge badge-pill badge-danger text-center" style={{ backgroundColor: '#ED7173',color:'white'}} onClick={(event) => handleOpen("Delete", index)}>{DELETE}</button> : null}
                                                                            </div>
                                                                        </div>

                                                                    </td>
                                                                </tr>
                                                            )
                                                        }) : null}
                                                </tbody>
                                            </table>
                                        </div>
                                    }
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
                                        open.action === "employees" ? <EmployeesInvolved open={open.status} handleClose={handleClose} data={moduleInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                     {
                                        open.action === "view_details" ? <MainTaskInfo open={open.status} handleClose={handleClose} data={moduleInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}