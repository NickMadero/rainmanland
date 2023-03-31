/**
 * Author: Marcus Tangradi
 *
 * This file is responsible for the calander backend.
 * It needs a crew, and the appointment information for the appointment trying to schedule
 *
 *
 */

let appointment = {};



/**
 * this function is to be called first to create the calander
 */
 function initCalander(){

   console.log(appointment);
}

/**
 * this method is used by the node api to get the current appointmnet's variables
 * and sets them for use
 */
 function setAppointment(appointmentID, address, isComplete, zoneAmount,
                               controllerBrand, controllerOutside, zipCode){

   appointment.appointmentID = appointmentID;
    appointment.address = address;
    appointment.isComplete = isComplete;
    appointment.zone_amount = zoneAmount;
    appointment.controllerBrand = controllerBrand;
    appointment.controllerIsOutside = controllerOutside;
    appointment.zipCode = zipCode;
    appointment.test = 'hahah';

}


module.exports ={ setAppointment, initCalander};