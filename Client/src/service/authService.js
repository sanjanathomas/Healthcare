import constants from "../constants"

const register = (user) => {
    const registerRequest = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`/auth/sign-up`, registerRequest);
}
 
const login = (loginData) => {
    const loginRequest = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
    }
    return fetch(`/auth/login`, loginRequest);
}

export default {
    register,
    login
}