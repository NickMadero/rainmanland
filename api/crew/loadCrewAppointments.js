/**
 * Author: Marcus Tangradi
 *
 * This file is used to load the appointments for a specific crew on a date
 * and to sort by the fastest drive time
 */

//these imports are used to sort the appointments on a half day
const {getDrivingDistance, googleMapsClient} = require('../calander/halfDayAvailability');
const dbController = require("../dbController");


/**
 * this function will return the sorted appointments in a given half day for a crew on a date
 * @param date
 * @param whichHalf
 * @param crewName
 * @returns {Promise<void>} an array of sorted appointments that the crew follows
 */
async function getAppointmentsForHalfDay(date, whichHalf, crewName){

    //array of appointments occuring on the given half day
    let appointments = await getStoredHalfDay(date, whichHalf, crewName);

    let crewStartingLoc = await getCrewStartingLocation(crewName);

    let sortedAddresses = await sortAppointmentsByDriveTime(crewStartingLoc, appointments.appointments[0]);

    return Promise.resolve(sortedAddresses);

}

/**
 * this will return an array of appointments occuring on a given half day
 * @param date the date of the half day
 * @param whichHalf which half either first or second
 * @param crewName the crew name that is responsible for the appointments
 * @returns {Promise<unknown>} an array of appointments on the half day
 */
async function getStoredHalfDay(date, whichHalf, crewName){
    const getAppOnHalfDay = 'call get_appointments_on_half_day_from_date_crew_by_which_half(?, ?, ?);';

    let storedHalfDay = {
        appointments :[],
    };


    return new Promise((resolve, reject) => {
        dbController.query(getAppOnHalfDay, [crewName,date, whichHalf], (err, result) => {
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
 * this will take appointments With Addresses and an array of addresses and return a sorted list of them
 * @requires getDrivingDistance
 * @param startAddr the starting location
 * @param appointments array of addresses to visit in any order
 * @returns {Promise<{driveTimes: *, sortedAddresses: *}>} returns an array of sorted addresses by drive time
 */
async function sortAppointmentsByDriveTime(startAddr, appointments) {
    const remainingAppointments = [...appointments];
    const sortedAppointments = [];
    let currentAddress = startAddr;

    while (remainingAppointments.length > 0) {
        const driveTimeResults = await Promise.all(
            remainingAppointments.map((appointment) =>
                googleMapsClient
                    .distanceMatrix({
                        origins: [currentAddress],
                        destinations: [appointment.address],
                        mode: 'driving',
                    })
                    .asPromise()
            )
        );

        const durationMap = new Map();
        remainingAppointments.forEach((appointment, index) => {
            const durationValue = driveTimeResults[index]?.json?.rows[0]?.elements[0]?.duration?.value;
            if (durationValue !== undefined) {
                durationMap.set(appointment, durationValue);
            }
        });

        const nearestAppointment = remainingAppointments.reduce((a, b) =>
            durationMap.get(a) < durationMap.get(b) ? a : b
        );

        sortedAppointments.push(nearestAppointment);
        remainingAppointments.splice(remainingAppointments.indexOf(nearestAppointment), 1);
        currentAddress = nearestAppointment.address;
    }

    const driveTimes = [];
    for (let i = 0; i < sortedAppointments.length - 1; i++) {
        const origin = sortedAppointments[i].address;
        const destination = sortedAppointments[i + 1].address;
        const result = await googleMapsClient
            .distanceMatrix({
                origins: [origin],
                destinations: [destination],
                mode: 'driving',
            })
            .asPromise();
        const durationValue = result?.json?.rows[0]?.elements[0]?.duration?.value;
        if (durationValue !== undefined) {
            driveTimes.push(durationValue);
        } else {
            driveTimes.push(null);
        }
    }

    return Promise.resolve({ sortedAppointments, driveTimes });
}


async function getCrewStartingLocation( crewName){
    const getCrewStartingLocation = 'call get_crew_starting_location(?);';




    return new Promise((resolve, reject) => {
        dbController.query(getCrewStartingLocation, [crewName], (err, result) => {
            if (err) {
                reject(err);
            } else {



                resolve(result[0][0].starting_location);
            }
        });
    });
}

module.exports = {getAppointmentsForHalfDay};