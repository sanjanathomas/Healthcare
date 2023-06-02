import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ErrorMssg from "../ErrorMssg/ErrorMssg";


const AddressDetails = (user) => {

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
                        <label htmlFor="Street" className="mb-1 color-blue  appointment-label">Street Name</label>
                        <input type="text" name="Street" id="Street" className="form-control appointment-input" value={user?.user.address.street} placeholder="Street Name" readOnly></input>
                        {/* <p >{appointment.patient.firstName} {appointment.patient.lastName}</p> */}
                    </div>
                </div>
                <div class="col-sm">
                    <div className="form-group appointment-input-container">
                        <label htmlFor="City" className="mb-1 color-blue  appointment-label">City</label>
                        <input type="text" name="City" id="City" className="form-control appointment-input" value={user?.user.address.city} placeholder="City" readOnly></input>
                        {/* <p >{appointment.patient.firstName} {appointment.patient.lastName}</p> */}
                    </div>
                </div>
                <div class="col-sm">
                    <div className="form-group appointment-input-container">
                        <label htmlFor="State" className="mb-1 color-blue  appointment-label">State</label>
                        <input type="text" name="State" id="State" className="form-control appointment-input" value={user?.user.address.state} placeholder="City" readOnly></input>
                        {/* <p >{appointment.patient.firstName} {appointment.patient.lastName}</p> */}
                    </div>
                </div>
                <div class="col-sm">
                    <div className="form-group appointment-input-container">
                        <label htmlFor="Country" className="mb-1 color-blue  appointment-label">Country</label>
                        <input type="text" name="Country" id="Country" className="form-control appointment-input" value={user?.user.address.country} placeholder="City" readOnly></input>
                        {/* <p >{appointment.patient.firstName} {appointment.patient.lastName}</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddressDetails