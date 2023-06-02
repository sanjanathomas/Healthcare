import React, { useEffect, useState } from "react";
import './Doctors.css'
import UserService from "../../service/UserService";

const Doctors = (props) => {

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        getAllDoctors();
    }, []);

    const getAllDoctors = async () => {
        await UserService.getAllDoctors()
            .then(res => {
                if (res.status === 200) {
                    res.json()
                        .then(data => {
                            console.log("Data--->", data);
                            setDoctors(data);
                        });
                }
            })
            .catch((error) => { console.log(error) });
    }


    return (
        <div>
            {doctors.length < 1 ?
                <p>Doctors' information not found</p> :
                <div className="d-flex card-container">
                    {doctors?.map((doctor, index) => (
                        <div className="card custom-card" key={index}>
                            <div className="card-body">
                                <div class="col">
                                    <div class="img-container mb-5">
                                        <img class="fluid-img item-image img-position" src="/images"></img>

                                    </div>
                                    <div><p>{doctor.firstName} {doctor.lastName}</p></div></div>
                            </div>
                        </div>
                    ))}

                </div>}
        </div>
    )
}

export default Doctors