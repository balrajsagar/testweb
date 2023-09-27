/* 
FileName:index.js
purpose:To se all the archive data
Developers:Naveen Kumar Gade[NKG],Satya Sidda[SS]

 */
import React, { useEffect, useReducer, useState } from 'react';
// import { MDBTable } from 'mdbreact';
import { useSelector } from 'react-redux';
import { tasksReducer, initialState } from './tasksReducer';
import { getUserStoriesByKanban, getAllTaskMessages } from './network';
import RootLoader from '../../Common/Loader/RootLoader';
import MainTaskInfo from '../../Common/TasksModals/mainTaskInfo';
import { getSubStringId } from '../../Common/SubStringConvert';
import ChatBox from "../../Common/ChatMainTask";
import TaskInfo from "../UserDashboard/taskInfo";
import { CHAT, COMMENTS } from '../../Common/Headers';

export default function KanbanArchive() {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(tasksReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [cardInfo, setCardInfo] = useState()
    const [searchWord, setSearchWord] = useState('')
    const [chatOpen, setChatOpen] = useState(false);
    useEffect(() => {
        getUserStoriesByKanban(dispatch, getUser.user)
        getAllTaskMessages(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [])
    const handleOpen = (action, index, sno) => {
        var info
        setOpen({ status: true, index: index, action: action });

        if (action === "unassigned_taskInfo") {

            var view_status1 = "taskInfo"
            info = {
                view: view_status1,
                projectName: index.projectitle,
                moduleName: index.moduletitle,
                title: index.tasktitle,
                description: index.taskdescription,
                taskId: index.taskid,
                targetDate: index.targettime,
                timeLeft: index.timeLeft,
                extraHours: index.extraHours,
                status: index.completeStatus,
                createdDate: index.assignedon,
                taskProgress: index.taskStatus,
                storyPoints: index.storyPoints,
                acceptanceCriteria: index.acceptanceCriteria,
                assignedTo: index.assignto,
                assignedBy: index.assignby,
                completedDate: index.modifiedDate,
                completedStatus: index.completeStatus,
            }
        }
        else if (action === "commentInfo") {
            info = {
                title: index.tasktitle,
                id: index.taskid,
            }
        }
        else {
            info = { action: action, id: state.currentTasks[index].taskid, sno: sno }
        }
        setCardInfo(info)
    };
    const handleClose = () => {
        setOpen({ status: false, index: 0 });
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
    }

    const handleOpenChat = (action, id, sno) => {
        setChatOpen(true);
        // updateChat(sno,dispatch,getUser.user)
        var info = { action: action, id: id, sno: sno };
        setCardInfo(info);
    };

    const handleChatClose = () => {
        setChatOpen(false);
        getAllTaskMessages(dispatch, getUser.user);
    };

    const getMessagesCount = (id, msg, empId) => {
        const msgCount = msg.filter(message => message.readBy.split(",").indexOf(empId) === -1 && message.messagedBy !== empId && message.groupId === id).map((messages, i) => {
            // eslint-disable-next-line
            return i, messages
        })
        return (
            <i>
                {
                    msgCount.length > 0 ?
                        <div className="row">
                            <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px', marginLeft: "-5px" }}
                                onClick={(event) => handleOpenChat("maintask", id, msgCount)} />
                            <span style={{ color: 'red', fontWeight: "bold" }}>{msgCount.length}</span>
                        </div>
                        :
                        <div className="row">
                            <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px', marginLeft: "-5px" }}
                                onClick={(event) => handleOpenChat("maintask", id, msgCount)} />
                        </div>
                }
            </i>
        )
    }
    return (
        <div className="container-scroller">
            
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <h2 className="card-title" style={{ overflowWrap: "break-word", color: 'blue', backgroundColor: 'transparent' }}>KANBAN USER STORIES</h2>
                                    </div>
                                    <div className="d-flex justify-content-end mb-2">

                                        <div class="input-group-prepend">
                                            <span class="text" style={{ color: 'black', paddingRight: 10 }}>Search</span>
                                        </div>
                                        <input type="text" class="form-control" style={{ backgroundColor: 'transparent', borderBottom: '2px solid black', borderTop: '2px solid black', borderLeft: '12x solid black', borderRight: '2px solid black', marginTop: '-5px', width: '450px', height: '35px' }}
                                            onChange={(event) => setSearchWord(event.target.value)}
                                        />

                                    </div>

                                    {state.isLoading ? <RootLoader /> :
                                        <div>
                                            {/* eslint-disable-next-line */}
                                            {state.completedUserStories.length > 0 ? state.completedUserStories.filter((val) => {
                                                if (searchWord === "") {
                                                    return val
                                                } else if (val.tasktitle.toLowerCase().includes(searchWord.toLowerCase())) {
                                                    return val
                                                }
                                            })
                                                .map((tasks, index) => {
                                                    return (
                                                        <div className="col-12" key={tasks.taskid}>
                                                            <div className="card col-12">
                                                                <div className="container-fluid col-12 row" >
                                                                    <div class="d-flex col-12" style={{ padding: 0 }}>
                                                                        <div class="mr-auto p-2">
                                                                            <b style={{ cursor: 'pointer', paddingTop: 10, fontSize: '12px' }} onClick={(event) => handleOpen("unassigned_taskInfo", tasks)}><del> {getSubStringId(getUser.user.corp, 3)}{'-'}{getSubStringId(tasks.taskid, 5)}{'-'}{tasks.tasktitle}</del></b>
                                                                        </div>
                                                                        <button type="button" style={{ backgroundColor: 'transparent', border: "0", marginLeft: 10, width: '10px', padding: "0" }} >
                                                                            {
                                                                                getMessagesCount(tasks.us_id, state.allMessages, getUser.user.empId)
                                                                            }
                                                                        </button>
                                                                        <button style={{
                                                                            border: "0",
                                                                            width: "8px",
                                                                            height: "30px",
                                                                            backgroundColor: "transparent",
                                                                        }}
                                                                            type="button"
                                                                            onClick={() =>
                                                                                handleOpen(
                                                                                    "commentInfo", tasks
                                                                                )
                                                                            }
                                                                        >
                                                                            <img
                                                                                src="images/common/comments.svg"
                                                                                title={COMMENTS}
                                                                                alt="logo"
                                                                                style={{ width: "20px", height: "25px", marginLeft: "-17px" }}
                                                                            />
                                                                        </button>


                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                    )
                                                }
                                                ) : null}
                                            {chatOpen ? (
                                                <ChatBox
                                                    open={chatOpen}
                                                    handleClose={handleChatClose}
                                                    data={cardInfo}
                                                    handleModalClose={handleChatClose}
                                                />
                                            ) : null}
                                            {
                                                open.action === "unassigned_taskInfo" ? <MainTaskInfo open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                                /> : null
                                            }

                                            {open.action === "commentInfo" ? (
                                                <TaskInfo
                                                    open={open.status}
                                                    handleClose={handleClose}
                                                    data={cardInfo}
                                                    handleModalClose={handleModalClose}
                                                />
                                            ) : null}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          

    )
}
