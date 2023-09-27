
import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";
import { allProjects, isLoading, isLoaded, allMessages , allMessagesUser, allGroupMessages} from "./actions";

// get all messages from group chat
export async function getAllGroupMessages(dispatch, getUser,refresh) {
  if(refresh) {dispatch(isLoading());}
  try {
    var response = await API.post(
      "group_chat.php",
      {
        corp_code: getUser.corp,
        action: "getAllGroupMessagesDash",
        created_by: getUser.userName,
      },
      {},
      false
    );
    // console.log(response.data)
    if (response.status === "True") {
      dispatch(allGroupMessages(response.data));
      // store.dispatch(allMessages(response.data));
    } else {
      dispatch(allGroupMessages([]));
    }
  } catch (error) {
    Alert("error", error.message);
  }
  dispatch(isLoaded());
}

// get all messages from user chat
export async function getAllUserMessages(dispatch, getUser) {
    dispatch(isLoading());
    try {
      var response = await API.post("user_chat.php", {
        corp_code: getUser.corp,
        action: "get_all_messages_dash",
        sendBy: getUser.empId,
        // projectId: getUser.projectId,
      }, {}, false);
      if (response.status === 'True') {
        dispatch(allMessagesUser(response.data));
      } else {
        dispatch(allMessagesUser([]));
      }
    } catch (error) {
      Alert('error', error.message)
    }
    dispatch(isLoaded());
  }

// for getting all user story messages
export async function getAllTaskMessages(dispatch, getUser) {
    dispatch(isLoading());
    try {
      var response = await API.post(
        "user_story_chat.php",
        {
          corp_code: getUser.corp,
          action: "getAllTaskMessagesDash",
        },
        {},
        false
      );
    //   console.log(response)
      if (response.status === "True") {
        dispatch(allMessages(response.data));
        // store.dispatch(allMessages(response.data));
      } else {
        dispatch(allMessages([]));
      }
    } catch (error) {
      Alert("error", error.message);
    }
    dispatch(isLoaded());
  }

export async function getSquadsList(dispatch, empId) {
    console.log(empId)
    dispatch(isLoading())
    try {
        var response = await API.post("squads.php", {
            empId: empId,
            action: "get_squads"
        }, {}, false);
        if (response.status === 'True') {
            dispatch(allProjects(response.data))
        } else {
            dispatch(allProjects([]))
        }
    } catch (error) {
        Alert('error', error.message)
    }
    dispatch(isLoaded())

}

// const onValidate=()=>{
//     var validationRule = /^\S{3,}$/;
//     if (squadName === "") {
//       Alert('warning', "please give the project name")
//     } else if(!validationRule.test(squadName)){
//       Alert('warning', " please do not use spaces, '.' and '-' in between words")
//     }else if(squadName.length < 4 || squadName.length > 16){
//       Alert('warning', " project name should having length 4 to 15 characters")
//     }else{
//       return true
//     }
//   }

export async function  onProjectCreate  (state, dispatch, getUser,handleClose){
    var validationRule = /^\S{3,}$/;
    if (state.newProject === "") { //Validate the project name
        Alert('warning', "please give the project name")
    }
    else if (!validationRule.test(state.newProject)) {
        Alert('warning', " please do not use spaces, '.' and '-' in between words")
    } else if (state.newProject.length < 4 || state.newProject.length > 16) {
        Alert('warning', " project name should having length 4 to 15 characters")
    }
    else {
        dispatch(isLoading())
        try {
            const response = await API.post("squads.php", {
                username: getUser.userName,
                squadName: getUser,
                action: "new_squad",
                empId: getUser.empId
            }, {
            });
            if (response.status === "True") {
                Alert('success', response.message)

            } else {
                Alert('warning', response.message)
            }
        }
        catch (error) {
            Alert('error', error.message)
        }
    }
    dispatch(isLoaded())
    handleClose()

}