export function validateEmail(email) {
    // eslint-disable-next-line
    var EmailREgex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    return (email!=null && EmailREgex.test(email)) ? email.length >= 5 ? true : false : false
}

export function validateNewPassword(newpassword) {
    var reg = /^[0-9a-zA-Z]*$/;
    return (newpassword.length>=5  && reg.test(newpassword)) ? true : false
}

export function validateConfirmPassword(confirmpassword) {
    var reg = /^[0-9a-zA-Z]*$/;
    return (confirmpassword.length>=5  && reg.test(confirmpassword)) ? true : false
}
