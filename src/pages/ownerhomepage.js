import React from 'react'

import projectStyles from './ownerhomepage.module.css'
import styles from './ownerhomepage.module.css'

const OwnerHomePage = (props) => {
  /*EVENT LISTENERS & HANDLERS GO HERE */
  return (
    <div className={styles['container']}>
      <h1 className={styles['text']}>
        <span>Business Settings</span>
        <br></br>
        <br></br>
      </h1>
      <div id="container--top" className={styles['top-container']}>
        <form
          id="form--service-area"
          name="form"
          className={styles['service-area']}
        >
          <button
            id="btn--srvc-area"
            name="btn--srvc-area"
            className={` ${styles['confirm']} ${projectStyles['button']} `}
          >
            <span id="btn-confirm-text" className={styles['text04']}>
              <span>Confirm</span>
              <br></br>
              <br></br>
            </span>
          </button>
          <h3 id="heading--srvc-area" className={styles['text08']}>
            <span>Business Address &amp; Service A</span>
            <span className={styles['text10']}>rea</span>
          </h3>
          <div className={styles['service-area-wrapper']}>
            <h4 className={styles['radius']}>
              <span>Radius:</span>
              <br></br>
            </h4>
            <form
              id="input--business-address"
              name="business-street-address"
              className={styles['address-form']}
            >
              <input
                type="text"
                id="input--business-address1"
                placeholder="Business Address 1"
                className={` ${styles['biz-address1']} ${projectStyles['input']} `}
              />
              <input
                type="text"
                id="input--business-address2"
                placeholder="Business Address 2"
                className={` ${styles['biz-address2']} ${projectStyles['input']} `}
              />
              <input
                type="text"
                id="input--zip-code"
                name="zip code"
                value="ZIP"
                placeholder="placeholder"
                className={` ${styles['textinput']} ${projectStyles['input']} `}
              />
              <input
                type="text"
                id="input--city"
                name="input city"
                placeholder="City"
                className={` ${styles['textinput1']} ${projectStyles['input']} `}
              />
              <input
                type="text"
                id="input--state"
                name="input-"
                placeholder="State"
                className={` ${styles['textinput2']} ${projectStyles['input']} `}
              />
            </form>
          </div>
          <select
            id="slct--radius"
            name="select-radius"
            className={styles['select-radius']}
          >
            <option value="5">5 miles</option>
            <option value="10">10 miles</option>
            <option value="15">15 miles</option>
            <option value="20">20 miles</option>
            <option value="25">25 miles</option>
          </select>
        </form>
      </div>
      <div id="container--bottom" className={styles['bottom-container']}></div>
    </div>
  )
}

export default OwnerHomePage