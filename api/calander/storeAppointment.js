/**
 * Author: Marcus Tangradi
 *
 * This file is used to store new appointments that are selected from the calendar given an appointment id
 */


const dbController = require("../dbController");

/**
 *
 * @param appointmentId the appointment id of the current appointment that is to be scheduled
 * @param crewName the crew name to place the apponintment on
 * @param halfDay this needs to include the date and which half
 * @returns {Promise<void>}
 */
async function storeAppointmentIntoDatabase(appointmentId, crewName, halfDay, email, firstName, lastName){
    //database call
    const putAppointmentOnHalfday = 'CALL `put_appointment_on_half_day`(?, ?, ?, ?, ?, ?, ?);';

    return new Promise((resolve, reject) => {
        dbController.query(putAppointmentOnHalfday,
            [crewName, halfDay.date, halfDay.whichHalf, email, firstName, lastName, appointmentId], (err, result) => {
            if (err) {
                reject(err);
            } else {

                resolve(result);
            }
        });
    });
}

module.exports = {storeAppointmentIntoDatabase};