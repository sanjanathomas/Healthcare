import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import UserService from "../../service/UserService";
import ErrorMssg from "../ErrorMssg/ErrorMssg";
import './Profile.css'
import PersonalDetails from "../PersonalDetails/PersonalDetails";
import SecurityDetails from "../SecurityDetails/SecurityDetails";
import AddressDetails from "../AddressDetails/AddressDetails";


const Profile = () => {

    const [user, setUser] = useState({});
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'token']);
    const [errorMssg, setErrorMssg] = useState("");
    const [page, setPage] = useState("")
    const [isPersonal, setIsPersonal] = useState(true);
    const [isSecurity, setIsSecurity] = useState(false);
    const [isAddress, setIsAddress] = useState(false);

    useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = () => {
        UserService.getUserByEmail(cookies.user, cookies.token)
            .then(res => {
                if (res.status === 200) {
                    res.json()
                        .then(data => {
                            console.log("Data--->", data);
                            setUser(data);
                        });
                }
                else if (res.status === 403) {
                    window.location = "/signin"
                }
                else if (res.status === 600) {
                    res.json().then(err => {
                        setErrorMssg(err.detail)
                    })
                }
                else {
                    setErrorMssg("Failed to fetch order details");
                }
            })
            .catch((error) => {
                console.log(error);
                setErrorMssg("Failed to fetch order details");
            });
    }

    const handlePage = (e) => {
        console.log(e.currentTarget.dataset.id)
        setPage(e.currentTarget.dataset.id)
        console.log("page: ", page)
        if (e.currentTarget.dataset.id == 'personal') {
            setIsPersonal(true)
            setIsAddress(false)
            setIsSecurity(false)
        }

        else if (e.currentTarget.dataset.id == 'security') {
            setIsPersonal(false)
            setIsAddress(false)
            setIsSecurity(true)
        }
        else if (e.currentTarget.dataset.id == 'address') {
            setIsPersonal(false)
            setIsAddress(true)
            setIsSecurity(false)
        }
    }


    return (
        <div className="max-width">
            <div className="item-edit-heading App color-blue">
                <h3>Account Details</h3>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <ul className="custom-ul">
                            <li className="custom-li" onClick={handlePage.bind(this)} data-id="personal">Personal Details</li>
                            <li className="custom-li" onClick={handlePage.bind(this)} data-id="security">Security</li>
                            <li className="custom-li" onClick={handlePage.bind(this)} data-id="address">Address</li>
                        </ul>
                    </div>
                    <div className="col-9 details-container">
                        {isPersonal ?
                            <PersonalDetails
                                user={user}
                            />
                            : isSecurity ?
                            <SecurityDetails
                            user={user}
                            />
                                :
                                isAddress ? 
                                <AddressDetails 
                                user={user}/>
                                :
                                ''
                        }

                    </div>
                </div>
            </div>
        </div>
    )

}
export default Profile;