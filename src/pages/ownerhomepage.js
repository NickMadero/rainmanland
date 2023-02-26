import React from 'react'

const OwnerHomePage = (props) => {
  return (
        <div
          style={{
            width: '100%',
            display: 'flex',
            overflow: 'auto',
            minHeight: '100vh',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <h1
            style={{
              top: 'var(--dl-space-space-oneandhalfunits)',
              left: '801px',
              float: 'right',
              position: 'absolute',
              alignSelf: 'center',
            }}
          >
            <span>Business Settings</span>
            <br></br>
            <br></br>
          </h1>
          {/** Top Container holds Service Area and Controller boxes */}
          <div
            id="container--top"
            style={{
              top: 'var(--dl-space-space-sixunits)',
              left: '0px',
              float: 'right',
              right: '0px',
              width: '1882px',
              height: '351px',
              margin: 'auto',
              display: 'flex',
              position: 'absolute',
              alignItems: 'center',
              marginLeft: 'var(--dl-space-space-unit)',
              borderColor: '#f50f13',
              borderStyle: 'double',
              borderWidth: '1px',
              marginRight: 'var(--dl-space-space-unit)',
              justifyContent: 'flex-end',
            }}
          >
            {/**Begin Service Area Form*/}
            <form
              id="form--service-area"
              name="form"
              style={{
                top: '0px',
                float: 'right',
                right: '0px',
                width: '424px',
                bottom: '0px',
                height: '244px',
                margin: 'var(--dl-space-space-threeunits)',
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                borderColor: '#0e0100',
                borderStyle: 'double',
                borderWidth: '1px',
                borderRadius: 'var(--dl-radius-radius-radius8)',
                justifyContent: 'flex-start',
                boxShadow: '5px 5px 10px 0px #d4d4d4',
              }}
            >
              <button
                id="btn--srvc-area"
                name="btn--srvc-area"
                style={{
                  color: '#d6d3d3',
                  right: '0px',
                  width: '135px',
                  bottom: '13px',
                  height: '36px',
                  display: 'flex',
                  position: 'absolute',
                  boxShadow: '5px 5px 10px 0px #8f8f90',
                  marginTop: 'var(--dl-space-space-halfunit)',
                  marginLeft: 'var(--dl-space-space-halfunit)',
                  transition: '0.3s',
                  borderWidth: '0px',
                  marginRight: 'var(--dl-space-space-halfunit)',
                  marginBottom: 'var(--dl-space-space-halfunit)',
                  flexDirection: 'row',
                  backgroundColor: 'rgba(38, 122, 56, 0.9)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  id="btn-confirm-text"
                  style={{
                    alignSelf: 'center',
                    fontFamily: 'Source Sans Pro',
                    textTransform: 'capitalize',
                    height: '100%',
                    marginRight: 'var(--dl-space-space-unit)',
                    marginLeft: 'var(--dl-space-space-unit)',
                    marginBottom: '0px',
                  }}
                >
                  <span>Confirm</span>
                  <br></br>
                  <br></br>
                </span>
              </button>
              <h3
                id="heading--srvc-area"
                style={{
                  top: '10px',
                  left: 'var(--dl-space-space-unit)',
                  float: 'right',
                  position: 'absolute',
                  fontFamily: 'Arial',
                }}
              >
                <span>Business Address &amp; Service A</span>
                <span>rea</span>
              </h3>
              <div
                style={{
                  top: '0px',
                  flex: '0 0 auto',
                  left: '1px',
                  width: '335px',
                  height: '170px',
                  display: 'flex',
                  position: 'absolute',
                  marginTop: 'var(--dl-space-space-twounits)',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <h4
                  style={{
                    left: '0px',
                    bottom: '22px',
                    position: 'absolute',
                    marginTop: '0px',
                    marginLeft: 'var(--dl-space-space-unit)',
                    marginBottom: '0px',
                  }}
                >
                  <span>Radius:</span>
                  <br></br>
                </h4>
                <form
                  id="input--business-address"
                  name="business-street-address"
                  style={{
                    width: '335px',
                    height: '121px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    position: 'relative',
                    marginTop: 'var(--dl-space-space-halfunit)',
                    alignItems: 'center',
                    marginLeft: 'var(--dl-space-space-halfunit)',
                    marginRight: 'var(--dl-space-space-halfunit)',
                    marginBottom: '0px',
                    paddingBottom: '2px',
                    justifyContent: 'center',
                  }}
                >
                  <input
                    type="text"
                    id="input--business-address1"
                    placeholder="Business Address 1"
                    style={{
                      top: '-7px',
                      left: '0px',
                      float: 'right',
                      width: '316px',
                      height: '27px',
                      position: 'absolute',
                      boxShadow: '5px 5px 10px 0px #d4d4d4',
                      marginTop: '.5rem',
                      marginLeft: 'var(--dl-space-space-unit)',
                      transition: '0.3s',
                      paddingLeft: 'var(--dl-space-space-oneandhalfunits)',
                      marginBottom: '.5rem',
                      backgroundColor: 'rgba(214, 202, 209, 0.35)',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                    }}
                  />
                  <input
                    type="text"
                    id="input--business-address2"
                    placeholder="Business Address 2"
                    style={{
                      top: '42px',
                      left: '0px',
                      float: 'right',
                      width: '316px',
                      height: '27px',
                      position: 'absolute',
                      boxShadow: '5px 5px 10px 0px #d4d4d4',
                      marginTop: '0px',
                      marginLeft: 'var(--dl-space-space-unit)',
                      transition: '0.3s',
                      marginBottom: '0px',
                      backgroundColor: 'rgba(214, 202, 209, 0.35)',
                    }}
                  />
                  <input
                    type="text"
                    id="input--zip-code"
                    name="zip code"
                    value="ZIP"
                    placeholder="placeholder"
                    style={{
                      right: '-61px',
                      width: 'var(--dl-size-size-medium)',
                      bottom: '2px',
                      height: '27px',
                      position: 'absolute',
                      alignSelf: 'flex-end',
                      boxShadow: '5px 5px 10px 0px #d4d4d4',
                      marginTop: 'var(--dl-space-space-halfunit)',
                      marginLeft: 'var(--dl-space-space-unit)',
                      transition: '0.3s',
                      marginBottom: 'var(--dl-space-space-halfunit)',
                      backgroundColor: 'rgba(214, 202, 209, 0.35)',
                    }}
                  />
                  <input
                    type="text"
                    id="input--city"
                    name="input city"
                    placeholder="City"
                    style={{
                      left: '0px',
                      width: '170px',
                      bottom: '10px',
                      height: '27px',
                      position: 'absolute',
                      boxShadow: '5px 5px 10px 0px #d4d4d4',
                      marginTop: 'auto',
                      marginLeft: 'var(--dl-space-space-unit)',
                      marginRight: 'auto',
                      marginBottom: 'auto',
                      backgroundColor: 'rgba(214, 202, 209, 0.35)',
                    }}
                  />
                  <input
                    type="text"
                    id="input--state"
                    name="input-"
                    placeholder="State"
                    style={{
                      left: '197px',
                      width: '90px',
                      bottom: '10px',
                      height: '27px',
                      position: 'absolute',
                      boxShadow: '5px 5px 10px 0px #d4d4d4',
                      backgroundColor: 'rgba(214, 202, 209, 0.35)',
                    }}
                  />
                </form>
              </div>
              {/** Select menu is a placeholder until a slider is implemented */}
              <select
                id="slct--radius"
                name="select-radius"
                style={{
                  left: '0px',
                  bottom: '22px',
                  height: '27px',
                  position: 'absolute',
                  boxShadow: '5px 5px 10px 0px #d4d4d4',
                  marginTop: 'var(--dl-space-space-halfunit)',
                  marginLeft: 'var(--dl-space-space-unit)',
                  transition: '0.3s',
                  borderColor: '#080808',
                  borderWidth: '1px',
                  borderRadius: 'var(--dl-radius-radius-radius4)',
                  backgroundColor: 'rgba(214, 202, 209, 0.35)',
                }}
              >
                <option value="5">5 miles</option>
                <option value="10">10 miles</option>
                <option value="15">15 miles</option>
                <option value="20">20 miles</option>
                <option value="25">25 miles</option>
              </select>
            </form>
          </div>
          <div
            style={{
              flex: '0 0 auto',
              float: 'right',
              width: '100%',
              border: '2px dashed rgba(120, 120, 120, 0.4)',
              height: '100px',
              display: 'flex',
              alignItems: 'flex-start',
            }}
          ></div>
        </div>
      )
}

export default OwnerHomePage