/* 
FileName:index.js
purpose:To se all the archive data
Developers:Naveen Kumar Gade[NKG],Satya Sidda[SS]

 */
import React from 'react';
import SideBar from '../Utility/SideNav';
import TopNav from '../Utility/TopNav';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Archive1 from './Archive1';
import KanbanArchive from './kanbanArchive';
import { KANBAN, MODULE } from '../../Common/Headers';


export default function Archive() {

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
                            <Tab eventKey="sprint" title={`${MODULE}s`}>
                                <Archive1 />
                            </Tab>
                            <Tab eventKey="profile" title={KANBAN}>
                                <KanbanArchive />
                            </Tab>

                        </Tabs>
                    </div>
                </div>
            </div>
        </div>

    )
}