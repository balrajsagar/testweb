import React, { useEffect, useReducer, useState } from 'react';
// import { MDBTable } from 'mdbreact';
import $ from 'jquery';
import { useSelector } from 'react-redux';
import { moduleReducer, initialState } from './moduleReducer';
import { getModules } from './network';
import RootLoader from '../../Common/Loader/RootLoader';
import Header from '../TopNav';
import SideNavigation from '../SideNav';
import AddModule from './addModule';
import ModifyModule from './modifyModule';
import { getToken, setToken } from '../LocalStorage';
import { Link } from 'react-router-dom';
import AddMainTask from '../TasksModals/addMainTask';
import CheckCondition from './CheckCondition';
import EmployeesInvolved from '../../UserModule/Modules/employees'
import { NEWMAINTASK, MODULES, ADDMODULE, MODULENAME, VIEWMAINTASKS, DELETE, EDIT, ACTION, ACTION_ICON,} from '../Headers';

export default function AddModules(props) {
    var data = {
        id: props.location.state.id,
        title: props.location.state.title
    }
    setToken('idea_id', data.id)
    setToken('idea_title', data.title)
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(moduleReducer, initialState)
    const [open, setOpen] = useState({ status: false, action: "", index: 0 })
    const [moduleInfo, setModuleInfo] = useState()

    useEffect(() => {
        if (props.location.data !== undefined && props.location.data !== "") {
            getModules(dispatch, getUser.user, getToken('idea_id'));
        }
        getModules(dispatch, getUser.user, getToken('idea_id'));
        // eslint-disable-next-line
    }, [props.location.data])
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
        //  eslint-disable-next-line 
    }, [state.modules])
    const handleOpen = (action, index) => {
        setOpen({ status: true, action: action, index: index });
        var info;
        if (action === "add") {
            info = { id: getToken('idea_id') }
        } else if (action === "addMainTask") {
            info = { moduleId: state.modules[index].moduleId, ideaId: getToken('idea_id') }
        } 
        else if (action === "employees") {
            info = { moduleId: state.modules[index].moduleId }
        }
        else if (action === "Delete") {
            info = { id: state.modules[index].moduleId, ideaId: state.modules[index].ideaId, title: state.modules[index].moduleDesc, action: action }
        } else {
            info = { id: state.modules[index].moduleId, title: state.modules[index].moduleDesc, targetDate: state.modules[index].targetDate, startDate:state.modules[index].startDate}
        }
        setModuleInfo(info)
    };
    // console.log(state.modules)
    const handleClose = () => {
        // state.modules = [];
        setOpen({ status: false, index: 0 });
        getModules(dispatch, getUser.user, getToken('idea_id'));
        // window.location.reload();
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
    }
    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <SideNavigation />
                <div className="main-panel">
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <div className="row justify-content-between">
                                            <h4 className="card-title">{MODULES}</h4>
                                            <h4 className="card-title text-success">Epic Name : {getToken('idea_title')}</h4>
                                            <div className="d-flex justify-content-end mb-0">
                                                <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" onClick={() => handleOpen("add")}> <img src="images/common/add.png" title={ADDMODULE} alt="logo" style={{ width: '20px', height: '20px' }} /><span className="m-1">{ADDMODULE}</span></button>
                                                {
                                                    open.action === "add" ? <AddModule open={open.status} handleClose={handleClose} data={moduleInfo} handleModalClose={handleModalClose}
                                                    /> : null
                                                }
                                            </div>

                                        </div>
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
                                                        {/* <th >S.No</th> */}
                                                        {/* <th>Module ID</th> */}
                                                        {/* <th>Project Name</th> */}
                                                        <th>{MODULENAME}</th>
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
                                                                    {/* <td className="py-1" style={{ textAlign: 'end', width: '10px' }}>{index + 1}</td> */}
                                                                    {/* <td>{module.moduleId}</td> */}
                                                                    {/* <td style={{textTransform:"capitalize"}}>{getToken('idea_title')}</td> */}
                                                                    <td style={{ textTransform: "capitalize" }} data-toggle="tooltip" data-placement="left" title={"Start Date          :"+module.startDate+"\n\nEnd Date           :"+module.targetDate+"\n\nCreated By        :"+module.createdBy+"\n\nCreated Date     :"+module.created_on}><b>{module.moduleDesc.concat('['+month+'.'+date+'.'+year+'-'+month1+'.'+date1+'.'+year1+']')}</b></td>
                                                                    <td>
                                                                        <input type="image" src="images/common/teams.png" alt="logo" width="25" height="25" onClick={(event) => handleOpen("employees", index)} />
                                                                    </td>
                                                                    {/* <td style={{ textTransform: "capitalize" }}>{module.createdBy}</td>
                                                                    <td style={{ textAlign: 'start', width: '120px' }}>{module.created_on}</td> */}
                                                                    {/* <td style={{ textAlign: 'center', width: '8px' }}>
                                                                        {module.status === "pending" ? <button className="badge badge-pill badge-danger border-0" >{module.status}</button>
                                                                            : <button className="badge badge-pill badge-success border-0" >{module.status}</button>}
                                                                    </td> */}
                                                                    <td style={{ textAlign:'center',width:'10px' }}>
                                                                        <div className="dropdown show">
                                                                            {/* eslint-disable-next-line */}
                                                                            <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                                                            <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo"  style={{ width: '20px', height: '20px',borderRadius:'0' }} />
                                                                            </a>
                                                                            {/* eslint-disable-next-line */}
                                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0' }}>
                                                                                <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#3DA7BF",color:'white' }}>
                                                                                    {getUser.user.role === "admin" ? <Link to={{ pathname: '/viewManageTasks', state: { id: state.modules[index].moduleId, title: state.modules[index].moduleDesc, ideaId: state.modules[index].ideaId, startDate: state.modules[index].startDate, targetDate: state.modules[index].targetDate  } }} style={{ color: 'white' }}>{VIEWMAINTASKS}</Link>
                                                                                        : <Link to={{ pathname: '/viewMainTasks', state: { id: state.modules[index].moduleId, title: state.modules[index].moduleDesc, ideaId: state.modules[index].ideaId,startDate: state.modules[index].startDate, targetDate: state.modules[index].targetDate  } }} style={{ color: 'white' }}>{VIEWMAINTASKS}</Link>}</button>
                                                                                <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#76C54E" ,color:'white'}} onClick={(event) => handleOpen("modify", index)}>{EDIT}</button>
                                                                                <button className="dropdown-item badge badge-pill badge-secondary text-center" style={{ backgroundColor: "#227D98",color:'white' }} onClick={(event) => handleOpen("addMainTask", index)}>{NEWMAINTASK}</button>
                                                                                {(getUser.user.role === "admin" && module.status === "pending") ? <button className="dropdown-item badge badge-pill badge-danger text-center" style={{ backgroundColor: '#ED7173',color:'white'}} onClick={(event) => handleOpen("Delete", index)}>{DELETE}</button> :
                                                                                    (getUser.user.empId === module.assignbyId && module.status === "pending") ? <button className="dropdown-item badge badge-pill badge-danger text-center" style={{ backgroundColor: '#ED7173',color:'white'}} onClick={(event) => handleOpen("Delete", index)}>{DELETE}</button> : null}
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
                                        open.action === "modify" ? <ModifyModule open={open.status} handleClose={handleClose} data={moduleInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "addMainTask" ? <AddMainTask open={open.status} handleClose={handleClose} data={moduleInfo} handleModalClose={handleModalClose}
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