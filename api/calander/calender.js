const { generateHalfDaysForCrew } = require('./generateHalfDay');
const { checkHalfDayAvailable } = require('./halfDayAvailability');
const dbController = require('../dbController');



async function initCalander(appointmentID, address, isComplete, zoneAmount,
                            controllerBrand, controllerOutside, zipCode) {
    //this keep all of the appointment information
    let appointment = {};
    //this stores the crew name
    let crew = {};
    // this is all the available zip codes
    let zip = [];
    // this is for the generating half days for start and stop times
    let settings = {};

    // this calendar object is has all the information that it needs to display a calendar for a specific appointment
    let calendar = {};



    await setAppointment(appointment, appointmentID, address, isComplete, zoneAmount, controllerBrand, controllerOutside, zipCode);
    crew = await setCurrentCrewInit();
    zip = await getZipCodes(crew.crewName);
    settings = await getSettings();



    //this will store all the exsiting half-days into the object
    calendar = await getInitalHalfDays(crew);





    //TODO check if half days have been generated yet or not
    await generateHalfDaysForCrew(crew.crewName, zip, settings, calendar);

    //TODO get all halfdays for calender as an array? and iterate through them all checking
    //     if they are available or not using the checkHalfDayAvailable function
}

function setAppointment(appointment, appointmentID, address, isComplete, zoneAmount,
                        controllerBrand, controllerOutside, zipCode) {

    appointment.appointmentID = appointmentID;
    appointment.address = address;
    appointment.isComplete = isComplete;
    appointment.zone_amount = zoneAmount;
    appointment.controllerBrand = controllerBrand;
    appointment.controllerIsOutside = controllerOutside;
    appointment.zipCode = zipCode;

    // resolve(appointment);
}

function setCurrentCrewInit() {
    const getCrew = 'CALL get_crew_names_ordered();'

    return new Promise((resolve, reject) => {
        dbController.query(getCrew, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve({ crewName: result[0][0].crew_name });
            }
        });
    });
}

function getZipCodes(crewName) {
    const getZipCodes = 'call rainmanland.get_all_zip_codes_serviced_by_crew(?);'

    return new Promise((resolve, reject) => {
        dbController.query(getZipCodes, [crewName], (err, result) => {
            if (err) {
                reject(err);
            } else {
                const zipCodes = result[0].map(zipCodeReturn => zipCodeReturn.zip_code);
                resolve(zipCodes);
            }
        });
    });
}

function getSettings() {
    const getSettings = 'call rainmanland.get_settings();'

    return new Promise((resolve, reject) => {
        dbController.query(getSettings, (err, result) => {
            if (err) {
                reject(err);
            } else {
                let temp = {};

                result[0].forEach(function (setting) {
                    temp[setting.setting_name] = setting.setting_value;
                });

                const settings = {
                    start_time_first_half: temp['start_time_first_half'],
                    end_time_first_half: temp['end_time_first_half'],
                    start_time_second_half: temp['start_time_second_half'],
                    end_time_second_half: temp['end_time_second_half']
                };

                resolve(settings);
            }
        });
    });
}

/**
* this is used to get all the half days for a crew for 3 months
 */
function getInitalHalfDays(crew){


    let calendar = {
      crewName: crew.crewName,
      // crewStartingLocation: null,

        halfDays: [
        //     singleHalfDay = {
        //         whichHalf: null,
        //         startTime: null,
        //         endTime: null,
        //         isAvailable: null,
        //         isFull: null,
        //         date: null,
        //     },
        ],



    };

    const getHalfDays = 'CALL `rainmanland`.`get_all_half_days_by_crew`(?);';

    return new Promise((resolve, reject) => {
        dbController.query(getHalfDays, [crew.crewName], (err, result) => {
            if (err) {
                reject(err);
            } else {
                // calendar.crewStartingLocation = result[0].starting_location;

               result[0].forEach(function (halfDay) {
                   calendar.crewStartingLocation = halfDay.starting_location;
                    let singleHalfDay = {
                        whichHalf: halfDay.which_half,
                        startTime: halfDay.start_time,
                        endTime: halfDay.end_time,
                        isAvailable: halfDay.is_available,
                        isFull: halfDay.is_full,
                        date: halfDay.date,

                    };

                   calendar.halfDays.push(singleHalfDay);
                });




                resolve(calendar);
            }
        });
    });

}

module.exports = { initCalander };
