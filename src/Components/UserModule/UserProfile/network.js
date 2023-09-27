import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";
import { isLoaded, isLoading, setUserInfo,awards } from "./actions";

//Get PUser Thanks Points
export async function getUserThanksPoints(dispatch, getUser) {
    dispatch(isLoading());
    try {
      var response = await API.post("usersAwards.php", {
        "crop": getUser.corp,
        empId: getUser.empId,
        action: 'getUserAwards',
      }, {}, false);
      console.log(response)
      if (response.status === 'True') {
        dispatch(awards(response.data))
      }
      else {
        dispatch(awards([]))
      }
    } catch (error) {
      Alert('error', error.message);
    }
    dispatch(isLoaded());
  }

export async function getProfile(dispatch, getUser) {
    dispatch(isLoading());
    try {
        var response = await API.post("get_user.php", {
            corp: getUser.corp,
            empId: getUser.empId,
            action: "get_user_profile",
            projectId: getUser.projectId
        }, {}, false);
        if (response.status === 'True') {
            dispatch(
                setUserInfo(
                    response.data[0].empid, //Employee ID
                    response.data[0].username,
                    response.data[0].fullname,
                    response.data[0].mobile,
                    response.data[0].email,
                    response.data[0].designation,
                    response.data[0].team,
                    response.data[0].role,
                    response.data[0].reportingManager,
                    response.data[0].functionalManager,
                    response.data[0].empStatus,
                    response.data[0].shift_hours,
                    response.data[0].account_type,
                    response.data[0].license_key,
                    response.data[0].email_status,
                    response.data[0].license_validity,
                    response.free_licenses,
                    response.remaining_projects
                )
            );
        }
        else {
        }
    } catch (error) {
        Alert('error', error.message);
    }
    dispatch(isLoaded());
}

export async function updateData(state, dispatch,getUser) {
    dispatch(isLoading());
    if ((state.mobile.value !== "") && !(state.mobile.errorStatus)) {
        try {
            const data = {
                action: 'update',
                corp: getUser.corp,
                number: state.mobile.value,
                empId: state.empId.value
            };
            const response = await API.post("get_user.php", data, {}, false);
            if (response.status === 'True') {
                Alert("success", response.message);
            }
            else{}
            Alert("error", response.message);
        } catch (error) {
            Alert("error", error.message);
        }
    } else {
        Alert("warning", "please update with valid mobile number")
    }
    dispatch(isLoaded());
}

export async function updateAccountType(state, dispatch,getUser,license_key,handleClose) {
    dispatch(isLoading());
    if (license_key !== "") {
        try {
            const data = {
                action: 'change_account_type',
                corp: getUser.corp,
                license_key: license_key,
                empId: getUser.empId
            };
            const response = await API.post("get_user.php", data, {}, false);
            handleClose()
           alert(response.message)
           
        } catch (error) {
            Alert("error", error.message);
            handleClose()
        }
    } else {
        Alert("warning", "please enter license key")
    }
    dispatch(isLoaded());
}

//network to generate license key

export async function generateLicense(state, dispatch,getUser,handleClose,handleModalClose) {
    const [username, extension] = (getUser.userName).split('@')
    var dig1=username.substring(0,3)
    var dig2=extension.substring(0,5)
    
    var dig3=Math.floor(Math.random()*90000) + 10000 
    var license_key=(dig1.concat(dig2,dig3)).toUpperCase()
    handleModalClose()
    dispatch(isLoading());
        try {
            const data = {
                action: 'generate_license',
                corp: getUser.corp,
                empId: getUser.empId,
                email: state.email.value,
                fullName:state.fullName.value,
                license_key:license_key,
                license_type:'FREE'
            };
            const response = await API.post("get_user.php", data, {}, false);
            Alert("success", response.message);
           
           
        } catch (error) {
            Alert("error", error.message);
           
        }
    handleClose();
    dispatch(isLoaded());
}

export async function payement(state, dispatch,getUser,paymentId,orderId,license_validity,handleClose) {
    var dig1='AGILE'
    
    var dig2=Math.floor(Math.random()*900000000) + 10000 
    var transactionId=dig1.concat(dig2).toUpperCase()
   
   
        dispatch(isLoading());
        try {
            const data = {
                
                corp: getUser.corp,
                empId: getUser.empId,
                paymentId:paymentId,
                orderId:orderId,
                transactionId:transactionId
            };
            const response = await API.post("payement.php", data, {}, false);
            if(response.status ==='True'){
                paidGenerateLicense(state,dispatch,getUser,transactionId,license_validity,handleClose)
            }
           
           
           
        } catch (error) {
            Alert("error", error.message);
           
        }
   
    dispatch(isLoaded());
}

export async function paidGenerateLicense(state, dispatch,getUser,transactionId,license_validity,handleClose) {
    const [username, extension] = (getUser.userName).split('@')
    var dig1=username.substring(0,3)
    var dig2=extension.substring(0,5)
    
    var dig3=Math.floor(Math.random()*90000) + 10000 
    var license_key=(dig1.concat(dig2,dig3)).toUpperCase()
    console.log(license_validity)
    console.log(transactionId)
    console.log(license_validity)
    
    dispatch(isLoading());
        try {
            const data = {
                action: 'generate_license',
                corp: getUser.corp,
                empId: getUser.empId,
                email: state.email.value,
                fullName:state.fullName.value,
                license_key:license_key,
                license_type:(license_validity === 'MONTHLY' || license_validity ==='ANNUAL')?'PAID':'FREE',
                transactionId:transactionId,
                license_validity:license_validity
            };
            const response = await API.post("get_user.php", data, {}, false);
            Alert("success", response.message);
           
           
        } catch (error) {
            Alert("error", error.message);
           
        }
    
    dispatch(isLoaded());
    handleClose()
}
