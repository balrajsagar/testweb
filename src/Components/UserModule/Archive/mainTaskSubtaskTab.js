
import React from 'react';
import SideBar from '../Utility/SideNav';
import TopNav from '../Utility/TopNav';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import KanbanArchive from './kanbanArchive';
import CompletedUserStories from './completedUserStories';
import { MAINTASKS,SUBTASK } from '../../Common/Headers';
import CompletedSubTasks from './completedSubTasks';


export default function MainTaskSubTaskTabs() {
    return (
        <div className="container-scroller">
            <TopNav />
            <div className="container-fluid page-body-wrapper">
                <SideBar />
                <div className="main-panel">
                    <div className="mt-2">
                        <Tabs
                            defaultActiveKey="sprint"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="sprint" title={MAINTASKS}>
                                <CompletedUserStories />
                            </Tab>
                            <Tab eventKey="profile" title={SUBTASK}>
                                <CompletedSubTasks />
                            </Tab>

                        </Tabs>
                    </div>
                </div>
            </div>
        </div>

    )
}