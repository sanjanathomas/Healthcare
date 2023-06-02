import constants from "../constants"

const getAllDoctors = () => {
    return fetch(`${constants.BASE_URL}/users/type/Doctor`);
}

const getUserByEmail = (email, token) => {
    const request = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer '+token }
    };
    return fetch(`/users/info/${email}`, request);
}

export default {
    getAllDoctors,
    getUserByEmail
}