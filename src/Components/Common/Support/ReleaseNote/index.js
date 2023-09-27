import React, { useState }  from 'react';
import '../../../Authentication/LandingPage/style.scss';
import { Link } from 'react-router-dom';
import { APP_NAME, IMG_SRC } from '../../Headers';
import { useSelector } from 'react-redux';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default function ReleaseNote() {

  const webProperties = useSelector(state => state.landingReducer.webProperties)
  const properties = useSelector(state => state.landingReducer.properties)
  const [searchQuery, setSearchQuery] = useState('');
  const releaseNotes = [
    {
      id: 47,
      version: "3.0.23",
      date: "08-30-2023",
      highlights: [
        "The background color can be changed from the Admin Panel's properties.",
        "User efficiency reports have been updated."
      ]
    },
    {
      id: 46,
      version: "3.0.22",
      date: "08-23-2023",
      highlights: [
        "Bug Fixes on All Users (Including non-domain emails) can access the project.",
        "Bug Fixes on Numbers of hours across the Story points.",
        "Bug Fixes on Undefined Issue.",
        "Bug Fixes on Support and Report Bug Issue."
      ]
    },
    {
     id: 45,
      version: "3.0.21",
      date: "08-11-2023",
      highlights: [
        "Timesheets are updated based on individual sprints within the project.",
        "Generate CSV reports for Admin Reports, Agile Usage Reports, and Project Reports.",
        "A roadblock task can be created when moving a task into the 'Blocked' status. Users can reassign the task to the respective developer."
      ]
    },
    {
      id: 44,
      version: "3.0.20",
      date: "08-02-2023",
      highlights: [
        "Display task/userstory hours spent on backlogs, sprint and priority Board.",
        "User story - activity time.",
        "User should be assign when userstory moves to sprint when user not assigned.",
        "Project reports displayed individual working hours and active working users."
      ]
    },
    {
      id: 43,
      version: "3.0.19",
      date: "07-01-2023",
      highlights: [
        "Accounts creation/Edit from Super Admin.",
        "Display all the Accounts Details.",
        "TaskVelocity Reports.",
        "Subtask Archive added.",
        "Sprint Velocity Changed from BarGraph to Line Graph.",
        "TimeSheets Hours display for Individual stories on Sprint Board, Kanban Board and Backlogs.",
        "Bug fix for timesheets (kanban board story not shown in timesheets).",
        "UI Bug Fixes."
      ]
    },
    {
     id: 42,
      version: "3.0.18",
      date: "04-14-2023",
      highlights: [
        "Support Mail Sent for Reopen the Archive Project.",
        "Bug Fixes."
      ]
    },
    {
      id: 41,
      version: "3.0.17",
      date: "03-14-2023",
      highlights: [
        "Task24x7 Production Release was done with the labels.",
        "Agile24x7 production code change along with Task24x7 linked to the same GIT.",
        "Make Single Backend For Both task and Agile.",
        "Archive Projects has been added so that the owner of the project can archive the project.",
        "Priority Levels added in sprint board.",
        "AGroup details are displayed for Roadblocks chat.",
        "Calendar bugs are resolved."
      ]
    },
    {
    id: 40,
      version: "3.0.16",
      date: "02-02-2023",
      highlights: [
        "Kanban board has Archive and user story differentiation in backlog.",
        "Time zone for chats has been made location specific.",
        "Chat group for the entire project created when a project is created and group members are added to the project.",
        "Archive Project is an additional feature with the ability to reinstate the projects from the Admin panel."
      ]
    },
  {    
      id: 39,
      version: "3.0.15",
      date: "01-06-2023",
      highlights: [
        "User stories in To Do shows what project it belongs to and is clickable to take to Active Scrum Board or backlog of that project where the story belongs.",
        "Epic shows the number of active user stories.",
        "Create/Modify the Epic with Target Date.",
        "Kanban Board added to the Side Nav and as a feature independent of Sprint.",
        "Contributor: Number of user stories taken vs completed shown.",
        "Bug Fixes."
      ]
    },
    {
     id: 38,
      version: "3.0.14",
      date: "12-09-2022",
      highlights: [
        "Hide/Un Hide Projects in dashboard - control from Individual user To Do on upper tab.",
        "In Dashboard - Projects display Active User Stories Count and if the project has an Active Sprint.",
        "Active Sprint and number of pending User stories shown at EPIC level.",
        "Remove user story from Sprint back to backlog.",
        "Bug Fixes."
      ]
    },
  {
   id: 37,
      version: "3.0.13",
      date: "11-28-2022",
      highlights: [
        "Active Sprint and number of pending User stories shown at EPIC level.",
        "Bug Fixes."
      ]
    },
    {
    id: 36,
      version: "3.0.12",
      date: "03-18-2022",
      highlights: [
        "Sprint Board or Scrum Board UI is more exposed."
      ]
    },
    {
      id: 35,
      version: "3.0.11",
      date: "03-11-2022",
      highlights: [
        "Calendar event notifications enabled for both web and mobile.",
        "Web notifications enabled for all chats.",
        "Messages display in sorted order in squad chat and chat room.",
        "Team member appreciation through Kudos points enabled for Agile squad."
      ]
    },
    {
      id: 34,
      version: "3.0.10",
      date: "02-25-2022",
      highlights: [
        "Profile shows the type of account (corporate, Free, Paid personal...).",
        "Chat messages show the last message display sorted according to name and time in chat room and personal chat window."
      ]
    },
    {
     id: 33,
      version: "3.0.9",
      date: "02-18-2022",
      highlights: [
        "Working status bar updated to available whenever a person logs into Agile or performs an activity on Active Sprint Board.",
        "Chat response with tag on a particular message in all chat.",
        "Admin level features:",
        "Chat response to a particular message available to Admin."
      ]
    },
    {
     id: 32,
      version: "3.0.8",
      date: "02-11-2022",
      highlights: [
        "Completing task in personal todo and also displaying the completed tasks in personal list.",
        "Working status bar updated along with - Done for the Day - Be right back - Out sick - On Vacation.",
        "Chat response with tag on a particular message in chat room."
      ]
    },
    {
      id: 31,
      version: "3.0.7",
      date: "02-04-2022",
      highlights: [
        "In To Do list only projects you are involved in user stories will be shown.",
        "Projects list in side navigation for header pages like To Do, Chat, Support etc.",
        "User Story template can be modified.",
        "Agile support added on every page, so that you can contact support without logging out.",
        "Agile Squad shows the working status of each user.",
        "Archive search functionality with user story details."
      ]
    },
    {
      id: 30,
      version: "3.0.6",
      date: "01-28-2022",
      highlights: [
        "Admin level features:",
        "Admin panel separation for each Domain and Main Account Holder.",
        "Display of squad list and group chat list sorted according to unread and time.",
        "User level features:",
        "Single sign-on enabled from Google.",
        "Calendar, ToDo, and Chat in every screen on the header part.",
        "Display of squad list and group chat list sorted according to unread and time."
      ]
    },
    {
      id: 29,
      version: "3.0.5",
      date: "01-21-2022",
      highlights: [
        "Admin level features:",
        "FAQ can be added from Admin Panel.",
        "Add, Modify and Delete the FAQ's.",
        "User level features:",
        "Contributor with Limited Access is restricted on all levels.",
        "User story - If a user has a particular user story In Progress then when you move another user story into in progress the system throws a warning to confirm and give details of USER STORY name that is already in In Progress.",
        "Default Target date displayed when user story is moved into Active Sprint from Backlog.",
        "Active Sprint Boards name Changed.",
        "Calendar has all details input from Dashboard."
      ]
    },
  {
     id: 28,
      version: "3.0.4",
      date: "01-13-2022",
      highlights: [
        "User level features:",
        "Personal ToDo List",
        "Modify and Delete the Task from Personal To Do",
        "Convert Personal To Do Task into User Story (Add Task to Agile Project)",
        "Contributor role with limited access added",
        "Calendar",
        "Calendar available on dashboard for all project details",
        "Display user stories and events specific to user",
        "Events can be added with or without selecting project name",
        "FAQ's available from the registration page"
      ]
    },
    {
     id: 27,
      version: "3.0.3",
      date: "01-07-2022",
      highlights: [
        "Admin Panel features:",
        "Usage reports on all verified and unverified users",
        "User registration date and last login date available",
        "User level features:",
        "Consolidated list of To Do from all Projects",
        "A private To Do list can be created by each user",
        "Assigning user to user story is not mandatory",
        "Group chat notifications in the chat room for both admin and user",
        "Under User Dashboard, Individual user chat notifications",
        "Payment Integration for paid accounts or upgrades",
        "Chat collaboration between specific domains improvised",
        "User story has provision to save a template"
      ]
    },
    {
   id: 26,
      version: "3.0.2",
      date: "12-10-2021",
      highlights: [
        "Admin Panel features:",
        "Efficiency of an employee shown in reports",
        "User Registration: Project Count and Project Names Displayed",
        "User level features:",
        "Chat message counts shown through Dashboard",
        "User able to chat with other employees from Different teams through common messaging on Dashboard",
        "By Default User story Target date being taken as end date of the sprint when it is being moved from Backlog to Active Sprint"
      ]
    },
  {
   id: 25,
      version: "3.0.1",
      date: "12-03-2021",
      highlights: [
        "Admin Panel features:",
        "Project reports added to see the number of active projects for each user",
        "Agile Usage report Added to see the number of users registered into the application and the status",
        "Chat message from admin added",
        "User level features:",
        "Chat message from admin to be displayed in the dashboard",
        "Contact page added to support",
        "Report bugs added to support"
      ]
    },
    {
   id: 24,
      version: "3.0.0",
      date: "11-18-2021",
      highlights: [
        "The Agile team is proud to announce the release of Task 24X7 3.0.0. We are very pleased to announce that we have PostgressSQL or Mysql as Database made available from this release",
        "Calendar notifications are redirected to your Calendar",
        "This point release contains many bug fixes and improvements"
      ]
    },
    {
      id: 23,
      version: "2.0.8",
      date: "11-12-2021",
      highlights: [
        "Admin Panel features:",
        "Group Chat added",
        "User level features:",
        "Dashboard added",
        "Delete and Exit from Group",
        "Email verification put as a reminder to the user and access given to the user for temporary use without email verification",
        "Access to the application given with a temporary password",
        "Support option given through email",
        "Each registered user given access to create 10 projects free of cost, and an upgrade option is given"
      ]
    },
    {
    id: 22,
      version: "2.0.7",
      date: "10-22-2021",
      highlights: [
        "Hover on every Icon on every screen",
        "Group Chat Available as Chat Room for Users",
        "Sprint committed vs uncommitted option given",
        "User registration email reminder sent again if the user has not activated the account",
        "UI alignments for Search and other add features"
      ]
    },
  {
   id: 21,
      version: "2.0.6",
      date: "10-14-2021",
      highlights: [
        "Admin Panel features:",
        "Number of user stories an individual is assigned to in each week added to reports in admin",
        "User level features:",
        "Comment box shows all the history of that particular user story",
        "User stories will be moved back to To Do at the end of the day. User will have to move their User story into In Progress once they start the work next day",
        "Chat - Edit images before sending is enabled",
        "Reports- Has Burn down chart added",
        "Sprint can be create and delete option given only by Scrum master or Product Owner"
      ]
    },
    {
   id: 20,
      version: "2.0.5",
      date: "10-07-2021",
      highlights: [
        "User level features:",
        "User - Comment and user story moving to In progress and any message windows displays the user story ID and name",
        "Roadblock- User story in Roadblock shows the ID and user story name",
        "Chat Message - included in archive"
      ]
    },
    {
   id: 19,
      version: "2.0.4",
      date: "10-01-2021",
      highlights: [
        "Admin Panel features:",
        "All Employee reports from Admin Panel (includes the time sheet-total hours)",
        "License key generation for the upgrade of an account",
        "Chat has the preview option of the screenshots put"
      ]
    },
    {
   id: 18,
      version: "2.0.3",
      date: "09-24-2021",
      highlights: [
        "Chat functionality changes",
        "Limit 5 project per user as a Scrum master/product Owner",
        "Auto refresh of Active Sprint screen"
      ]
    },
    {
   id: 17,
      version: "2.0.2",
      date: "09-17-2021",
      highlights: [
        "Admin Panel features:",
        "TimeSheets for every active employee available from Admin panel",
        "Reports are available based on the Days selected from Admin panel",
        "Activate or Deactivate user from Admin and Project level and unassignment of their user stories",
        "User level features:",
        "Calendar has add events and User story deadlines defined",
        "Email Notifications are sent any time there is a change in Calendar event or user story",
        "BurnUp chart added to reports",
        "Mobile Notifications are sent when there is an activating or assignment of the user story, user level and user story level chat"
      ]
    },
    {
   id: 16,
      version: "2.0.1",
      date: "08-13-2021",
      highlights: [
        "User level features:",
        "Activating single user story per user",
        "Calendar email notifications",
        "Profile: Working hours the user added",
        "Show active sprint's user story with different color in calendar",
        "Individual user story sort by user in backlog",
        "Each user's profile with their availability or shift duration"
      ]
    },
    {
   id: 15,
      version: "2.0.0",
      date: "08-07-2021",
      highlights: [
        "Single DB Migration"
      ]
    },
    {
   id: 14,
      version: "1.0.14",
      date: "07-02-2021",
      highlights: [
        "The user Stories are marked as incomplete and given as a not finished on target time",
        "A user story can be assigned smaller Tasks if user wants to subdivide the user stories",
        "Change Status has been modified to 1 click"
      ]
    },
    {
   id: 13,
      version: "1.0.13",
      date: "06-25-2021",
      highlights: [
        "Email notification on all chat modules",
        "Roadblocks can be assigned as a user story and in active sprint the story card will show the ID to the Roadblock User story",
        "Changing user story Status in the backlog manually"
      ]
    },
    {
   id: 12,
      version: "1.0.12",
      date: "06-11-2021",
      highlights: [
        "Mural Board",
        "Chat notifications and uploading file",
        "Add user story / Modify User story Browser compatibility issue -scrollable feature added in model",
        "Backlogs Task Information model size is increased and (1.Active/ de active squad member, 2. Inactive member not showing in squad)",
        "Epic: 1. Do not add empty epic while add/ modify the epic 2. Delete epic whenever epic doesn’t have user stories (whoever added the epic that person able to delete it)",
        "Bugs Fixed: 1. Delete option for Agile Squad member 2. Delete EPIC if it does not have user stories"
      ]
    },
  {
   id: 11,
      version: "1.0.11",
      date: "05-28-2021",
      highlights: [
        "In Chat files and images upload/download",
        "Loaders added while assign, modify and reassign user story",
        "Bugs Fixed"
      ]
    },
    {
   id: 10,
      version: "1.0.10",
      date: "05-21-2021",
      highlights: [
        "Support page with version release notes",
        "Sprint tab has removed from epics",
        "In squad members dropdown list has been updated with all squad members",
        "Bugs Fixed"
      ]
    },
    {
   id: 9,
      version: "1.0.9",
      date: "05-07-2021",
      highlights: [
        "Backlog board with Drag and Drop",
        "Reports for individual Workload",
        "Reassign the Completed User Stories from Backlogs and Epic Level",
        "Chat Bug solved in Active Sprint",
        "Bugs Solved"
      ]
    },
    {
   id: 1,
      version: "1.0.8",
      date: "04-27-2021",
      highlights: [
        "Modify Sprint in Backlogs",
        "Reports"
      ]
    },
    {
   id: 2,
      version: "1.0.7",
      date: "04-23-2020",
      highlights: [
        "Agile Secure version with CA.",
        "Epic completion without dependency of user story creation.",
        "Adding a key for epic and project.",
        "Sprint cycle time change to 11.59pm PST on the end date of Sprint.",
        "Date format changed in archive to mm/dd/yy.",
        "In blocked list, show only roadblocks of the current sprint (present sprint).",
        "In comment box, the last message of comment box to be shown first.",
        "Removed mobile validation in agile squad while add/modify squad member.",
        "Check if all the user stories actions are done by user in sprint board, sprint board cannot switch."
      ]
    },
   {
   id: 3,
      version: "1.0.6",
      date: "04-16-2021",
      highlights: [
        "No Epic Dependency.",
        "Search Bar added to backlog, and Archive.",
        "Alphabetic order for Agile project Names.",
        "Backlog part in two cases i.e. with epic and without epic.",
        "Roadblocks on current sprint board.",
        "In chatbox date format has changed.",
        "Activate and deactivate Squad member.",
        "Comment box changes.",
        "Date for Version has changed.",
        "Completion of epic.",
        "Add validations.",
        "Block list should be displayed on scrum board.",
        "Give an option to assign epic name while adding userstory."
      ]
    },
    {
   id: 4,
      version: "1.0.5",
      date: "04-09-2021",
      highlights: [
        "Forgot Password",
        "Landing page",
        "Registration page",
        "Backlog Board with active and feature sprints user stories and backlogs",
        "Reset Password",
        "New Squad member to be added can be picked from existing data",
        "Sprint card details",
        "Roles Displayed with Squad Name in the chatbox"
      ]
    },
    {
   id: 5,
      version: "1.0.4",
      date: "03-26-2021",
      highlights: [
        "Active sprint board",
        "Backlog Board",
        "Archive Reports",
        "Removed Dashboard",
        "Display Release Date for every version/release",
        "Sprint should have a display of Current Active Sprint user-stories"
      ]
    },
    {
   id: 6,
      version: "1.0.3",
      date: "03-12-2021",
      highlights: [
        "Switching between the projects from inside the application.",
        "Add project after login.",
        "Remove the corp code and user type selection while login.",
        "Email notification while registered or add squad and add new project."
      ]
    },
    {
   id: 7,
      version: "1.0.2",
      date:'',
      highlights: [
        "Removed admin role from application and added three roles(i.e. scrum master, contributor, product owner).",
        "User stories page and Backlogs page are merged into a single page as backlogs."
      ]
    },
    {
   id: 8,
      version: "1.0.1",
      date:'',
      highlights: [
        "PTMS core version with properties file modification for Agile"
      ]
    }
  ];
  const [filteredNotes, setFilteredNotes] = useState(releaseNotes);
  const handleSearchInputChange = e => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  
    const filteredResults = releaseNotes.filter(note =>
      note.highlights.some(highlight => highlight.toLowerCase().includes(query))||  note.date.includes(searchQuery)||note.version.includes(searchQuery)
    );
  
    setFilteredNotes(filteredResults);
  };  
  return (
    <div>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light" style={{ backgroundColor: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b' }}>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          {/* eslint-disable-next-line */}
          <a className="navbar-brand"><Link to={{ pathname: "/" }}>
            {/* <img src="images/common/agile2.png" width="170" alt="" /></Link> */}
            <img className="agile-supportlogo" src={properties?.IMG_SRC || IMG_SRC} width="170" alt="" /></Link>

          </a>
          <form className="form-inline my-2 my-lg-0 ml-auto" style={{ paddingTop: "16px" }}>
            {/* <!-- <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> --> */}
            {/* eslint-disable-next-line */}
            <a className="btn my-2 my-sm-0 ml-auto"  id="loginbtn" type="submit" ><Link style={{ color: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b' }} to={{ pathname: "/login" }}>Login</Link></a>
            {/* eslint-disable-next-line */}
            <a className="btn my-2 my-sm-0" id="signupbtn-support" type="submit" style={{backgroundColor: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b'}}><Link style={{ color: 'white' }} to={{ pathname: "/" }}>Home </Link></a>
            {/* support page button */}
          </form>
        </div>
      </nav>

      <section id="section1">
        <div className="container">
          <div className="release-note mt-3">
            <div className="d-flex bd-highlight"> <div className="p-2 flex-grow-1 bd-highlight text-center"><h2>Task 24X7 release notes</h2></div>  </div>
          </div>
          {/* <div className="card releasenote-card mt-5 p-3">
              <h3>Task 24X7 version 1 release notes</h3>
              {/* <div className="releasenotes-versions mt-3">
                <ul>
                    <li>Task 24X7 version 1.0 release notes</li>
                    <li>Task 24X7 version 1.0.1 release notes</li>
                    <li>Task 24X7 version 1.0.2 release notes</li>
                    <li>Task 24X7 version 1.0.3 release notes</li>
                    <li>Task 24X7 version 1.0.4 release notes</li>
                    <li>Task 24X7 version 1.0.5 release notes</li>
                    <li>Task 24X7 version 1.0.6 release notes</li>
                    <li>Task 24X7 version 1.0.7 release notes</li>
                    <li>Task 24X7 version 1.0.8 release notes</li>
                </ul> 
              </div> 
          </div> */}
        </div>
      </section>

      {/* collapse view */}
      <div className="container mt-2 ">
     <div className=' d-flex justify-content-end'> <input className='form-control ' type="search" placeholder="Search... highlights,date,version" value={searchQuery} onChange={handleSearchInputChange} style={{width:'30%'}} /></div>
        <div className="accordion mt-3" id="accordionExample">
          {filteredNotes.length > 0 ? (
            filteredNotes.map(note => (
              <div className="card" key={note.id}>
                <div className="card-header" id={`heading${note.id}`}>
                  <h2 className="mb-0">
                    <button className="btn btn-link w-50 text-left"  type="button"  data-toggle="collapse" data-target={`#collapse${note.id}`}  aria-expanded="true"  aria-controls={`collapse${note.id}`} >
                      <h5 className="text-primary">{`Task24X7 version ${note.version} release notes`}</h5>
                    </button>
                    <button  className="btn btn-link w-50 text-right" type="button" data-toggle="collapse" data-target={`#collapse${note.id}`}  aria-expanded="true" aria-controls={`collapse${note.id}`}  >
                      <h5 className="text-primary">{`Date : ${note.date}`}</h5>
                    </button>
                  </h2>
                </div>
                <div id={`collapse${note.id}`} className="collapse" aria-labelledby={`heading${note.id}`} data-parent="#accordionExample" >
                  <div className="card-body">
                    <div className="releasenote-cardbody">
                      <div className="card-title text-capitalize mt-3 mb-3">
                        <h6>Highlights</h6>
                      </div>
                      <div className="list">
                        <ul>
                          {note.highlights.map((highlight, index) => (
                            <li key={index} className="ml-1">
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No matching release notes found.</p>
          )}
        </div>
      </div>


      {/* End collapse view */}



      <footer id="footer-releasenote" style={{ backgroundColor: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b' }}>
        <div style={{color:'white'}}>
          {webProperties?.APP_NAME || APP_NAME} © Copyright {new Date().getFullYear()}. All Rights Reserved.
        </div>
      </footer>
    </div>
  )
}
