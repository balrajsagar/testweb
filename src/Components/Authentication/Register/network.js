import { isLoading, isLoaded,redirect} from "./actions";
import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";
import { Client_URL } from "../../Common/config";
import { APP_NAME } from "../../Common/Headers";

export async function register(state, dispatch) {
  dispatch(isLoading());
  if( state.newpassword.value !=="" && state.email.value !== ""){
  try {
    if (state.newpassword.value.length >= 5 && state.newpassword.value === state.confirmpassword.value) {
        var response = await API.post("authentication.php", {
        username: state.email.value,
        password: state.newpassword.value,
        action: "register",
        url: `${Client_URL}`,
        appName: APP_NAME,
      }, {}, false);
      if(response.status === "True"){
        Alert('success', response.message)
        dispatch(redirect("emailredirect"))  
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