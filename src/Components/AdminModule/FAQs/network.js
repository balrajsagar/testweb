import API from "../../Common/Network/API";
import { isLoading, isLoaded, appDetails } from "./action";
import Alert from '../../Common/Alert';

// for getting all faqs
export async function getDetails(dispatch) {
    dispatch(isLoading());
    try {
      var response = await API.post("faqs.php",{
        action: 'getDetails',
      }, {}, false);
      if(response.status === 'True'){
        dispatch(appDetails(response.data));
      }
    } catch (error) {
        console.log(error)
      Alert(error.message)
    }
    dispatch(isLoaded());
  }
  // add faqs
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

  // for delete  question
export async function deleteFaq(dispatch, id, handleClose) {
  dispatch(isLoading());
    try {
      var response = await API.post("faqs.php", {
        action: "delete",
        id: id,
      }, {}, false);
      if (response.status === 'True') {
        Alert("success", "Deleted successfully!");
      }
    } catch (error) {
      Alert('error', error.message);
      dispatch(isLoaded());
    }
    handleClose()
}
// for update question
export async function updateFaq(state, dispatch, handleClose) {
  // console.log("state",state)
  dispatch(isLoading()); 
    try {
        var response = await API.post("faqs.php", {
        action: "update",
        ques: state.ques.value,
        ans: state.ans.value,
        id: state.id.value,
      }, {}, false);
      if (response.status === 'True') {
        Alert("success", "Updated successfully!");
      }
    } catch (error) {
      Alert('error', error.message);
      dispatch(isLoaded());
    }
    handleClose()
  dispatch(isLoaded());
}  