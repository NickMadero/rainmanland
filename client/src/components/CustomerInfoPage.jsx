import React from 'react'

function CustomerInfoPage(props) {
    return (
        <div>
            <div
                style={{
                    width: 'auto',
                    height: 'auto',
                    display: 'flex',
                    overflow: 'hidden',
                    position: 'relative',
                    alignItems: 'center',
                    flexShrink: '0',
                    borderColor: 'transparent',
                    justifyContent: 'center',
                    backgroundColor: 'var(--dl-color-ios-bg)',
                }}
            >
                <form
                    style={{
                        width: '184px',
                        paddingLeft:'5px',
                        height: '400px',
                        margin: '95px',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        borderColor:"black",
                        borderStyle:"solid",
                    }}
                >
                    <span>is the controller outside?</span>
                    <input type="text" placeholder="yes or no" required pattern="yes|no" />
                    <span>what brand is your controller?</span>
                    <input type="text" placeholder="brand" required  pattern="[A-Za-z ]+" />
                    <span>how many units per zone?</span>
                    <input type="text" placeholder="# of units" required min = "0"  />
                    <span>how many zones?</span>
                    <input type="text" placeholder="# of zones" required  min= "0"/>
                    <span>what is your address?</span>
                    <input type="text" placeholder="enter address" required />
                    <button onClick={props.onGoToCalendarButtonClick} style={{margin:'30px', color: 'blue',}}>book a new  appointment</button>
                </form>
            </div>
        </div>
    )
}

export default CustomerInfoPage