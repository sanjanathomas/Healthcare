import React, { useState } from "react";
import { Link } from "react-router-dom";
// import LoginPage from "../LoginPage/LoginPage";
// import Registration from '../Registration/Registration';
import './Login.css'
import { useCookies } from "react-cookie";
import ErrorMssg from "../ErrorMssg/ErrorMssg";
import authService from "../../service/authService";
import constants from "../../constants";
import UserService from "../../service/UserService";

const Login = () => {

    const [heading, setHeading] = useState("Login");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMssg, setErrorMssg] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = (e) => {
        setErrorMssg("");
        e.preventDefault();

        const loginData = {
            email: email,
            password: password,
        }

        authService.login(loginData)
            .then(res => {
                if (res.status === 200) {
                    res.json()
                        .then(data => {
                            setCookie('token', data.token)
                            console.log("token: ", data.token)
                            UserService.getUserByEmail(email, data.token).then(response => {
                                if (response.status === 200) {
                                    response.json().then(userData => {
                                        setCookie('user', email, { path: '/' });
                                    setCookie('userId', userData.id, { path: '/' });
                                    setCookie('roleName', userData.role.roleName, { path: '/' });
                                    console.log("data: " , userData)
                                    console.log("roleName: " , userData.role.roleName)
                                    if(userData.role.roleName == "Doctor")
                                        window.location = '/account/history';
                                    else
                                        window.location = '/account/new';
                                    })
                                    
                                } else {
                                    setErrorMssg(constants.INTERNAL_SERVER_ERROR)
                                }
                            }).catch((error) => {
                                console.log(error)
                            });


                        });
                } else if (res.status === 403) {
                    setErrorMssg(constants.UNAUTHORISED_ACCESS)
                } else if (res.status === 500) {
                    setErrorMssg(constants.INTERNAL_SERVER_ERROR)
                } else if (res.status === 400) {
                    setErrorMssg(constants.UNAUTHORISED_ACCESS)
                } else if (res.status === 600) {
                    res.json().then(err => {
                    setErrorMssg(err.detail)
                    })
                } else {
                    setErrorMssg(constants.INTERNAL_SERVER_ERROR)
                    // res.json().then(err => {
                    //     console.log("Error", err.message)
                        
                    // });
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const closeErrorMssg = () => {
        setErrorMssg("");
    }


    return (
        <div>
            <div className="row">
                <div className="mt-5 mb-3 col-12 heading-alt">
                    <h1 className="header">{heading}</h1>
                </div>
            </div>


            <form id="create_customer" acceptCharset="UTF-8" className="general-form">
                {errorMssg.length > 0 ? <ErrorMssg message={errorMssg} closeErrorMssg={() => { closeErrorMssg() }} /> : ''}
                <div className="mb-3 row">
                    <div className="form-group col-12">
                        <label htmlFor="Email" className="mb-1 color-blue">Email</label>
                        <input type="email" name={email} id="email" className="form-control" placeholder="Email" value={email} onChange={handleEmailChange}></input>
                    </div>
                </div>

                <div className="mb-3 row">
                    <div className="form-group col-12">
                        <label htmlFor="password" className="mb-1 color-blue">Password</label>
                        <input type="password" name={password} id="password" className="form-control" placeholder="Password" value={password} onChange={handlePasswordChange}></input>
                    </div>
                </div>

                <div className="btn-holder">
                    <input type="submit" className="custom-button" value="Login" onClick={handleLogin}></input>
                    <a className="signup-txt nav-link custom-nav-items me-5" aria-current="page" href="/signup">Click here to register</a>
                </div>

            </form>
        </div>
    )
}

export default Login
