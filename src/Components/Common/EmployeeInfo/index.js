import React, { useEffect, useReducer, useState } from "react";
// import {  useSelector } from "react-redux";
import SideNavigation from "../SideNav";
import RootLoader from "../Loader/RootLoader";
import TopNavWithOutProject from '../../UserModule/Utility/TopNav/topnav';
import { empInfoReducer, initialState } from "./empInfoReducer";
import EmpManageTasks from "./empManageTasks";
import EmpProjects from "./empProjects";
import EmpRoadBlocks from "./empRoadBlocks";
import EmpSubTasks from "./empSubtasks";
import { getTasksCount } from "./network";
import { MODULES, MAINTASKS, ROADBLOCKS, PROJECTS,AWARDS } from "../Headers";
import EmpAwards from "./empAwards";
import { getToken } from '../LocalStorage';



export default function EmployeeInfo(){
    // const getUser = useSelector(state => state.auth)
    // const dispatch =useDispatch();
    const [state, dispatch] = useReducer(empInfoReducer, initialState)
    const [check, setCheck] = useState("Sub Tasks")
    var data = {
        id: getToken('kudo_id'),
        name:getToken('kudo_name'),
        designation:getToken('kudo_designation'),
        role: getToken('kudo_role'),
        dispatch:dispatch //For tabs 
    }
    useEffect(() => {
        getTasksCount(dispatch, data.id);
        // eslint-disable-next-line
    }, [])
    // const info = useSelector(state => state.subtask)
    return (
        <div className="container-scroller">
            <TopNavWithOutProject />
            <div className="container-fluid page-body-wrapper">
            <SideNavigation />
                <div className="main-panel">
                <div className="p-4">
              <div className="row" style={{ backgroundImage: "linear-gradient(135deg,#2DCE8B, #2DCECB)", marginTop: '-35px', }} >
                <div className="col-sm-6 col-md-6 col-lg-3 mt-4 mb-4 " >
                  <div className="card" style={{ borderRadius: '20px' }}>
                    <div className="content" >
                      <div className="row" >
                        <div className="col-sm-8 ">
                          <div className="detail p-4">
                            <p>{MODULES}</p>
                            <span className="number">{state.tasksCount.subTaskCount}</span>
                          </div>
                        </div>
                        <div className="col-md-3 row p-4">
                          <div className="icon-big text-center">
                            <img src="images/common/pending.svg" alt="logo" style={{ width: '45px', height: '45px' }} />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div> 
                <div className="col-sm-6 col-md-6 col-lg-3 mt-4 mb-4 " >
                  <div className="card " style={{ borderRadius: '20px' }}>
                    <div className="content" >
                      <div className="row" >

                        <div className="col-sm-8 ">
                          <div className="detail p-4">
                            <p>{MAINTASKS}</p>
                            <span className="number">{state.tasksCount.mainTaskCount}</span>
                          </div>
                        </div>
                        <div className="col-md-3 row p-4">
                          <div className="icon-big text-center">
                            <img src="images/common/pending.svg" alt="logo" style={{ width: '45px', height: '45px' }} />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3 mt-4 mb-4 " >
                  <div className="card" style={{ borderRadius: '20px' }}>
                    <div className="content" >
                      <div className="row" >
                        <div className="col-sm-8 ">
                          <div className="detail p-4">
                            <p>{PROJECTS}</p>
                            <span className="number">{state.tasksCount.IdeaCount}</span>
                          </div>
                        </div>
                        <div className="col-md-3 row p-4">
                          <div className="icon-big text-center">
                            <img src="images/common/projects.svg" alt="logo" style={{ width: '45px', height: '45px' }} />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3 mt-4 mb-4 " >
                  <div className="card" style={{ borderRadius: '20px' }}>
                    <div className="content" >
                      <div className="row" >

                        <div className="col-sm-8 ">
                          <div className="detail p-4">
                            <p>{ROADBLOCKS}</p>
                            <span className="number">{state.tasksCount.RoadBlockCount}</span>
                          </div>
                        </div>
                        <div className="col-md-3 row p-4">
                          <div className="icon-big text-center">
                            <img src="images/common/roadblock.svg" alt="logo" style={{ width: '45px', height: '45px' }} />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>
                    <div className="mt-0">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                            <div className="p-2 column">
                            <div><span>Employee Name :   {data.name}</span></div>
                            {/* <div><span>Designation :   {data.designation}</span></div> */}
                            <div><span>Role : {data.role}  </span></div>
                            </div>
                                <div className="card-body">
                                    <div className="row">
                                        <ul className="nav nav-tabs card-header-tabs card-title ">
                                            <li className="" key={'3'}>
                                                <button className={check === "Sub Tasks" ? "nav-link font-weight-bold text-success active" : "nav-link font-weight-bold text-dark"} onClick={() => setCheck("Sub Tasks")}><u>{MODULES}</u></button>
                                            </li>
                                            <li className="" key={'2'}>
                                                <button className={check === "Manage Tasks" ? "nav-link font-weight-bold text-success active" : "nav-link font-weight-bold text-dark"} onClick={() => setCheck("Manage Tasks")}><u>{MAINTASKS}</u></button>
                                            </li>
                                            <li className="" key={'1'}>
                                                <button className={check === "Projects" ? "nav-link font-weight-bold text-success active" : "nav-link font-weight-bold text-dark"} onClick={() => setCheck("Projects")}><u>{PROJECTS}</u></button>
                                            </li>
                                            <li className="" key={'4'}>
                                                <button className={check === "Road Blocks" ? "nav-link font-weight-bold text-success active" : "nav-link font-weight-bold text-dark"} onClick={() => setCheck("Road Blocks")}><u>{ROADBLOCKS}</u></button>
                                            </li>
                                            <li className="" key={'5'}>
                                                <button className={check === "Awards" ? "nav-link font-weight-bold text-success active" : "nav-link font-weight-bold text-dark"} onClick={() => setCheck("Awards")}><u>{AWARDS}</u></button>
                                            </li>
                                        </ul>
                                    </div>
                                    {
                                        state.isLoading ? <RootLoader /> :
                                        {
                                            'Projects': <EmpProjects data={data}/>,
                                            'Manage Tasks': <EmpManageTasks data={data}/>,
                                            'Sub Tasks': <EmpSubTasks data={data}/>,
                                            'Road Blocks': <EmpRoadBlocks data={data}/>,
                                            'Awards':<EmpAwards data={data}/>

                                        }[check] 
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