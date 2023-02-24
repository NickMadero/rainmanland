import React from 'react'
import CustomerInfoPage from './customerinfo'
import { Navigate, useNavigate } from 'react-router-dom';

const LoginForm = (props) => {
// this small block is for navigating to customerinfo when login is clicked.
    const navigate = useNavigate();
    const CustomerInfoPage = () => {
    navigate("/rainmanland/calendar/src/pages/customerinfo.js");
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: 'var(--dl-color-ios-bg)',
          height: '394px',
          display: 'flex',
          alignItems: 'center',
          flexShrink: '0',
          borderColor: 'transparent',
          position: 'relative',
          overflow: 'hidden',
          justifyContent: 'flex-start',
        }}
      >
        <form
          style={{
            width: '200px',
            height: '317px',
            display: 'flex',
            top: '62px',
            left: '286px',
            position: 'absolute',
            borderStyle: 'solid',
            borderColor: 'var(--dl-color-gray-black)',
          }}
        >
          <span
            style={{
              top: '13px',
              left: '81px',
              position: 'absolute',
            }}
          >
            login
          </span>
          <span
            style={{
              top: '44px',
              left: '5px',
              position: 'absolute',
            }}
          >
            email
          </span>
          <input
            type="text"
            placeholder="enter email"
            // required
            style={{
              top: '64px',
              position: 'absolute',
              left: '3px',
              width: '183px',
            }}
          />
          <span
            style={{
              top: '113px',
              left: '4px',
              position: 'absolute',
            }}
          >
            <span>password</span>
            <br></br>
          </span>
          <input
            type="text"
            placeholder="enter password"
            // required
            style={{
              top: '136px',
              left: '1px',
              position: 'absolute',
              width: '187px',
            }}
          />
          <button
            style={{
              top: '174px',
              position: 'absolute',
              right: '10px',
              width: '170px',
              paddingRight: '14px',
              height: '35px',
              color: 'var(--dl-color-primary-100)',
            }}
          >
            forgot password?
          </button>
          <button onClick={CustomerInfoPage }
            style={{
              top: '218px',
              left: '52px',
              position: 'absolute',
            }}
          >
            login
          </button>
          <a
            href="https://example.com"
            target="_blank"
            rel="noreferrer noopener"
            style={{
              left: '36px',
              position: 'absolute',
              bottom: '31px',
              color: 'var(--dl-color-primary-100)',
            }}
          >
            create account
          </a>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
