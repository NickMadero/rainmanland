import React from 'react'

const Signup = (props) => {
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
                SignUp
              </span>
              <span
                style={{
                  top: '44px',
                  left: '5px',
                  position: 'absolute',
                }}
              >
                Enter your name
              </span>
              <input
                type="text"
                placeholder="enter name"
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
                <span>enter your email</span>
             
              </span>
              <input
                type="text"
                placeholder="enter email"
                // required
                style={{
                  top: '136px',
                  left: '1px',
                  position: 'absolute',
                  width: '187px',
                }}
              />
             <span
                style={{
                  top: '175px',
                  left: '2px',
                  position: 'absolute',
                }}
              >
                <span>enter phone number</span>
             
              </span>
              <input type="text" placeholder='enter # number'style={{
                  top: '200px',
                  left: '1px',
                  position: 'absolute',
                  width: '187px',
                }}
                />

              <button type='submit'
                style={{
                  left: '36px',
                  position: 'absolute',
                  bottom: '31px',
                  color: 'var(--dl-color-primary-100)',
                }} 
                >
                create account
              </button>
            </form>
          </div>
        </div>
      )
}

export default Signup
 