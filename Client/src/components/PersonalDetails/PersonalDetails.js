import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ErrorMssg from "../ErrorMssg/ErrorMssg";


const PersonalDetails = (user) => {

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
                        <label htmlFor="FirstName" className="mb-1 color-blue  appointment-label">FirstName</label>
                        <input type="FirstName" name="FirstName" id="FirstName" className="form-control appointment-input" value={user?.user.firstName} placeholder="FirstName" readOnly></input>
                        {/* <p >{appointment.patient.firstName} {appointment.patient.lastName}</p> */}
                    </div>
                </div>
                <div class="col-sm">
                    <div className="form-group appointment-input-container">
                        <label htmlFor="LastName" className="mb-1 color-blue  appointment-label required">LastName</label>
                        <input name="LastName" id="LastName" className=" form-control appointment-input" placeholder="LastName" value={user?.user.lastName}
                        // readOnly={dayjs(appointment.date) < dayjs(new Date())}
                        // onChange={event => handleDoctorChange(index, event)}
                        ></input>
                        {/* <p className={`${doctorErrorMssg.length === 0 ? 'hide-error-mssg' : 'show-error-mssg'}`}>{doctorErrorMssg}</p> */}
                    </div>
                </div>
                <div class="col-sm">
                    <div className="form-group appointment-input-container">
                        <label htmlFor="Email" className="mb-1 color-blue  appointment-label">Email</label>
                        <input type="email" name="Email" id="Email" className="form-control appointment-input" value={user?.user.email} placeholder="Email" readOnly></input>
                        {/* <p >{appointment.patient.firstName} {appointment.patient.lastName}</p> */}
                    </div>
                </div>
                <div class="col-sm">
                    <div className="form-group appointment-input-container">
                        <label htmlFor="Phone" className="mb-1 color-blue  appointment-label">Phone</label>
                        <input type="Phone" name="Phone" id="Phone" className="form-control appointment-input" value={user?.user.phone} placeholder="Phone" readOnly></input>
                        {/* <p >{appointment.patient.firstName} {appointment.patient.lastName}</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PersonalDetails