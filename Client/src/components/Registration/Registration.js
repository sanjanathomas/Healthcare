import React, { useState } from "react";
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from 'react-icons/io';
import './Registration.css'
import authService from "../../service/authService";
import constants from "../../constants";
import ErrorMssg from "../ErrorMssg/ErrorMssg";

const Registration = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userType, setUserType] = useState("");
    const [roleId, setRoleId] = useState(2);
    const [streetAddress, setStreetAddress] = useState("");
    const [aptNo, setAptNo] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setcountry] = useState("");
    const [phnNo, setPhnNo] = useState("");
    const [errorMssg, setErrorMssg] = useState("");
    const [emailErrorMssg, setEmailErrorMssg] = useState("");
    const [passwordErrorMssg, setPasswordErrorMssg] = useState("");
    const [confirmPpasswordErrorMssg, setConfirmPasswordErrorMssg] = useState("");
    const [firstNameErrorMssg, setFirstNameErrorMssg] = useState("");
    const [userTypeErrorMssg, setUserTypeErrorMssg] = useState("");
    const [streetAddressErrorMssg, setStreetAddressErrorMssg] = useState("");
    const [aptNoErrorMssg, setAptNoErrorMssg] = useState("");
    const [cityErrorMssg, setCityErrorMssg] = useState("");
    const [stateErrorMssg, setStateErrorMssg] = useState("");
    const [countryErrorMssg, setcountryErrorMssg] = useState("");
    const [phnNoErrorMssg, setPhnNoErrorMssg] = useState("");
    const [validPassword, setValidPassword] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [validConfirmPassword, setValidConfirmPassword] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const handleNext = (name) => {
        
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailErrorMssg("");
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordErrorMssg("");
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordErrorMssg("");
    }

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
        setFirstNameErrorMssg("");
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    const handleUserTypeChange = (type) => {
        setUserType(type);
        setUserTypeErrorMssg("");
        if(type == "Doctor") {
            setRoleId(1);
        }
    }

    const handleStreetAddress = (e) => {
        setStreetAddress(e.target.value);
        setStreetAddressErrorMssg("");
    }

    const handleAptNo = (e) => {
        setAptNo(e.target.value);
        // setAptNoErrorMssg("");
    }

    const handleCity = (e) => {
        setCity(e.target.value);
        setCityErrorMssg("");
    }

    const handleState = (e) => {
        setState(e.target.value);
        setStateErrorMssg("");
    }

    const handlecountry = (e) => {
        setcountry(e.target.value);
        setcountryErrorMssg("");
    }
    const handlePhnNo = (e) => {
        setPhnNo(e.target.value);
        setPhnNoErrorMssg("");
    }

    const handleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValidEmail = true;
        let isValidFirstName = true;
        let isValidPassword = true;
        let isValidConfirmPassword = true;
        let isValidUserType = true;

        if (firstName.length === 0) {
            isValidFirstName = false;
            setFirstNameErrorMssg("First name is required");
        }

        if (email.length === 0) {
            setValidEmail(false);
            isValidEmail = false;
            setEmailErrorMssg("Email is required");
        } else if (email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/)) {
            setValidEmail(true);
            setEmailErrorMssg("");
        } else {
            setValidEmail(false);
            isValidEmail = false;
            setEmailErrorMssg("Email format is wrong");
        }

        if (password.length === 0) {
            isValidPassword = false;
            setPasswordErrorMssg("Password is reuired");
        } 

        if (confirmPassword.length === 0) {
            setConfirmPasswordErrorMssg("Confirm password field is required");
            isValidConfirmPassword = false;
        }

        if (password.length > 0 && password !== confirmPassword) {
            isValidConfirmPassword = false;
            setConfirmPasswordErrorMssg("Passwords don't match");
        }

        if (userType.length === 0) {
            isValidUserType = false;
            setUserTypeErrorMssg("User type is required");
        }

        let isValidStreetAddress = true;
        // let isValidAptNo = true;
        let isValidCity = true;
        let isValidState = true;
        let isValidcountry = true;
        let isValidPhnNo = true;

        if (streetAddress.length === 0) {
            setStreetAddressErrorMssg("Street address is required");
            isValidStreetAddress = false;
        }

        // if (aptNo.length === 0) {
        //     setAptNoErrorMssg("Apartment number is required");
        //     isValidAptNo = false;
        // }

        if (city.length === 0) {
            setCityErrorMssg("City is required");
            isValidCity = false;
        }

        if (state.length === 0) {
            setStateErrorMssg("State is required");
            isValidState = false;
        }

        if (country.length === 0) {
            setcountryErrorMssg("Country is required");
            isValidcountry = false;
        }

        if (phnNo.length === 0) {
            setPhnNoErrorMssg("Phone number is required");
            isValidPhnNo = false;
        } else if (!phnNo.match(/^[0-9]+$/)) {
            setPhnNoErrorMssg("Phone number can only contain digits");
            isValidPhnNo = false;
        }
        else if (phnNo.length < 10) {
            setPhnNoErrorMssg("Phone number must have 10 digits");
            isValidPhnNo = false;
        } else if (phnNo.length > 10) {
            setPhnNoErrorMssg("Phone number must have only 10 digits");
            isValidPhnNo = false;
        }

        if (isValidFirstName && isValidPassword && isValidConfirmPassword && isValidEmail && isValidUserType &&
             isValidStreetAddress && isValidCity && isValidState && isValidcountry && isValidPhnNo) {
            let newUser = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phnNo,
                password: password,
                address: {
                    street: streetAddress,
                    aptNo: aptNo.length>0 ? aptNo : null,
                    city: city,
                    state: state,
                    country: country
                },
                role: {
                    id: roleId,
                    roleName: userType
                }
                
            }

            authService.register(newUser)
                .then(res => {
                    if (res.status === 200) {
                        res.json()
                            .then(data => {
                                console.log("Data--->", data)
                                window.location = "/signin"
                            });
                    } else if (res.status === 600) {
                        res.json().then(err => {
                            console.log("Error", err.message)
                            setErrorMssg(constants.DUPLICATE_SIGNUP);
                        });
                    }
                    else {
                        res.json().then(err => {
                            console.log("Error", err.message)
                            setErrorMssg(constants.INTERNAL_SERVER_ERROR);
                        });
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

            <form method="post" action="/account" id="create_customer" acceptCharset="UTF-8" className="general-form">
                {errorMssg?.length > 0 ?
                    <ErrorMssg
                        message={errorMssg}
                        closeErrorMssg={() => { handleClose() }}
                    ></ErrorMssg>
                    : ''}
                {/* {first ? */}
                    <div>
                        <div className="mb-3 row">
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="FirstName" className="mb-1 color-blue required">First Name</label>
                                <input type="text" name={firstName} className="form-control" id="firstName" placeholder="First Name" autoFocus="" value={firstName} onChange={handleFirstNameChange}></input>
                                <p className={`${firstNameErrorMssg.length === 0 ? 'hide-error-mssg' : 'show-error-mssg'}`}>{firstNameErrorMssg}</p>
                            </div>

                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="LastName" className="mb-1 color-blue">Last Name</label>
                                <input type="text" className="form-control" name={lastName} id="lastName" placeholder="Last Name" value={lastName} onChange={handleLastNameChange}></input>
                            </div>

                        </div>

                        <div className="mb-3 row">
                            <div className="form-group col-12">
                                <label htmlFor="Email" className="mb-1 color-blue required">Email</label>
                                <input type="email" name={email} id="email" className=" form-control" placeholder="Email" value={email} onChange={handleEmailChange} required></input>
                                <p className={`${validEmail === true ? 'hide-error-mssg' : 'show-error-mssg'}`}>{emailErrorMssg}</p>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <div className="form-group col-12">
                                <label htmlFor="password" className="mb-1 color-blue required">Password</label>
                                <input type="password" name={password} id="password" className=" form-control" placeholder="Password" value={password} onChange={handlePasswordChange}></input>
                                <p className={`${passwordErrorMssg.length === 0 ? 'hide-error-mssg' : 'show-error-mssg'}`}>{passwordErrorMssg}</p>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <div className="form-group col-12">
                                <label htmlFor="confirmPassword" className="mb-1 color-blue required">Confirm Password</label>
                                <input type="password" name={confirmPassword} id="confirmPassword" className=" form-control" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange}></input>
                                <p className={`${confirmPpasswordErrorMssg.length === 0 ? 'hide-error-mssg' : 'show-error-mssg'}`}>{confirmPpasswordErrorMssg}</p>
                            </div>
                        </div>
                    </div>

                    {/* : */}
                    <div>
                        <div className="mb-3 row">
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="StreetAddress" className="mb-1 color-blue required">Street</label>
                                <input type="text" name={streetAddress} className="form-control" id="street" placeholder="Street Address" autoFocus="" value={streetAddress} onChange={handleStreetAddress}></input>
                                <p className={`${streetAddressErrorMssg.length === 0 ? 'hide-error-mssg' : 'show-error-mssg'}`}>{streetAddressErrorMssg}</p>
                            </div>

                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="AptNo" className="mb-1 color-blue">Apartment No.</label>
                                <input type="text" className="form-control" name={aptNo} id="aptNo" placeholder="Apartment No." value={aptNo} onChange={handleAptNo}></input>
                                {/* <p className={`${aptNoErrorMssg.length === 0 ? 'hide-error-mssg' : 'show-error-mssg'}`}>{aptNoErrorMssg}</p> */}
                            </div>

                        </div>

                        <div className="mb-3 row">
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="City" className="mb-1 color-blue required">City</label>
                                <input type="text" name={city} className="form-control" id="city" placeholder="City" autoFocus="" value={city} onChange={handleCity}></input>
                                <p className={`${cityErrorMssg.length === 0 ? 'hide-error-mssg' : 'show-error-mssg'}`}>{cityErrorMssg}</p>
                            </div>

                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="State" className="mb-1 color-blue required">State</label>
                                <input type="text" className="form-control" name={state} id="state" placeholder="State" value={state} onChange={handleState}></input>
                                <p className={`${stateErrorMssg.length === 0 ? 'hide-error-mssg' : 'show-error-mssg'}`}>{stateErrorMssg}</p>
                            </div>

                        </div>

                        <div className="mb-3 row">
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="country" className="mb-1 color-blue required">Country</label>
                                <input type="text" name={country} className="form-control" id="country" placeholder="country" maxLength="5" autoFocus="" value={country} onChange={handlecountry}></input>
                                <p className={`${countryErrorMssg.length === 0 ? 'hide-error-mssg' : 'show-error-mssg'}`}>{countryErrorMssg}</p>
                            </div>

                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="PhoneNumber" className="mb-1 color-blue required">Phone Number</label>
                                <input type="text" className="form-control" name={phnNo} id="phnNo" placeholder="Pnone Number" maxLength="10" value={phnNo} onChange={handlePhnNo}></input>
                                <p className={`${phnNoErrorMssg.length === 0 ? 'hide-error-mssg' : 'show-error-mssg'}`}>{phnNoErrorMssg}</p>
                            </div>

                        </div>

                        <div className="form-group col-12 col-md-6 mb-3">
                        <div className={"custom-dropdown"}>
                                <div class="wrapper" onClick={handleDropdown}>
                                    <label htmlFor="userType" className="mb-1 color-blue required">userType</label>
                                    <input type="text" className="form-control delivery-input custom-input" value={userType} readOnly={true}></input>
                                    {/* {isOpen ? <IoIosArrowDropupCircle className="dropdown-icon" /> : <IoIosArrowDropdownCircle className="dropdown-icon" />} */}
                                </div>
                                {isOpen ?
                                    <ul className="list-group custom-list">
                                        {/* <li className="list-group-item grey-opt border-bottom-0">User Type</li> */}
                                        <li className="list-group-item padding-left-2 select-opt border-bottom-0" onClick={
                                            () => {
                                                handleUserTypeChange("Doctor");
                                                handleDropdown()
                                            }
                                        }>Doctor</li>
                                        <li className="list-group-item padding-left-2 select-opt border-bottom-0" onClick={
                                            () => {
                                                handleUserTypeChange("Patient");
                                                handleDropdown()
                                            }
                                        }>Patient</li>
                                    </ul>
                                    : ''}
                            </div>
                                <p className={`${userTypeErrorMssg.length === 0 ? 'hide-error-mssg' : 'show-error-mssg'}`}>{userTypeErrorMssg}</p>
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

export default Registration
