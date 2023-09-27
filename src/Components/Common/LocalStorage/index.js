export function setToken(name, token) {
    localStorage.setItem(name, token)
}
export function getToken(name) {
    return localStorage.getItem(name);
}
export function removeToken(name) {
    return localStorage.removeItem(name);
}
export function clearToken() {
    return localStorage.clear()
}
export function setStatus(name, status) {
    localStorage.setItem(name, status)
}
export function getStatus(name) {
    return localStorage.getItem(name);
}
export function setRoleCount(name, roleCount) {
    localStorage.setItem(name, roleCount)
}
export function getRoleCount(name) {
    return localStorage.getItem(name);
}
