import React, { useState, useEffect } from "react";
import home from '../../images/healthcare.jpeg';
// import roleService from '../../service/roles';
import { useCookies } from 'react-cookie';
import './Home.css';

const Home = () => {

  const styles = {
      backgroundImage: `url(${home})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh'
  }
  const [cookies, setCookie] = useCookies(['user']);

  useEffect(() => {
  }, []);


  return (
      <div>
          <div className="row" style={styles}>
              <div className="col-md-6 main-section d-flex justify-content-center align-items-center">
                  <div>
                      <p className="tagline">Your health is our <br />priority!</p>
                      <p>Serving you since 2021</p>
                  </div>

              </div>
          </div>
      </div>
  )
}

export default Home