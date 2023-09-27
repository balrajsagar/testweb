import React, { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
// import { MDBTable } from 'mdbreact';
import $ from "jquery";
import { empInfoReducer, initialState } from "./empInfoReducer";
import { getManageTasks, getMainTaskMessages} from "./network";
// import { Link } from "react-router-dom";
import RootLoader from "../Loader/RootLoader";
import MainTaskChatBox from "../ChatMainTask";
import AddSubTask from "../SubTaskModals/addSubTask";
import MainTaskVerify from "../TaskVerify/mainTaskVerify";
import {
  MAINTASKPROGRESS,
  MAINTASKNAME,
  VERIFY,
  MAINTASK_DESCRIPTION,
  ASSIGNED_BY,
  ACTION,
  CHAT,
  SCRUM_MASTER,
 ACTION_ICON
} from "../Headers";

export default function EmpManageTasks(props) {
  const getUser = useSelector((state) => state.auth);
  const [state, dispatch] = useReducer(empInfoReducer, initialState);
  const [open, setOpen] = useState({ status: false, index: 0 });
  const [cardInfo, setCardInfo] = useState();
  useEffect(() => {
    if (props.data !== undefined && props.data !== "") {
      getManageTasks(dispatch, getUser.user, props.data.id, props.data.role);
      getMainTaskMessages(dispatch, getUser.user);
    }
    // eslint-disable-next-line
  }, [props.data]);
  useEffect(() => {
    if (state.manageTasks.length >= 0) {
      $(document).ready(function () {
        window.$("#example").DataTable({
          destroy: true,
          retrieve: true,
          fixedHeader: true,
        });
      });
    }
    //  eslint-disable-next-line
  }, [state.manageTasks]);
  const handleOpen = (action, index, sno, us_id) => {
    var info;
    setOpen({ status: true, index: index, action: action });
    if (action === "addSubtask") {
      info = { mainTaskId: state.manageTasks[index].taskid };
    } else if (action === "Verify") {
      info = {
        mainTaskId: state.manageTasks[index].taskid,
        title: state.manageTasks[index].tasktitle,
        action: action,
      };
    } else {
      info = { action: action, id: us_id, sno: sno };
    }
    setCardInfo(info);
  };
  const handleClose = () => {
    setOpen({ status: false, index: 0 });
    getManageTasks(
      props.data.dispatch,
      getUser.user,
      props.data.id,
      props.data.role
    );
    getMainTaskMessages(dispatch, getUser.user);
  };
  const handleModalClose = () => {
    setOpen({ status: false, index: 0 });
  };

  const getMessagesCount = (data, msg, task, empId, us_id) => {
    const msgCount = msg
      .filter(
        (message) =>
          message.readBy.split(",").indexOf(empId) === -1 &&
          message.messagedBy !== empId &&
          message.groupId === task.taskid
      )
      .map((messages, i) => {
        // eslint-disable-next-line
        return i, messages;
      });
    return (
      <i>
        {/* {msgCount.length > 0 ? msgCount.length : null} */}
        {msgCount.length > 0 ? (
          <div className="row">
            <img
              src="images/common/chat.svg"
              title={CHAT}
              alt="logo"
              style={{ width: "20px", height: "20px" }}
              onClick={(event) => handleOpen("maintask", data, msgCount, us_id)}
            />
            <span
              style={{ color: "red", fontWeight: "bold", marginLeft: "-2px" }}
            >
              {msgCount.length}
            </span>
          </div>
        ) : (
          <div className="row">
            <img
              src="images/common/chat.svg"
              title={CHAT}
              alt="logo"
              style={{ width: "20px", height: "20px" }}
              onClick={(event) => handleOpen("maintask", data, msgCount, us_id)}
            />
          </div>
        )}
      </i>
    );
  };

  return (
    <div className="table-responsive">
      {state.isLoading ? (
        <RootLoader />
      ) : (
        <table
          search="true"
          id="example"
          className="table table-striped table-bordered"
          data-pagination="true"
        >
          <thead style={{ backgroundColor: "#F4FAF7" }}>
            <tr>
              {/* <th>Task ID</th> */}
              <th>{MAINTASKNAME}</th>
              <th>{MAINTASK_DESCRIPTION}</th>
              <th>Created Date</th>
              {/* <th>Assigned To</th> */}
              <th>{ASSIGNED_BY}</th>
              <th>{MAINTASKPROGRESS}</th>
              {/* <th>{TIME_LEFT}</th> */}
              {/* <th>Status</th> */}
              <th>{ACTION}</th>
              <th>{CHAT}</th>
            </tr>
          </thead>
          <tbody>
            {state.manageTasks !== []
              ? state.manageTasks.map((tasks, index) => {
                  return (
                    <tr key={index}>
                      {/* <td style={{ textAlign: 'center' }}>{tasks.taskid}</td> */}
                      <td>
                        <b>{tasks.tasktitle}</b>
                      </td>
                      <td>{tasks.taskdescription}</td>
                      <td>{tasks.targettime}</td>
                      {/* <td  style={{textTransform:"capitalize"}}>{tasks.assigntto}</td> */}
                      <td>{tasks.assignby}</td>
                      <td>{tasks.taskStatus}%</td>
                      {/* {tasks.completeStatus === "pending" ? <td style={{ width: '100px' }}>{tasks.timeLeft}</td> : <td style={{ width: '100px' }}>{tasks.extraHours}</td>} */}
                      {/* <td style={{ textAlign: 'center' }}>
                                        {tasks.completeStatus === "pending" ? <span className="badge badge-pill badge-danger" style={{width:'100px'}}>Pending</span>
                                            : <span className="badge badge-pill badge-success" style={{width:'100px'}}>Completed</span>}
                                    </td> */}

                      <td style={{ textAlign: "center", width: "10px" }}>
                        <div className="dropdown show">
                          {/* eslint-disable-next-line */}
                          <a
                            href="#"
                            role="button"
                            id="dropdownMenuLink"
                            data-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <img
                              src="images/common/actionmenu.png"
                              alt="logo"
                              title={ACTION_ICON}
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "0",
                              }}
                            />
                          </a>
                          <div
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuLink"
                            style={{
                              backgroundColor: "transparent",
                              border: "0",
                            }}
                          >
                            {tasks.completeStatus === "pending" ? (
                              <div>
                                {/* {getUser.user.role === "admin" ?<button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#9a7b78",color:'white' }}><Link to={{ pathname: '/subTasks', state: { id: state.manageTasks[index].taskid, title: state.manageTasks[index].tasktitle } }} style={{ color: 'white' }}>{VIEWSUBTASKS}</Link></button>:
                                                        <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#9a7b78",color:'white' }}><Link to={{ pathname: '/viewSubTasks', state: { id: state.manageTasks[index].taskid, title: state.manageTasks[index].tasktitle } }} style={{ color: 'white' }}>{VIEWSUBTASKS}</Link></button>} */}
                                {/* <button className="dropdown-item badge badge-pill badge-secondary text-center" onClick={(event) => handleOpen("addSubtask", index)}>AddSubtask</button> */}
                              </div>
                            ) : (
                              <div>
                                {/* {getUser.user.role === "admin" ?<button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#9a7b78",color:'white' }}><Link to={{ pathname: '/subTasks', state: { id: state.manageTasks[index].taskid, title: state.manageTasks[index].tasktitle } }} style={{ color: 'white' }}>{VIEWSUBTASKS}</Link></button>:
                                                        <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#9a7b78",color:'white' }}><Link to={{ pathname: '/viewSubTasks', state: { id: state.manageTasks[index].taskid, title: state.manageTasks[index].tasktitle } }} style={{ color: 'white' }}>{VIEWSUBTASKS}</Link></button>} */}
                                {/* <button className="dropdown-item badge badge-pill badge-secondary text-center" onClick={(event) => handleOpen("addSubtask", index)}>AddSubtask</button> */}
                                {getUser.user.role !== SCRUM_MASTER ||
                                getUser.user.role === "admin" ? (
                                  <button
                                    className="dropdown-item badge badge-pill badge-success text-center"
                                    style={{
                                      backgroundColor: "#6BC2D3",
                                      color: "white",
                                    }}
                                    onClick={(event) =>
                                      handleOpen("Verify", index)
                                    }
                                  >
                                    {VERIFY}
                                  </button>
                                ) : null}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      {/* <td style={{width:'8px'}}><button style={{ backgroundColor: 'transparent', border: '0' }} type="button" > <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={(event) => handleOpen("maintask", index)} /></button></td> */}
                      <td >
                                                                        <button type="button" style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0",marginLeft:'15px' }} >
                                                                            {
                                                                                getMessagesCount(index, state.mainTaskMessages, tasks, getUser.user.empId, tasks.id)
                                                                            }
                                                                        </button>
                                                                    </td>
                      {/* onClick={() => handleOpenChat("subtask", id)} */}
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      )}
      {open.action === "maintask" ? (
        <MainTaskChatBox
          open={open.status}
          handleClose={handleClose}
          data={cardInfo}
          handleModalClose={handleModalClose}
        />
      ) : null}
      {open.action === "addSubtask" ? (
        <AddSubTask
          open={open.status}
          handleClose={handleClose}
          data={cardInfo}
          handleModalClose={handleModalClose}
        />
      ) : null}
      {open.action === "Verify" ? (
        <MainTaskVerify
          open={open.status}
          handleClose={handleClose}
          data={cardInfo}
          handleModalClose={handleModalClose}
        />
      ) : null}
      {/* </MDBTable> */}
    </div>
  );
}
