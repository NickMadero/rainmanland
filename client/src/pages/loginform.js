import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const LoginForm = (props) => {
 const navigate = useNavigate();

  // used for onclick when user clicks login 
    const CustomerInfoPage = () => {
    navigate("/rainmanland/src/pages/customerinfo.js");
  };


// used for onclick when a user clicks on signup
  const createAccount = () => {
    navigate("/rainmanland/src/pages/signupPage.js")
  }

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
            left: '500px',
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
            required
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
             required
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
              right: '50px',
              width: '100px',
              paddingRight: '14px',
              height: '35px',
              color: 'blue',
            }}
          >
            forgot password?
          </button>
          <button onClick={CustomerInfoPage }
            style={{
              top: '218px',
              left: '50px',
              width:'100px',
              position: 'absolute',
              color: 'blue',
            }}
          >
            login
          </button>

          <button onClick={createAccount }
            style={{
              left: '50px',
              position: 'absolute',
              bottom: '31px',
              color: 'blue',
            }} 
            >
            create account
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
