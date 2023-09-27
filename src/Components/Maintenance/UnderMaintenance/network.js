import API from '../../../Components/Common/Network/API';
import { serverRedirect,isLoaded,isLoading } from "./action";

export async function serverCheck(dispatch) {
    dispatch(isLoading());
    try {
        const response = await API.get("maintenance.php", false);
        if (response.message === "not connected") {
            dispatch(serverRedirect(response.message));
        }
    } catch (error) {
        dispatch(serverRedirect(error.message));
    }
    dispatch(isLoaded());
}