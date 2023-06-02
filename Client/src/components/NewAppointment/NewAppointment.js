import React, { useState } from "react";
import constants from "../../constants";
// import './Registration.css'
import ErrorMssg from "../ErrorMssg/ErrorMssg";
import appointmentService from "../../service/appointmentService";
// import TimePicker from 'react-time-picker';
import { DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';
// import { TimePicker } from "@progress/kendo-react-dateinputs";
import Moment from 'moment';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import "../Registration/Registration.css"

import "react-datepicker/dist/react-datepicker.css";
import { useCookies } from "react-cookie";
dayjs.extend(customParseFormat);


const NewAppointment = (props) => {

    const [cookies, setCookie, removeCookie] = useCookies(['user', 'token']);

    const [patient, setpatient] = useState(cookies.user);
    const [doctor, setDoctor] = useState("");
    const [date, setDate] = useState(dayjs(new Date()).format("MM/DD/YYYY"));
    const [time, setTime] = useState(dayjs(new Date()).format("hh:mm:ss A"));

    const [errorMssg, setErrorMssg] = useState("");
    const [patientErrorMssg, setPatientErrorMssg] = useState("");
    const [doctorErrorMssg, setDoctorErrorMssg] = useState("");
    const [datErrorMssg, setDateErrorMssg] = useState("");
    const [timeErrorMssg, setTimeErrorMssg] = useState("");

    const [validDoctor, setValidDoctor] = useState(true);
    const [validPatient, setValidpatient] = useState(true);

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    };


    const handlepatientChange = (e) => {
        setpatient(e.target.value);
        setPatientErrorMssg("");
    }

    const handleDoctorChange = (e) => {
        setDoctor(e.target.value);
        setDoctorErrorMssg("");
    }


    const handleDateChange = (date, dateString) => {
        console.log(date, dateString);
        setDate(dateString);
        console.log("Date: " ,dateString, typeof(dateString))
        setDateErrorMssg("");
      };
        

    const handleTimeChange = (time, timeString) => {
        console.log(time, timeString);
        setTime(timeString);
    };

    // const handleDropdown = () => {
    //     setIsOpen(!isOpen);
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValidDoctor = true;
        let isValidpatient = true;

        if (patient.length === 0) {
            setValidpatient(false);
            isValidpatient = false;
            setPatientErrorMssg("Patient email is required");
        } else if (patient.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/)) {
            setValidpatient(true);
            setPatientErrorMssg("");
        } else {
            setValidpatient(false);
            isValidpatient = false;
            setPatientErrorMssg("Email format is wrong");
        }

        if (doctor.length === 0) {
            setValidDoctor(false);
            isValidDoctor = false;
            setDoctorErrorMssg("Doctor email is required");
        } else if (doctor.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/)) {
            setValidDoctor(true);
            setDoctorErrorMssg("");
        } else {
            setValidDoctor(false);
            isValidDoctor = false;
            setDoctorErrorMssg("Email format is wrong");
        }

        let isValidDate = true;
        let isValidTime = true;


        if (isValidpatient && isValidDoctor && isValidDate && isValidTime) {
            let newAppointment = {
                patientEmail: patient,
                doctorEmail: doctor,
                date: date,
                time: time

            }

            appointmentService.createAppointment(newAppointment, cookies.token)
                .then(res => {
                    if (res.status === 200) {
                        res.json()
                            .then(data => {
                                window.location = "/account/history"
                            });
                    } else if (res.status === 600) {
                        res.json().then(err => {
                            console.log("Error", err.detail)
                            setErrorMssg(err.detail);
                        });
                    }
                    else {
                        setErrorMssg(constants.INTERNAL_SERVER_ERROR);
                    }
                })
                .catch((error) => { console.log(error) });
        }
    }

    const handleClose = () => {
        console.log("Calling parent method")
        setErrorMssg("");
    }

    return (
        <div className="mt-3">

            <form method="post" action="/appointment" id="create_appointment" acceptCharset="UTF-8" className="general-form">
                {errorMssg?.length > 0 ?
                    <ErrorMssg
                        message={errorMssg}
                        closeErrorMssg={() => { handleClose() }}
                    ></ErrorMssg>
                    : ''}
                <div>

                    <div className="mb-3 row">
                        <div className="form-group col-12">
                            <label htmlFor="Patient" className="mb-1 color-blue required">Patient Email</label>
                            <input type="email" name={patient} id="patient" className=" form-control" placeholder="Email" value={patient} onChange={handlepatientChange} required readOnly></input>
                            <p className={`${validPatient === true ? 'hide-error-mssg' : 'show-error-mssg'}`}>{patientErrorMssg}</p>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <div className="form-group col-12">
                            <label htmlFor="doctor" className="mb-1 color-blue required">Doctor</label>
                            <input type="email" name={doctor} id="doctor" className=" form-control" placeholder="Email" value={doctor} onChange={handleDoctorChange}></input>
                            <p className={`${doctorErrorMssg.length === 0 ? 'hide-error-mssg' : 'show-error-mssg'}`}>{doctorErrorMssg}</p>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <div className="form-group col-12 col-md-6">
                            <label htmlFor="date" className="mb-1 color-blue required">Date</label>
                            <DatePicker
                                format="MM/DD/YYYY"
                                className="custom-width-20"
                                disabledDate={disabledDate}
                                defaultValue={dayjs(new Date())}
                                onChange={handleDateChange}
                            />
                            <p className={`${datErrorMssg.length === 0 ? 'hide-error-mssg' : 'show-error-mssg'}`}>{datErrorMssg}</p>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <div className="form-group col-12 col-md-6">
                            <label htmlFor="time" className="mb-1 color-blue required">Time</label>
                            <TimePicker 
                            className="custom-width-20"
                            use12Hours 
                            defaultValue={dayjs(new Date)}
                            format="hh:mm:ss A" 
                            minuteStep={15} secondStep={10} hourStep={1} 
                            onChange={handleTimeChange} />
                        </div>
                    </div>

                    <div className="mb-3 btn-holder">
                        {/* <input type="button" className="btn submit-button me-3" value="Back" onClick={() => { handleNext("first") }}></input> */}
                        <input type="submit" className="custom-button" value="Create" onClick={handleSubmit}></input>
                    </div>
                </div>
                {/* } */}
            </form>
        </div>
    )
}

export default NewAppointment
