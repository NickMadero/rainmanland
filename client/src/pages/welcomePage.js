import React from 'react'
import LoginForm from './loginform'
import { Navigate, useNavigate } from 'react-router-dom'

const WelcomePage = (props) => {
  
  const navigate = useNavigate();
  // this small block is used navigate to loginform when login is clicked
  const gotoLogin = () => {
    navigate("/rainmanland/client/src/pages/LoginForm.js");
  };
  const gotoSignup = () => {
    navigate("/rainmanland/client/src/pages/signupPage.js");
  };
  
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        overflow: 'auto',
        minHeight: '100vh',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <h1
        style={{
          top: '132px',
          left: '511px',
          position: 'absolute',
        }}
      >
        Rainman Lawns
      </h1>
      <h2
        style={{
          top: '172px',
          left: '468px',
          position: 'absolute',
        }}
      >
        book your appointment online!
      </h2>
      <button style={{top:'245px',left:'595px',position:'absolute', color:'white',background:'blue', fontSize:"20px"}}
       onClick={gotoLogin}>login</button>
      <button style={{top:'280px',left:'595px',position:'absolute', color:'white',background:'blue',fontSize:"20px"}}
      onClick={gotoSignup}>signup</button>
    </div>
  )
}

export default WelcomePage
