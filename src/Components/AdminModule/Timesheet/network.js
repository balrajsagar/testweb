import Axios from "axios";
import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";
import { isLoading, isLoaded, timesheet } from "./actions";
import { Reports_URL } from "../../Common/config";


// export async function getTimesheet(dispatch, getUser,startDate,endDate) {
//   const [, extension] = (getUser.userName).split('@')
//   dispatch(isLoading());
//   try {
//     var response = await API.post("get_timesheets.php",{
//       extension: extension,
//       startDate:startDate,
//       endDate:endDate
//     },{}, false);
//     if (response.status === 'True') {
//       dispatch(timesheet(response.data))
//     }
//     else {
//       dispatch(timesheet([]))
//     }
//   } catch (error) {
//     Alert('error', error.message);
//   }
//   dispatch(isLoaded());
// }

export async function getTimesheet(dispatch, getUser, startDate, endDate, select) {
  // const [, extension] = (getUser.userName).split('@')
  dispatch(isLoading());
  try {
    var response = await Axios.post(`${Reports_URL}/getUserTimeSheets`, {
      "filter": [{
        "startDate": startDate,
        "endDate": endDate,
        "key": "selection"
      }],
      "user_id": select

    }, {}, false);

    dispatch(timesheet(response.data))
    console.log(response)
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}

