/**
 * Author: Marcus Tangradi
 *
 * This file is responsible for the calander backend.
 * It needs a crew, and the appointment information for the appointment trying to schedule
 *
 *
 */

const {} = require('./generateHalfDay');
const { checkHalfDayAvailable } = require('./halfDayAvailability');
const dbController = require('../dbController');


let appointment = {};
let crew = {};




/**
 * this function is to be called first to create the calander
 */
 function initCalander(){


    setCurrentCrewInit((crew) => {
        //run everything else in here so crew name is set

        console.log(appointment, crew);






    });


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


}

  function setCurrentCrewInit(callback) {
    const getCrew = 'CALL get_crew_names_ordered();'

    dbController.query(getCrew, (err,result) => {
     if (err) {
      // console.log(err);
     }else {
      // console.log(result);
      crew.crewName = result[0][0].crew_name;
      callback(crew);
     }
    })

  }

module.exports ={ setAppointment, initCalander};