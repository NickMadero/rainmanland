/**
 *
 *  Author: Marcus Tangradi
 *
 *
 * This file is meant to check if a half day is available
 *
 * This takes a half day, a crew, the new appointment being scheduled and returns
 * if that half day should be shown as available
 */
const dbController = require("../dbController");


async function checkCalendarAvailability(calendar, appointment){

    console.log(appointment);

    for(let i = 0; i < calendar.halfDays.length; i++ ){
        calendar.halfDays[i] = await checkHalfDay(calendar.halfDays[i], appointment, calendar.crewName);
        console.log(calendar.halfDays[i]);
    }


    return Promise.resolve(calendar);
}

/**
 * this will check all half days and set if they are available or not based on the appointment
 * all if statements will only change the isAvailable variable to false
 * @param halfDay
 * @param appointment
 * @returns {Promise<void>}
 */
async function checkHalfDay(halfDay, appointment, crewName){

    //check if an appointent is too far from an existing appointment on a half day
    if( await checkDistanceBetweenAppointmentsTooFar(halfDay, appointment, crewName) === true){
        halfDay.isAvailable = 0;
    }

    // console.log(halfDay);
    // halfDay.isAvailable = halfDay.isAvailable = 0;
    // halfDay.isAvailable = 0;

    return Promise.resolve(halfDay);
}

/**
 * THIS WILL use the google maps api to check the distance between an existing appointment on a half day and the
 * appointment trying to be scheduled
 *
 * @param halfDay a single half day from the calendar
 * @param appointment the new appointment that is trying to be scheduled
 * @returns {Promise<boolean>} a boolean value to determine if an appointment is too far
 */
async function checkDistanceBetweenAppointmentsTooFar(halfDay, appointment, crewName){
    let isTooFar = false;

    //this will query the database to get all the appointments on a half day to compare distance to new appointment
    let storedHalfDay = await getStoredHalfDay(halfDay, crewName);



    return Promise.resolve(isTooFar);
}

async function getStoredHalfDay(halfDay, crewName){
    const getAppOnHalfDay = 'call rainmanland.get_appointments_on_half_day_from_date_crew(?, ?);';

    let storedHalfDay = {
         appointments :[],
    };


    return new Promise((resolve, reject) => {
        dbController.query(getAppOnHalfDay, [crewName,halfDay.date], (err, result) => {
            if (err) {
                reject(err);
            } else {

                //TODO get the result and store into the storedHalfDay object

                resolve(storedHalfDay);
            }
        });
    });
}


module.exports = {checkCalendarAvailability};