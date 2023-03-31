/**
 * Author: Marcus Tangradi
 *
 * This file is responsible for the calander backend.
 * It needs a crew, and the appointment information for the appointment trying to schedule
 *
 *
 */

const { generateHalfDaysForCrew} = require('./generateHalfDay');
const { checkHalfDayAvailable } = require('./halfDayAvailability');
const dbController = require('../dbController');


let appointment = {};
let crew = {};
let zip = [];
let settings = {};




/**
 * this function is to be called first to create the calander
 */
 function initCalander(){


    setCurrentCrewInit((crew) => {
        //run everything else in here so crew name is set
        //gets all of the zip codes
        getZipCodes((zip) =>{
            getSettings((settings) =>{
                // console.log(zip);
                // console.log(crew);
                // console.log(settings);

                //TODO check if half days have been generated yet or not
                generateHalfDaysForCrew(crew.crewName, zip, settings, (generate) =>{


                //TODO get all halfdays for calender as an array? and iterate through them all checking
                //     if they are available or not using the checkHalfDayAvailable function

                });
            })
        })
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
function getZipCodes(callback) {
    const getZipCodes = 'call rainmanland.get_all_zip_codes_serviced_by_crew(?);'



    dbController.query(getZipCodes, [crew.crewName], (err,result) => {
        if (err) {
            // console.log(err);
        }else {
            // console.log(result);
            result[0].forEach(function(zipCodeReturn){
                zip.push(zipCodeReturn.zip_code);
            })
            callback(zip);
        }
    })

}
function getSettings(callback) {
    const getSettings = 'call rainmanland.get_settings();'



    dbController.query(getSettings, (err,result) => {
        if (err) {
            // console.log(err);
        }else {
            // console.log(result);

            let temp = {};

             result[0].forEach(function (setting) {
                 temp[setting.setting_name] = setting.setting_value;
             })

            //get all of the settings that we need
            settings.start_time_first_half = temp['start_time_first_half'];
            settings.end_time_first_half = temp['end_time_first_half'];
            settings.start_time_second_half = temp['start_time_second_half'];
            settings.end_time_second_half = temp['end_time_second_half'];

            callback(settings);
        }
    })
}

module.exports ={ setAppointment, initCalander};