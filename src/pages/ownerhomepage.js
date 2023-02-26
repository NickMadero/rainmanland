import React from 'react'

const OwnerHomePage = (props) => {
    /** Event handling goes here */
    return (
        <div
          style={{
            width: '100%',
            display: 'flex',
            overflow: 'auto',
            minHeight: '100vh',
            alignItems: 'flex-start',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              flex: '0 0 auto',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <form
              id="form__service-area"
              name="form"
              style={{
                width: '200px',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '350px',
                  hei ght: 'auto',
                  alignItems: 'center',
                  flex: '0 0 auto',
                }}
              >
                <label>
                  <span>Address &amp; Service Area</span>
                  <br></br>
                </label>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '350px',
                    height: 'auto',
                    alignItems: 'center',
                    flex: '0 0 auto',
                    justifyContent: 'center',
                  }}
                >
                  <input
                    type="text"
                    id="input__businesss-address1"
                    placeholder="Business Address 1"
                    style={{
                      transition: '0.3s',
                    }}
                  />
                  <input
                    type="text"
                    id="input__business-address2"
                    placeholder="Business Address 2"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      )
    }
export default OwnerHomepage