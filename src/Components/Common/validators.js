export function validateName(name) {
    return (name.length >= 4) ? true : false
}
export function validateDescription(name) {
    return (name.length >= 10) ? true : false
}

export function validateMobileNumber(mobileNumber) {
    var reg = /^[0]?[6789]\d{9}$/
    return (mobileNumber.length === 10 && reg.test(mobileNumber)) ? true : false
}

export function validateEmail(email) {
    // eslint-disable-next-line
    var EmailREgex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    return (email!=null && EmailREgex.test(email)) ? email.length >= 5 ? true : false : false
}

export function validateNewPassword(newpassword) {
    var reg = /^[0-9a-zA-Z]*$/;
    return (newpassword.length>=5  && reg.test(newpassword)) ? true : false
}