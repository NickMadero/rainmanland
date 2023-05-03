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

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const googleMapsClient = require('@google/maps').createClient({
    key: GOOGLE_MAPS_API_KEY,
    Promise: Promise
});


async function checkCalendarAvailability(calendar, appointment, settings, zipCodes, zipCodeObject){

    // console.log(appointment);
    calendar.currentHalfDaysForZip = 0;
    zipCodeObject.datesForZip = [];

    for(let i = 0; i < calendar.halfDays.length; i++ ){
        calendar.halfDays[i] = await checkHalfDay(calendar.halfDays[i], appointment, calendar.crewName,settings, zipCodes, zipCodeObject, calendar);
        // console.log(calendar.halfDays[i]);
    }

    if(parseInt(calendar.currentHalfDaysForZip) >= parseInt(calendar.maxHalfDaysForZip))
    for(let i = 0; i < calendar.halfDays.length; i++ ){
        // calendar.halfDays[i] = await checkHalfDay(calendar.halfDays[i], appointment, calendar.crewName,settings, zipCodes, zipCodeObject, calendar);
        // console.log(calendar.halfDays[i]);




        let tempDate = calendar.halfDays[i].date;
        let tempHalf = calendar.halfDays[i].whichHalf;

        if(!zipCodeObject.datesForZip.some(da => da.date === tempDate && da.whichHalf === tempHalf)){
            calendar.halfDays[i].isAvailable = 0;
        }
        else if(zipCodeObject.datesForZip.some(da => da.date === tempDate && da.whichHalf === tempHalf)){
            // calendar.halfDays[i].isAvailable = 1;
        }
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
async function checkHalfDay(halfDay, appointment, crewName, settings, zipCodes, zipCodeObject, calendar){

    //TODO add a check to see the max number of half days a zip code can have

    // check if the new appointment is not in the service area for the crew
    if( await checkIfAppointmentIsInServiceArea(halfDay, appointment, zipCodes, zipCodeObject, calendar)){
        halfDay.isAvailable = 0;
        return Promise.resolve(halfDay);
    }

    //TODO compare distance of nearest appointment
    //check if an appointent is too far from an existing appointment on a half day
    if( await checkDistanceBetweenAppointmentsTooFar(halfDay, appointment, crewName, settings, zipCodeObject, calendar) === true){
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
async function checkDistanceBetweenAppointmentsTooFar(halfDay, appointment, crewName, settings, zipCodeObject, calendar) {
    let isTooFar = false;

    //this will query the database to get all the appointments on a half day to compare distance to new appointment
    let storedHalfDay = await getStoredHalfDay(halfDay, crewName);
    if (storedHalfDay.appointments[0].length == 0) {
        isTooFar = false;
        return Promise.resolve(isTooFar);
    }

    for(let i = 0; i < storedHalfDay.appointments[0].length; i++) {
        // let tempApp = storedHalfDay.appointments[0][i];
        let tempApp = await getZipCode(storedHalfDay.appointments[0][i].address, GOOGLE_MAPS_API_KEY);
        if (tempApp === appointment.zipCode){
            calendar.currentHalfDaysForZip += 1;

            zipCodeObject.datesForZip.push(halfDay);


            break;
        }
    }

    // if(calendar.currentHalfDaysForZip > calendar.maxHalfDaysForZip){
    //     isTooFar = true;
    //     return Promise.resolve(isTooFar);
    // }

    let sortestDistanceBetweenAppoi = await getDrivingDistance(storedHalfDay.appointments[0][0].address, appointment.address);

    //loop though all of the appointments and find the shortest drive time
    for (let i = 0; i < storedHalfDay.appointments[0].length; i++) {

    //the appointment that is already scheduled
    let firstApp = storedHalfDay.appointments[0][i];


    //check distance between two appointments
    let distanceBetweenAppointments = await getDrivingDistance(firstApp.address, appointment.address);

    if (distanceBetweenAppointments.duration < sortestDistanceBetweenAppoi.duration){
        sortestDistanceBetweenAppoi = distanceBetweenAppointments;
        }
    }
        //compare two addresses
    //TODO change to a max drive time to next appointment
    if(sortestDistanceBetweenAppoi.duration > parseInt(settings.maxDriveTimeHalfDay)){
        isTooFar = true;
         return Promise.resolve(isTooFar);
    }




    // check if there is enough time left in half day to fit in another appointment
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
    const getAppOnHalfDay = 'call get_appointments_on_half_day_from_date_crew_by_which_half(?, ?, ?);';

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

async function checkIfAppointmentIsInServiceArea(halfDay, appointment, zipCodes, zipCodeObject, calendar){
    let notInServiceArea = false;

    if(!zipCodes.includes(appointment.zipCode)){
        notInServiceArea = true;
        return Promise.resolve(notInServiceArea);
    }

    let temp = zipCodeObject.find(item => item.zip_code === appointment.zipCode);
    calendar.maxHalfDaysForZip = temp.max_half_days;
    // calendar.currentHalfDaysForZip = calendar.currentHalfDaysForZip+1;

    // if(calendar.currentHalfDaysForZip > calendar.maxHalfDaysForZip){
    //     notInServiceArea = true;
    //     return Promise.resolve(notInServiceArea);
    // }

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
    // check if there is enough time left in half day to fit in another appointment
        // make var for computing the amount of time it takes ie 5 + 3X the amount zones
        // check to see if the var is still less than the end time of the half
        // if not dont let the user schedule ( greyed out )

    let currentMultiplier = 1;
    switch (appointment.brand) {
        case 'brandTimeFactorHunter': currentMultiplier = parseInt(settings.brandTimeFactorHunter);
            break;
        case 'BrandTimeFactorRainbird': currentMultiplier = parseInt(settings.BrandTimeFactorRainbird);
            break;
        case 'BrandTimeFactorIrritol': currentMultiplier = parseInt(settings.BrandTimeFactorIrritol);
            break;
        case 'BrandTimeFactorRachio': currentMultiplier = parseInt(settings.BrandTimeFactorRachio);
            break;
        case 'BrandTimeFactorWeathermatic': currentMultiplier = parseInt(settings.BrandTimeFactorWeathermatic);
            break;
        case 'BrandTimeFactorOrbit': currentMultiplier = parseInt(settings.BrandTimeFactorOrbit);
            break;
        case 'BrandTimeFactorOther': currentMultiplier = parseInt(settings.BrandTimeFactorOther);
            break;
    }



    let halfDayTimes = {
        totalAppointmentTime: 0,
        totalDriveTime: 0,
        totalTime: 0,
    };

    // add variables in settings for each variable
    //this will loop all the existing appointments in the half day and calculate total time it takes before drive time
    for(let i =0; i < storedHalfDay.length; i++){
        let appointmentTime =  ((settings.minutesPerZone * storedHalfDay[i].zone_amount) + settings.baseTime) * currentMultiplier;
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


    let newAppTime = ((settings.minutesPerZone * appointment.zone_amount) + settings.baseTime) * currentMultiplier;
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
    while(sortedAddresses.driveTimes.length > 0 ){
        halfDayTimes.totalDriveTime += Math.trunc(sortedAddresses.driveTimes.pop()/60)+1;
    }



    //store the total amount of time the current halfday takes
    halfDayTimes.totalTime = halfDayTimes.totalAppointmentTime +halfDayTimes.totalDriveTime;

    //halfday (end - start)= total allotted
    // get appointment time for new appointment
    // get drive time to the new appointment
    let totalHalfDayTime = (parseInt(halfDay.endTime) - parseInt(halfDay.startTime))*60;
    if(  totalHalfDayTime < parseInt(halfDayTimes.totalTime) ){
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

async function getZipCode(address, GOOGLE_MAPS_API_KEY) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`);
    const data = await response.json();
    const result = data.results[0];
    return result && result.address_components.find(c => c.types.includes('postal_code')).short_name;
}

module.exports = {checkCalendarAvailability, getDrivingDistance, sortAddressesByDriveTime, googleMapsClient};
