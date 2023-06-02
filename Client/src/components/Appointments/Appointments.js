import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import './Appointments.css';
import appointmentService from "../../service/appointmentService";
import ErrorMssg from "../ErrorMssg/ErrorMssg";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DatePicker, TimePicker } from "antd";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Moment from 'moment';
import constants from "../../constants";
import SuccessMssg from "../SuccessMssg/SuccessMssg";
dayjs.extend(customParseFormat);

const Appointments = () => {

    let initialState = {}

    const [appointmentDetails, setAppointmentDetails] = useState([]);
    const [currentAppointments, setCurrentAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'token']);
    const [errorMssg, setErrorMssg] = useState("");
    const [successMssg, setSuccessMssg] = useState("");
    const [appointments, setAppointments] = useState(null);

    const [doctor, setDoctor] = useState("");
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState();

    const [doctorErrorMssg, setDoctorErrorMssg] = useState("");
    const [dateErrorMssg, setDateErrorMssg] = useState("");
    const [timeErrorMssg, setTimeErrorMssg] = useState("");

    const [validDoctor, setValidDoctor] = useState(true);
    const [validTime, setValidTime] = useState(true);
    const [validDate, setValidDate] = useState(true);

    const details = {
        doctorEmail: String,
        date: DatePicker,
        time: TimePicker
    }

    const [value, setValue] = useState(null);
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    };

    const range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    };

    const disabledDateTime = (current) => ({
        disabledHours: () => range(0, 24).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
        // disabledHours: () => range(0, now.get("hours")),
        // const now = Moment()
        // if (current.isSame(date, "day")) {
        //     return {
        //         disabledHours: () => range(0, now.get("hours")),
        //         disabledMinutes: () => range(0, now.get("minutes") + 3),
        //     }
        // } else {
        //     return {
        //         disabledHours: () => [],
        //         disabledMinutes: () => [],
        //     }
        // }
    });



    function getDisabledHours() {
        var hours = [];

        for (let i = 0; i < Moment().hour(); i++) {
            hours.push(i);
        }
        return hours;
    }

    const onOpenChange = (open) => {
        if (open) {
            setDate([null, null]);
        } else {
            setDate(null);
        }
    };

    useEffect(() => {
        getAppointments();
        // getOrderDetails();
    }, []);

    const getAppointments = async () => {
        console.log("cookies Info")
        console.log(cookies.user)
        console.log(cookies.token)
        await appointmentService.getAppointmnetsByEmail(cookies.user, cookies.token)
            .then(res => {
                if (res.status === 200) {
                    res.json()
                        .then(data => {
                            console.log("Data--->", data);
                            let arr = []
                            let pastArr = []
                            data.forEach(element => {
                                let details_ = {
                                    id: element.id,
                                    patientEmail: element.patient.email,
                                    doctorEmail: element.doctor.email,
                                    date: element.date,
                                    time: Moment(element.time, "hh:mm:ss A")
                                }
                                if (Moment(details_.date).isBefore(new Date(), "day")) {
                                    pastArr.push(details_)
                                } else {
                                    arr.push(details_)
                                }
                            });
                            setAppointmentDetails(arr)
                            setCurrentAppointments(arr)
                            setPastAppointments(pastArr)
                        });
                } else if (res.status === 403) {
                    window.location = "/signin"
                } else if (res.status === 600) {
                    res.json().then(err => {
                        setErrorMssg(err.detail)
                    })
                }

                else {
                    // res.json().then(err => {
                    //     console.log("Error", err.message)
                    // });
                    setErrorMssg("Failed to fetch order details");
                }
            })
            .catch((error) => {
                console.log(error);
                setErrorMssg("Failed to fetch order details");
            });
    }

    const closeErrorMssg = () => {
        setErrorMssg("");
    }

    const closeSuccessMssg = () => {
        setSuccessMssg("");
    }

    const handleDoctorChange = (index, event) => {
        console.log("typing", event.target.name);
        let data = [...appointmentDetails];
        data[index][event.target.name] = event.target.value
        setAppointmentDetails(data)
        setDoctorErrorMssg("");
    }


    const handleDateChange = (date, dateString, index) => {
        setDate(dateString);
        console.log(date, dateString, index);
        let data = [...currentAppointments];
        data[index]["date"] = dateString
        setAppointmentDetails(data)
        setDateErrorMssg("");
    }

    const handleTimeChange = (time, timeString, index) => {
        console.log(time, timeString);
        let data = [...currentAppointments];
        data[index]["time"] = timeString
        setAppointmentDetails(data)
        setTime(timeString);
    };

    const handleSubmit = (appointment) => {
        // e.preventDefault();
        console.log(appointment)
        let updatedAppointment = {
            id: appointment.id,
            patientEmail: appointment.patientEmail,
            doctorEmail: appointment.doctorEmail,
            date: Moment(appointment.date).format("MM/DD/YYYY"),
            // time: Moment(appointment.time).format
            time: Moment(appointment.time,'hh:mm:ss A').format('hh:mm:ss A')

        }

        console.log("Updated details: ", updatedAppointment)

        appointmentService.updateAppointment(updatedAppointment, cookies.token)
            .then(res => {
                if (res.status === 200) {
                    res.json()
                        .then(data => {
                            setSuccessMssg(constants.APPOINTMENT_UPDATE_SUCCESS)
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


    const handleDelete = (id) => {
        appointmentService.deleteAppointment(id, cookies.token)
        .then(res => {
            if (res.status === 200) {
                res.json()
                    .then(data => {
                        setSuccessMssg(constants.APPOINTMENT_DELETE_SUCCESS)
                        getAppointments();
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


    return (
        <div className="container">
            <div className="item-edit-heading App color-blue">
                <h3>Appointments History</h3>
            </div>
            {/* {errorMssg.length > 0 ?
                <ErrorMssg
                    message={errorMssg}
                    closeErrorMssg={() => { closeErrorMssg() }}
                />
                : ''} */}
            <div className="item-edit-heading margin-top-40 color-teal">
                <h3>Upcoming Appointments</h3>
            </div>
            {currentAppointments?.length > 0 ?
                <div>
                    {currentAppointments?.map((appointment, index) => (
                        <div>
                            <Accordion className="acc-spacing">
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Appointment {index + 1}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <div class="container">
                                            {successMssg.length > 0 ?
                                                <SuccessMssg
                                                    message={successMssg}
                                                    closeSuccessMssg={() => { closeSuccessMssg() }}
                                                />
                                                : ''}
                                            {errorMssg.length > 0 ?
                                                <ErrorMssg
                                                    message={errorMssg}
                                                    closeErrorMssg={() => { closeErrorMssg() }}
                                                />
                                                : ''}
                                            <div class="row">
                                                <div class="col-sm">
                                                    <div className="form-group appointment-input-container">
                                                        <label htmlFor="Patient" className="mb-1 color-blue  appointment-label">Patient Email</label>
                                                        <input type="email" name="patient" id="patient" className="form-control appointment-input" value={appointment.patientEmail} placeholder="Email" readOnly></input>
                                                        {/* <p >{appointment.patient.firstName} {appointment.patient.lastName}</p> */}
                                                    </div>
                                                </div>
                                                <div class="col-sm">
                                                    <div className="form-group appointment-input-container">
                                                        <label htmlFor="doctor" className="mb-1 color-blue  appointment-label required">Doctor Email</label>
                                                        <input name="doctorEmail" id="doctor" className=" form-control appointment-input" placeholder="Email" value={appointment.doctorEmail}
                                                            readOnly={dayjs(appointment.date) < dayjs(new Date())}
                                                            onChange={event => handleDoctorChange(index, event)}
                                                        ></input>
                                                        <p className={`${doctorErrorMssg.length === 0 ? 'hide-error-mssg' : 'show-error-mssg'}`}>{doctorErrorMssg}</p>
                                                    </div>
                                                </div>
                                                <div class="col-sm">
                                                    <div className="form-group appointment-input-container">
                                                        <div className="row">
                                                            <label htmlFor="date" className="mb-1 color-blue  appointment-label required">Date</label>
                                                        </div>
                                                        <div className="row">
                                                            <DatePicker
                                                                disabled={dayjs(appointment.date) < dayjs(new Date())}
                                                                format="MM-DD-YYYY"
                                                                name="date"
                                                                disabledDate={disabledDate}
                                                                bordered={false}
                                                                className="date-time-border"
                                                                defaultValue={dayjs(appointment.date)}
                                                                onChange={(date, dateString) => handleDateChange(date, dateString, index)}
                                                            />
                                                            <p className="{`${doctorErrorMssg.length === 0 ? 'hide-error-mssg' : 'show-error-mssg'}`}">{dateErrorMssg}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm">
                                                    <div className="form-group appointment-input-container">
                                                        <div className="row">
                                                            <label htmlFor="time" className="mb-1 color-blue appointment-label required">Time</label>
                                                        </div>
                                                        <div className="row">

                                                            <TimePicker use12Hours
                                                                format="hh:mm:ss A"
                                                                disabled={dayjs(appointment.date) < dayjs(new Date())}
                                                                bordered={false}
                                                                minuteStep={15} secondStep={10} hourStep={1}
                                                                className="date-time-border"
                                                                // disabledTime={disabledDateTime}
                                                                defaultValue={dayjs(appointment.time)}
                                                                onChange={(time, timeString) => handleTimeChange(time, timeString, index)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="mb-3 btn-holder row">
                                                    <div className="col-11">
                                                    <input style={{ float: "right" }} type="submit" className="custom-button" value="Edit" onClick={() => handleSubmit(appointment)}></input>
                                                   
                                                </div>
                                                <div className="col-1" >
                                                <input style={{ float: "right" }} type="submit" className="custom-button" value="Delete" onClick={() => handleDelete(appointment.id)}></input>
                                                </div>
                                                </div>
                                                {/* <div>
                                                    <button style={{ float: "right" }} onClick={handleSubmit(index)}>Edit</button>

                                                </div> */}
                                            {/* </div> */}
                                        </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>

                    ))}
                </div>
                :
                <div>
                    <p>No appointments found</p>
                </div>}
            <div className="item-edit-heading margin-top-40 color-teal">
                <h3>Past Appointments</h3>
            </div>

            {pastAppointments?.length > 0 ?
                <div>
                    {pastAppointments?.map((appointment, index) => (
                        <div>
                            <Accordion className="acc-spacing">
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Appointment {index + 1}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-sm">
                                                    <div className="form-group appointment-input-container">
                                                        <label htmlFor="Patient" className="mb-1 color-blue  appointment-label">Patient Email</label>
                                                        <input type="email" name="patient" id="patient" className="form-control appointment-input" value={appointment.patientEmail} placeholder="Email" readOnly></input>
                                                        {/* <p >{appointment.patient.firstName} {appointment.patient.lastName}</p> */}
                                                    </div>
                                                </div>
                                                <div class="col-sm">
                                                    <div className="form-group appointment-input-container">
                                                        <label htmlFor="doctor" className="mb-1 color-blue  appointment-label required">Doctor Email</label>
                                                        <input name="doctorEmail" id="doctor" className=" form-control appointment-input" placeholder="Email" value={appointment.doctorEmail}
                                                            readOnly={dayjs(appointment.date) < dayjs(new Date())}
                                                            onChange={event => handleDoctorChange(index, event)}
                                                        ></input>
                                                        <p className={`${doctorErrorMssg.length === 0 ? 'hide-error-mssg' : 'show-error-mssg'}`}>{doctorErrorMssg}</p>
                                                    </div>
                                                </div>
                                                <div class="col-sm">
                                                    <div className="form-group appointment-input-container">
                                                        <div className="row">
                                                            <label htmlFor="date" className="mb-1 color-blue appointment-label required">Date</label>
                                                        </div>
                                                        <div className="row">
                                                            <DatePicker
                                                                disabled={dayjs(appointment.date) < dayjs(new Date())}
                                                                format="MM-DD-YYYY"
                                                                disabledDate={disabledDate}
                                                                bordered={false}
                                                                className="date-time-border"
                                                                defaultValue={dayjs(appointment.date)}
                                                                onChange={(date) => handleDateChange(date)}
                                                            />
                                                            <p className="{`${doctorErrorMssg.length === 0 ? 'hide-error-mssg' : 'show-error-mssg'}`}">{dateErrorMssg}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm">
                                                    <div className="form-group appointment-input-container">
                                                        <div className="row">
                                                            <label htmlFor="time" className="mb-1 color-blue appointment-label required">Time</label>
                                                        </div>
                                                        <div className="row">

                                                            <TimePicker use12Hours
                                                                format="hh:mm:ss A"
                                                                disabled={dayjs(appointment.date) < dayjs(new Date())}
                                                                bordered={false}
                                                                minuteStep={15} secondStep={10} hourStep={1}
                                                                className="date-time-border"
                                                                disabledTime={disabledDateTime}
                                                                defaultValue={dayjs(appointment.time)}
                                                                onChange={handleTimeChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-3 btn-holder">
                                                    <input style={{ float: "right" }} type="submit" className="" value="Edit" onClick={() => handleSubmit(appointment)}></input>
                                                    <input style={{ float: "right" }} type="submit" className="" value="Delete" onClick={() => handleDelete(appointment.id)}></input>
                                                </div>
                                            </div>
                                        </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>

                    ))}
                </div>
                :
                <div>
                    <p>No apointments</p>
                </div>}
        </div>
    )
}

export default Appointments;
