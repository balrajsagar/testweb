import { isLoading, isLoaded,redirect} from "./actions";
import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";

// for rest password
export async function updatePassword(state, dispatch, key) {
  dispatch(isLoading());
  if( state.newpassword.value !==""){
  try {
    if (state.newpassword.value.length >= 5 && state.newpassword.value === state.confirmpassword.value) {
      var response = await API.post("authentication.php", {
        key: key,
        password: state.newpassword.value,
        action: "resetPassword"
      }, {}, false);
      if(response.status === "True"){
        Alert('success', response.message)
        dispatch(redirect("passwordredirect"))
        
      }else{
        Alert('warning', response.message)
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