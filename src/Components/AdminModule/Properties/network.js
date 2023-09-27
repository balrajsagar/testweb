import API from "../../Common/Network/API";
import Alert from "../../Common/Alert";
// import { logoutUser } from '../../Common/Actions';
import { setToken, getToken } from '../../Common/LocalStorage';
import { getProps, getWebProps } from "../../Authentication/LandingPage/network";

export async function updateProps(state, dispatch, getUser, properties, image, appName) {

  var role_properties = JSON.parse(getToken('properties'))
  try {
    var response = await API.post("properties.php", {
      "crop": getUser.corp,
      "properties": JSON.stringify(properties),
      "action": "update",
      "image": image,
      "contributor": role_properties.CONTRIBUTOR,
      "product_owner": role_properties.PRODUCT_OWNER,
      "scrum_master": role_properties.SCRUM_MASTER,
      "app_name": appName,
      "prop_type": "app_props"
    }, {}, false);
    if (response.status === 'True') {
      Alert("success", 'Labels names are updated successfully,Make sure logout the application to the see the changes')
      setToken('properties', response?.data?.properties)
      // window.location.reload()
      getProps(state, dispatch)

    }
    else {
      Alert('warning', response.message);
    }
  } catch (error) {
    Alert('error', error.message);
  }
}


export async function updateStandardProps(state, dispatch, getUser, properties, appName) {
  var role_properties = JSON.parse(getToken('properties'))

  try {
    var response = await API.post("properties.php", {
      "crop": getUser.corp,
      "properties": JSON.stringify(properties),
      "action": "update",
      "image": '',
      "contributor": role_properties.CONTRIBUTOR,
      "product_owner": role_properties.PRODUCT_OWNER,
      "scrum_master": role_properties.SCRUM_MASTER,
      "app_name": appName,
      "prop_type": "app_props"

    }, {}, false);
    if (response.status === 'True') {
      Alert('success', 'Labels names are updated successfully,Make sure logout the application to the see the changes');
      setToken('properties', response.data.properties)
      getProps(state, dispatch)
      // window.location.reload()

    }
    else {
      Alert('success', response.message);
    }
  } catch (error) {
    Alert('error', error.message);
  }
}

export async function updateWebProps(state, dispatch, getUser, properties, webImages, appName) {

  let prop1 = properties
  let prop2 = webImages

  let props = Object.assign(prop1, prop2)

  console.log(props)

  try {
    var response = await API.post("properties.php", {
      "crop": getUser.corp,
      "properties": JSON.stringify(props),
      "action": "webUpdate",
      "app_name": appName,
      "prop_type": "web_props"
    }, {}, false);
    if (response.status === 'True') {
      Alert("success", 'Labels names are updated successfully,Make sure logout the application to the see the changes')
      setToken('web_properties', response?.data?.properties)
      getWebProps(state, dispatch)

      // window.location.reload()

    }
    else {
      Alert('warning', response.message);
    }
  } catch (error) {
    Alert('error', error.message);
  }
}


export async function updateStandardWebProps(state, dispatch, getUser, properties, appName, webImages) {

  let prop1 = properties
  let prop2 = webImages

  let props = Object.assign(prop1, prop2)

  console.log(props)

  try {
    var response = await API.post("properties.php", {
      "crop": getUser.corp,
      "properties": JSON.stringify(props),
      "action": "webUpdate",
      "image": '',
      "app_name": appName,
      "prop_type": "web_props"

    }, {}, false);
    if (response.status === 'True') {
      Alert('success', 'Labels names are updated successfully,Make sure logout the application to the see the changes');
      setToken('web_properties', response.data.properties)
      getWebProps(state, dispatch)

      // window.location.reload()
    }
    else {
      Alert('success', response.message);
    }
  } catch (error) {
    Alert('error', error.message);
  }
}


