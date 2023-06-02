import constants from "../constants"


const getAppointmnetsByEmail = (email, token) => {
    const request = {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer '+token , 'Content-Type': 'application/json'}
    };
    console.log("request " , request)
    return fetch(`appointment/show/${email}`, request);
}

const createAppointment = (appointment, token) => {
    const request = {
        method: 'POST',
        headers: { 'Authorization' : 'Bearer '+token, 'Content-Type': 'application/json' },
        body: JSON.stringify(appointment)
    };
    console.log("request " , request)
    return fetch(`appointment/create`, request);
}

const updateAppointment = (appointment, token) => {
    const request = {
        method: 'PUT',
        headers: { 'Authorization' : 'Bearer '+token, 'Content-Type': 'application/json' },
        body: JSON.stringify(appointment)
    };
    console.log("request " , request)
    return fetch(`appointment/update`, request);
}

const deleteAppointment = (id, token) => {
    const request = {
        method: 'DELETE',
        headers: { 'Authorization' : 'Bearer '+token, 'Content-Type': 'application/json' },
    };
    console.log("request " , request)
    return fetch(`appointment/remove/${id}`, request);
}



export default {
    getAppointmnetsByEmail,
    createAppointment,
    updateAppointment,
    deleteAppointment
}