import React, { useEffect, useState } from "react";
// import logo from '../../images/header-logo.png';
import logo from '../../images/logo.jpeg';
import { FaUserCircle} from "react-icons/fa";
import { useCookies } from 'react-cookie';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './Header.css';

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(cookies.user);

  useEffect(() => {
  });

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  }

  const signOut = () => {
    removeCookie('user');
    console.log(cookies.user)
    removeCookie('userId');
    removeCookie('roleName');
    removeCookie('token');
    window.location = '/';
  }

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light custom-navbar">
      <div className="container-fluid">
        <a className="navbar-brand d-flex healthcare-title-container" href="/">
          <img src={logo} className="logo" alt="logo" />
          <div className="healthcare-title">
            <p className="healthcare-sub-title">Healthcare</p>
            <p className="healthcare-sub-title-2">Best in town</p>
          </div>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>x
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <a className="nav-link active custom-nav-items capitalize menu-link" aria-current="page" href="/doctors">Doctors</a>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex right-items-center account">
              {cookies.user ?
                <div className={"custom-dropdown custom-dropdown-account"}>
                  <div className="wrapper mr-30" onClick={handleDropdown}>
                    <p className="mb-0 accnt custom-input-account"><FaUserCircle className="account-logo-login" />Account</p>
                    {isOpen ? 
                    <FiChevronUp className="dropdown-icon-account" /> : 
                    <FiChevronDown className="dropdown-icon-account" />}
                  </div>
                  {isOpen ?
                    <ul className="list-group-account accnt-drop account-dropdown account-dropdown-position">
                      <li className="list-group-item account-link-container border-bottom-0"><a className="account-link" href="/account/history">Appointment History</a></li>
                      <li className="list-group-item account-link-container border-bottom-0"><a className="account-link" href="/account/new">Book new Appointment</a></li>
                      <li className="list-group-item account-link-container "><a className="account-link" href="/profile">Personal Info</a></li>
                      <li className="list-group-item account-link-container" onClick={signOut}>Sign out</li>
                    </ul>
                    : ''}
                </div>
                :
                <a className="nav-link custom-nav-items me-5" aria-current="page" href="/signin">
                  <FaUserCircle className="account-logo" />
                  <span className="account-label">SignUp/SignIn</span>
                </a>
              }
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header
