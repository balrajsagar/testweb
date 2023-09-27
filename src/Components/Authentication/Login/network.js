import { getToken } from "../../Common/LocalStorage";
import API from "../../Common/Network/API";

export async function setPlayerId(getUser) {
    // console.log(getUser)
    try {
      var response = await API.post(
        "device_store.php",
        {
          action: "store_player",
          empId: getUser.empId,
          player_id:getToken('player_id')
        },
        {},
        false
      );
      if (response.status === "True") {
      } else {
      }
    } catch (error) {
    }
  }