export function validateCurrentPassword(currentpassword) {
    return (currentpassword.length >= 5) ? true : false
}

export function validateNewPassword(newpassword) {
    var reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return (newpassword.length>=5  && reg.test(newpassword)) ? true : false
}

export function validateConfirmPassword(confirmpassword) {
    var reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return (confirmpassword.length>=5  && reg.test(confirmpassword)) ? true : false
}
