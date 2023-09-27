import React, { useEffect, useReducer, useState } from 'react';
// import { MDBTable } from 'mdbreact';
import $ from 'jquery';
import { useSelector } from 'react-redux';
import { moduleReducer, initialState } from './moduleReducer';
import { getModules } from './network';
import RootLoader from '../../Common/Loader/RootLoader';
import { Link } from 'react-router-dom';
import AddMainTask from '../../Common/TasksModals/addMainTask';
import Header from '../../Common/TopNav';
import AdminSideBar from '../Utility/SideNav';
import CheckCondition from '../../Common/Modules/CheckCondition';
import ModifyModule from '../../Common/Modules/modifyModule';
import EmployeesInvolved from '../../UserModule/Modules/employees'
import { MODULES, VIEWMAINTASKS, NEWMAINTASK, MODULENAME, EDIT, DELETE,  ACTION, ACTION_ICON } from '../../Common/Headers';

export default function AdminModules() {
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
            var info = { moduleId: state.modules[index].moduleId, ideaId: state.modules[index].ideaId, action: action }
        }else if(action === "modify"){
            info = { id: state.modules[index].moduleId, title: state.modules[index].moduleDesc,targetDate: state.modules[index].targetDate }
        }
        else if(action === "employees"){
            info={ moduleId: state.modules[index].moduleId}
       }
        else {
             info = {id: state.modules[index].moduleId,title: state.modules[index].moduleDesc, action: action , ideaId: state.modules[index].ideaId }
        }
        setModuleInfo(info)
    };
    const handleClose = () => {
        if(moduleInfo.action === "addMainTask"){
            setOpen({ status: false, index: 0 });
        }else{
        // state.modules=[];
        setOpen({ status: false, index: 0 });
        getModules(dispatch, getUser.user);
        }
        // window.location.reload();
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
    }
    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <AdminSideBar />
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
                                        {/* <MDBTable> */}
                                            <table
                                                search="true"
                                                id="example" className="table table-striped table-bordered"
                                                data-pagination="true"
                                            >
                                                <thead style={{ backgroundColor: '#F4FAF7' }}>
                                                    <tr>
                                                        {/* <th>S.No</th> */}
                                                        {/* <th>Module ID</th> */}
                                                        <th>{MODULENAME}</th>
                                                        {/* <th>{PROJECTNAME}</th>
                                                        <th>{CREATED_BY}</th>
                                                        <th>{CREATED_DATE}</th> */}
                                                        <th>Squad</th>
                                                        <th>{ACTION}</th>
                                                    </tr>
                                                </thead>
                                                    <tbody>
                                                        {
                                                            state.modules !== [] ? state.modules.map((module, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        {/* <td className="py-1" style={{textAlign:'end',width:'10px'}}>{index + 1}</td> */}
                                                                        {/* <td>{module.moduleId}</td> */}
                                                                        <td className='link' style={{textTransform:"capitalize"}} data-toggle="tooltip" data-placement="left" title={"Epic Name       :"+module.ideaTitle+"\n\nStart Date        :"+module.startDate+"\n\nEnd Date          :"+module.targetDate+"\n\nCreated By        :"+module.createdBy+"\n\nCreated Date     :"+module.created_on} > {getUser.user.role === "admin" ? <Link to={{ pathname: '/viewManageTasks', state: { id: state.modules[index].moduleId, title: state.modules[index].moduleDesc, ideaId: state.modules[index].ideaId } }} style={{ color: 'green',fontWeight:'bold' }}>{module.moduleDesc}</Link>
                                                                                            : <Link to={{ pathname: '/viewMainTasks', state: { id: state.modules[index].moduleId, title: state.modules[index].moduleDesc, ideaId: state.modules[index].ideaId } }} style={{ color: 'green',fontWeight:'bold' }}>{module.moduleDesc}</Link>}</td>
                                                                        {/* <td style={{textTransform:"capitalize"}}>{module.ideaTitle}</td>
                                                                        <td>{module.createdBy}</td>
                                                                        <td style={{textAlign:'start'}}>{module.created_on}</td> */}
                                                                        <td>
                                                                    <input type="image" src="images/common/teams.png" alt="logo" width="25" height="25" onClick={(event) => handleOpen("employees", index)}/>
                                                                    </td>
                                                                    <td style={{ textAlign:'center',width:'10px' }}>
                                                                            <div className="dropdown show" >{/* eslint-disable-next-line */}
                                                                                <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                                                                <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo"  style={{ width: '20px', height: '20px',borderRadius:'0' }} />
                                                                                </a>
                                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{backgroundColor:'transparent',border:'0'}}>                                                                                <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#76C54E" ,color:'white'}} onClick={(event) => handleOpen("modify", index)}>{EDIT}</button>
                                                                                    <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#3DA7BF",color:'white' }} >
                                                                                        {getUser.user.role === "admin" ? <Link to={{ pathname: '/viewManageTasks', state: { id: state.modules[index].moduleId, title: state.modules[index].moduleDesc, ideaId: state.modules[index].ideaId } }} style={{ color: 'white' }}>{VIEWMAINTASKS}</Link>
                                                                                            : <Link to={{ pathname: '/viewMainTasks', state: { id: state.modules[index].moduleId, title: state.modules[index].moduleDesc, ideaId: state.modules[index].ideaId } }} style={{ color: 'white' }}>{VIEWMAINTASKS}</Link>}</button>
                                                                                    <button className="dropdown-item badge badge-pill badge-secondary text-center" style={{ backgroundColor: "#227D98",color:'white' }} onClick={(event) => handleOpen("addMainTask", index)}>{NEWMAINTASK}</button>
                                                                                    <button className="dropdown-item badge badge-pill badge-danger text-center" style={{ backgroundColor: '#ED7173',color:'white'}} onClick={(event) => handleOpen("Delete", index)}>{DELETE}</button>
                                                                                </div>
                                                                            </div>

                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }) : null}
                                                    </tbody>
                                            </table>
                                        {/* </MDBTable> */}
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}