import API from "../../Network/API";
import { isLoading, isLoaded, appDetails } from "./action";
import Alert from '../../Alert';


export async function getDetails(dispatch) {
    dispatch(isLoading());
    try {
      var response = await API.post("faqs.php",{
        action: 'getDetails',
      }, {}, false);
      if(response.status === 'True'){
        dispatch(appDetails(response.data));
      }else{
        dispatch(appDetails([]));
      }
    } catch (error) {
        console.log(error)
      Alert(error.message)
    }
    dispatch(isLoaded());
  }
  
  export async function submitData(dictt, dispatch) {
    dispatch(isLoading());
    const result = [...new Set([].concat(...dictt[0]))]
    try {
            const response = await API.post( "faqs.php", {
                data: result,
                action: 'add',
            }, {}, false);
            // console.log("response",response)
            if (response.status === 'True') {
              Alert("success", "Added Successfully!");
            }
        } catch (error) {
            Alert("error", error.message);
            dispatch(isLoaded());
        }
      dispatch(isLoaded());
  }