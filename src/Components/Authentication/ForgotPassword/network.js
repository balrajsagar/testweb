import { isLoading, isLoaded,redirect} from "./actions";
import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";

export async function updatePassword(state, dispatch, getUser) {
  dispatch(isLoading());
  if( state.newpassword.value !=="" && state.confirmpassword.value !== "" && state.currentpassword.value !== ""){
  try {
    if (state.newpassword.value.length >= 5 && state.newpassword.value === state.confirmpassword.value) {
      var response = await API.post("changePassword.php", {
        oldPassword: state.currentpassword.value,
        newPassword: state.newpassword.value,
        empId:getUser.empId,
        "crop": getUser.corp,
      }, {}, false);
      if(response.status === "True"){
        dispatch(redirect("passwordredirect"))
        Alert("success",response.message)
      }else{
        Alert("warning",response.message)
      }
     
    }
    else {
      Alert("warning","Both passwords must be same ");
    }
  } catch (err) {
    Alert("error",err.message);
  }}else{
    Alert("warning","Fill All Fields")
  }

  dispatch(isLoaded());

}