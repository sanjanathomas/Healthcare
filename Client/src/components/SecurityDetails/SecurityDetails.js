import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ErrorMssg from "../ErrorMssg/ErrorMssg";


const SecurityDetails = (user) => {

    const [errorMssg, setErrorMssg] = useState("");


    useEffect(() => {
        console.log(user);
    }, []);

    const closeErrorMssg = () => {
        setErrorMssg("");
    }

    return (
        <div>
            {errorMssg.length > 0 ?
                <ErrorMssg
                    message={errorMssg}
                    closeErrorMssg={() => { closeErrorMssg() }}
                />
                : ''}
            <div class="row">
                <div class="col-sm">
                    <div className="form-group appointment-input-container">
                        <label htmlFor="Email" className="mb-1 color-blue  appointment-label">Email</label>
                        <input type="email" name="Email" id="Email" className="form-control appointment-input" value={user?.user.email} placeholder="Email" readOnly></input>
                        {/* <p >{appointment.patient.firstName} {appointment.patient.lastName}</p> */}
                    </div>
                </div>
                <div class="col-sm">
                    <div className="form-group appointment-input-container">
                        <label htmlFor="Password" className="mb-1 color-blue  appointment-label">Password</label>
                        <input type="password" name="Password" id="Password" className="form-control appointment-input" value={"***********"} placeholder="Password" readOnly></input>
                        {/* <p >{appointment.patient.firstName} {appointment.patient.lastName}</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SecurityDetails