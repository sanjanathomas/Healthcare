import React from "react";
import { useCookies } from "react-cookie";
import { Switch, Routes, Route } from 'react-router-dom';
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Doctors from "./components/Doctors/Doctors";
import Appointments from "./components/Appointments/Appointments";
import NewAppointment from "./components/NewAppointment/NewAppointment";
import Profile from "./components/Profile/Profile";

const Router = () => {

    // const [cookies] = useCookies('user');
  
    return (
      <Routes>
            <Route path="/signup" element={<Registration />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/account/history" element={<Appointments />} />
            <Route path="/account/new" element={<NewAppointment />} />
            <Route path="/profile" element={<Profile />} />
          {/* <Route path="/account" element={<AccessPage />} />
          <Route path="/checkout" element={cookies.user? <Checkout /> : <AccessPage/>} />
          <Route path="/order-status" element={cookies.user? <SuccessOrder /> : <AccessPage />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/item" element={cookies.user? <EditItem /> : <AccessPage/>} />
          <Route path="/new-item" element={cookies.user? <NewItem /> : <AccessPage/>} />
          <Route path="/account/history" element={cookies.user? <History /> : <AccessPage/>} />
          <Route path="/account/profile" element={cookies.user? <UserProfile /> : <AccessPage/>} /> */}
      </Routes>
    );
  }
  
  export default Router