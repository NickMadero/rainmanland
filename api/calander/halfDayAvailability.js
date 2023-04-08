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
const {add} = require("nodemon/lib/rules");

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyAF2m0svp07tGLzObVsQFEIMw6EpRh14Hc',
    Promise: Promise
});

async function checkCalendarAvailability(calendar, appointment, settings, zipCodes){

    console.log(appointment);

    for(let i = 0; i < calendar.halfDays.length; i++ ){
        calendar.halfDays[i] = await checkHalfDay(calendar.halfDays[i], appointment, calendar.crewName,settings, zipCodes);
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
async function checkHalfDay(halfDay, appointment, crewName, settings, zipCodes){

    // check if the new appointment is not in the service area for the crew
    if( await checkIfAppointmentIsInServiceArea(halfDay, appointment, zipCodes)){
        halfDay.isAvailable = 0;
        return Promise.resolve(halfDay);
    }

    //check if an appointent is too far from an existing appointment on a half day
    if( await checkDistanceBetweenAppointmentsTooFar(halfDay, appointment, crewName, settings) === true){
            halfDay.isAvailable = 0;
            return Promise.resolve(halfDay);
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
 *
 *
 * @param halfDay a single half day from the calendar
 * @param appointment the new appointment that is trying to be scheduled
 * @returns {Promise<boolean>} a boolean value to determine if an appointment is too far
 */
async function checkDistanceBetweenAppointmentsTooFar(halfDay, appointment, crewName, settings){
    let isTooFar = false;

    //this will query the database to get all the appointments on a half day to compare distance to new appointment
    let storedHalfDay = await getStoredHalfDay(halfDay, crewName);
    if(storedHalfDay.appointments[0].length == 0){
        isTooFar = false;
        return Promise.resolve(isTooFar);
    }
    //the appointment that is already scheduled
    let firstApp = storedHalfDay.appointments[0][0];


    //check distance between two appointments
    let distanceBetweenAppointments = await getDrivingDistance(firstApp.address, appointment.address);
        //compare two addresses
    //TODO change to a max drive time to next appointment
    if(distanceBetweenAppointments.duration > parseInt(settings.maxDriveTimeHalfDay)){
        isTooFar = true;
        return Promise.resolve(isTooFar);
    }




    //TODO check if there is enough time left in half day to fit in another appointment
    //TODO ***************************************************************************
    let notEnoughTime = await checkForEnoughTime(halfDay,appointment, storedHalfDay.appointments[0], settings);
    if(notEnoughTime){
        isTooFar = true;
        return Promise.resolve(isTooFar);
    }

    return Promise.resolve(isTooFar);
}

/**
 * this is used to  return all of the appointments that are scheduled for a half day
 * @param halfDay the half day to check
 * @param crewName the crew name which is responsible for the half day
 * @returns {Promise<unknown>} an object that has all of the appointments that occur on the half day
 */
async function getStoredHalfDay(halfDay, crewName){
    const getAppOnHalfDay = 'call rainmanland.get_appointments_on_half_day_from_date_crew_by_which_half(?, ?, ?);';

    let storedHalfDay = {
         appointments :[],
    };


    return new Promise((resolve, reject) => {
        dbController.query(getAppOnHalfDay, [crewName,halfDay.date, halfDay.whichHalf], (err, result) => {
            if (err) {
                reject(err);
            } else {

                result.forEach(function (app){
                   storedHalfDay.appointments.push(app);
                });

                resolve(storedHalfDay);
            }
        });
    });
}

/**
 * this will get all the information needed for addresses to be sorted by drive time
 * @requires sortAddressesByDriveTime
 * @param origin
 * @param destination
 * @returns {Promise<{duration: number, distance: *}|null>}
 */
async function getDrivingDistance(origin, destination) {
    try {
        const response = await googleMapsClient.distanceMatrix({
            origins: [origin],
            destinations: [destination],
            mode: 'driving',
        }).asPromise();

        const result = response.json.rows[0].elements[0];

        if (result.status === 'OK') {
            const distance = result.distance.text;
            const duration = parseInt(result.duration.text);
            let driveData = {
                distance: distance,
                duration: duration,
            };
            return driveData;
        } else {
            console.error('Error calculating distance:', result.status);
            return null;
        }
    } catch (error) {
        console.error('Error in Google Maps API:', error);
        return null;
    }
}

async function checkIfAppointmentIsInServiceArea(halfDay, appointment, zipCodes){
    let notInServiceArea = false;

    if(!zipCodes.includes(appointment.zipCode)){
        notInServiceArea = true;
        return Promise.resolve(notInServiceArea);
    }

    return Promise.resolve(notInServiceArea);
}

/**
 * this function will check if there is enough time left in a half day to schedule another appointment
 * or to not allow another appointment to fit
 *
 * @param halfDay the half day to schedule the new appointment into
 * @param appointment the new appointment to schedule into the half day
 * @param storedHalfDay an array of appointments that are occuring on the given half day currently
 * @returns {Promise<void>} returns true for when an appointment can fit into halfday
 *
 */
async function checkForEnoughTime(halfDay,appointment, storedHalfDay, settings) {
    //TODO check if there is enough time left in half day to fit in another appointment
        // make var for computing the amount of time it takes ie 5 + 3X the amount zones
        // check to see if the var is still less than the end time of the half
        // if not dont let the user schedule ( greyed out )

    let halfDayTimes = {
        totalAppointmentTime: 0,
        totalDriveTime: 0,
        totalTime: 0,
    };

    //TODO add variables in settings for each variable
    //this will loop all the existing appointments in the half day and calculate total time it takes before drive time
    for(let i =0; i < storedHalfDay.length; i++){
        let appointmentTime =  ((settings.minutesPerZone * storedHalfDay[i].zone_amount) + settings.baseTime);
        if(appointmentTime < settings.lowestPossibleTime){
            appointmentTime = settings.lowestPossibleTime;
        }
        halfDayTimes.totalAppointmentTime += appointmentTime;
    }

    let addresses = [];
    for(let i = 0; i < storedHalfDay.length; i++){
        addresses.push(storedHalfDay[i].address);
    }
    addresses.push(appointment.address);


    let newAppTime = ((settings.minutesPerZone * appointment.zone_amount) + settings.baseTime);
    if(newAppTime < settings.lowestPossibleTime){
        newAppTime = settings.lowestPossibleTime;
    }
    //add new appointment time
    halfDayTimes.totalAppointmentTime += newAppTime;

    // let addresses1 = [
    //     '1635 Elmwood Avenue, Cranston, RI 02910',
    //     '2560 East Cherry Street, Philadelphia, PA 19134',
    //     '1124 Main Street, Middletown, CT 06457',
    //     '4170 East Washington Street, East Point, GA 30344',
    //     '2189 North Pine Street, Wilmington, DE 19802'];
    // addresses.push('1124 Main Street, Middletown, CT 06457');
    // addresses.push('5 silver ave, glassboror, NJ 08028');

    //this will sort the addresses by drive time and return the drive time from start to each location
    let sortedAddresses = await sortAddressesByDriveTime(addresses[0], addresses);

    //set the total drive time to what is stored in sortedAddresses
    halfDayTimes.totalDriveTime = Math.trunc(sortedAddresses.driveTimes.pop()/60)+1;

    //store the total amount of time the current halfday takes
    halfDayTimes.totalTime = halfDayTimes.totalAppointmentTime +halfDayTimes.totalDriveTime;

    //halfday (end - start)= total allotted
    // get appointment time for new appointment
    // get drive time to the new appointment
    if( (parseInt(halfDay.endTime) - parseInt(halfDay.startTime))  > parseInt(halfDayTimes.totalTime) ){
        return Promise.resolve(true);
    }
    return Promise.resolve(false);
}

/**
 * this will take an address and an array of addresses and return a sorted list of them
 * @requires getDrivingDistance
 * @param startAddr the starting address
 * @param addresses array of addresses to visit in any order
 * @returns {Promise<{driveTimes: *, sortedAddresses: *}>} returns an array of sorted addresses by drive time
 */
async function sortAddressesByDriveTime(startAddr, addresses){
    const results = await Promise.all(
        addresses.map((addr) =>
            googleMapsClient
                .distanceMatrix({
                    origins: [startAddr],
                    destinations: [addr],
                    mode: 'driving',
                })
                .asPromise()
        )
    );

    const durationMap = new Map();
     await addresses.forEach((address, index) => {
        const durationValue = results[index]?.json?.rows[0]?.elements[0]?.duration?.value;
        if (durationValue !== undefined) {
            durationMap.set(address, durationValue);
        }
    });

    // return addresses.sort((a, b) => durationMap.get(a) - durationMap.get(b));

    const sortedAddresses = await addresses.sort((a, b) => durationMap.get(a) - durationMap.get(b));
    const driveTimes = await sortedAddresses.map((address) => durationMap.get(address));

    return Promise.resolve({ sortedAddresses, driveTimes });
}


module.exports = {checkCalendarAvailability, getDrivingDistance, sortAddressesByDriveTime, googleMapsClient};