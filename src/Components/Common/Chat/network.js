import { isLoaded, isLoading } from "../Actions/loading";
import Alert from "../Alert";
import API from "../Network/API";
import { groupList, groupName, taskComments } from "./actions";

export async function groupMembersList(dispatch,getUser,data) {
    dispatch(isLoading());
    try {
      var response = await API.post("groupDetails.php", {
        corp_code: getUser.corp,
        action: data.action,
        groupId: data.id
      }, {}, false);
      //Getting the Group details for Subtask start
      if (response.status === 'True' && response.task === 'subtask') {
        const al = [];
        al.push(response.ideaByName);
        al.push(response.acceptedByName);
        al.push(response.releaseOwner);
        al.push(response.moduleCreatedBy);
        al.push(response.moduleModifiedBy);
        al.push(response.mainAssignedBy);
        al.push(response.mainAssignedTo);
        al.push(response.mainModifiedBy);
        al.push(response.subAssignedBy);
        al.push(response.subAssignedTo);
        al.push(response.subModifiedBy);
        al.push(response.rejectedByName);
        al.push(response.moduleModifiedBy);
        al.push(response.ideaModfiedName);
        al.push('Admin(admin)');
        dispatch(groupName(response.subTaskId))

        const k = (al);
        function getUnique(array) {
          var uniqueArray = [];
          // Loop through array values
          for (var value of array) {
            if (uniqueArray.indexOf(value) === -1) {
              if(value!=="NA"){
              uniqueArray.push(value);
              }
            }
          }
          return uniqueArray;
        }
        var uniqueNames = getUnique(k);
      
        var h = uniqueNames;
        // console.log(uniqueNames+h.length)
        var details = "Admin(admin)";
        for (var i = 1; i <= h.length ; i++) {//Checking the group list

          if ( h[i] === "Admin(admin)") { //Remove Duplicate list
            h.splice(i, 1);
          }
          //Concat List of Group Members
          details = details + "," + h[i-1]; //Including
          // details = h[i-1];// Excluding Admin
        dispatch(groupList((details.replace("Admin(admin),", ""))))
        }
        dispatch(groupName(response.subTaskId))
      }
      //Getting the Group details for Subtask end
    
      //Getting the Group details for roadblock start
     else if (response.status === 'True' && response.task === 'roadblock') {
        const al = [];
        al.push(response.ideaByName);
        al.push(response.acceptedByName);
        al.push(response.releaseOwner);
        al.push(response.moduleCreatedBy);
        al.push(response.moduleModifiedBy);
        al.push(response.mainAssignedBy);
        al.push(response.mainAssignedTo);
        al.push(response.mainModifiedBy);
        al.push(response.subAssignedBy);
        al.push(response.subAssignedTo);
        al.push(response.subModifiedBy);
        al.push(response.rejectedByName);
        al.push(response.moduleModifiedBy);
        al.push(response.ideaModfiedName);
        al.push(response.roadBlockRequestedBy);
        al.push(response.roadBlockAssignedBy);
        al.push(response.roadBlockAssignedTo);
        al.push('Admin(admin)');
        dispatch(groupName(response.subTaskId))

        const k = (al);
        function getUnique(array) {
          var uniqueArray = [];
          // Loop through array values
          for (var value of array) {
            if (uniqueArray.indexOf(value) === -1) {
              if(value!=="NA"){
              uniqueArray.push(value);
              }
            }
          }
          return uniqueArray;
        }
         uniqueNames = getUnique(k);
      
         h = uniqueNames;
        console.log(uniqueNames+h.length)
        details = "Admin(admin)";
        for (i = 1; i <= h.length ; i++) {//Checking the group list

          if ( h[i] === "Admin(admin)") { //Remove Duplicate list
            h.splice(i, 1);
          }
          //Concat List of Group Members
          details = details + "," + h[i-1]; //Including
          // details = h[i-1];// Excluding Admin
        dispatch(groupList((details.replace("Admin(admin),", ""))))
        }
        dispatch(groupName(response.subTaskId))
      }
      //Getting the Group details for roadblock end

      //Getting the Group details for Maintask start
      else if (response.status === 'True' && response.task === 'maintask') {
        const al = [];
        al.push(response.ideaByName);
        al.push(response.acceptedByName);
        al.push(response.ideaModfiedName);
        al.push(response.releaseOwner);
        al.push(response.rejectedByName);
        al.push(response.moduleCreatedBy);
        al.push(response.moduleModifiedBy);
        al.push(response.mainAssignedBy);
        al.push(response.mainAssignedTo);
        al.push(response.mainModifiedBy);
        al.push('Admin(admin)');
        dispatch(groupName(response.subTaskId))
        const k = (al);
        function getUnique(array) {
          var uniqueArray = [];
          // Loop through array values
          for (var value of array) {
        //    console.warn( uniqueArray.indexOf(value)+value)
            if (uniqueArray.indexOf(value) === -1) {
              if(value!=="NA"){
                uniqueArray.push(value);
                }
            }
          }

          return uniqueArray;
        }
        // console.warn("Naveen"+k);
        // eslint-disable-next-line
        var uniqueNames = getUnique(k);
        // console.warn(uniqueNames)
        // eslint-disable-next-line
        var h = uniqueNames;
        // console.warn(h.length)
        // eslint-disable-next-line
        var details = "Admin(admin)";
        // eslint-disable-next-line
        for (var i = 1; i <= h.length ; i++) {//Checking the group list
          if (h[i] === "Admin(admin)") {//Remove duplicate list
            h.splice(i, 1);
          }

          //Concat List of Group Members
          details = details + "," + h[i-1];//Including Admin  
          // details = h[i-1];// Excluding Admin
          dispatch(groupList(details.replace("Admin(admin),", "")))
        }
        dispatch(groupName(response.subTaskId))
      }//Getting the Group details for maintask end
      else {

      }
    } catch (error) {
      Alert('error',error.message)
    }
    dispatch(isLoaded());
  }
//Get Group Comments 
export async function getMessages(dispatch,getUser,data) {
    dispatch(isLoading());
    try {
      var response = await API.post("taskChat.php", {
        corp_code: getUser.corp,
        action: "getmessages",
        groupId: data.id
      }, {}, false);
      if (response.status === 'True') {
         dispatch(taskComments(response.data));
      }else{
        dispatch(taskComments([]));
      }
    } catch (error) {
      Alert('error',error.message)
    }
    dispatch(isLoaded());
  }