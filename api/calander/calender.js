const { generateHalfDaysForCrew } = require('./generateHalfDay');
const { checkHalfDayAvailable } = require('./halfDayAvailability');
const dbController = require('../dbController');

let appointment = {};
let crew = {};
let zip = [];
let settings = {};

async function initCalander() {
    crew = await setCurrentCrewInit();
    zip = await getZipCodes(crew.crewName);
    settings = await getSettings();

    //TODO check if half days have been generated yet or not
    await generateHalfDaysForCrew(crew.crewName, zip, settings);

    //TODO get all halfdays for calender as an array? and iterate through them all checking
    //     if they are available or not using the checkHalfDayAvailable function
}

function setAppointment(appointmentID, address, isComplete, zoneAmount,
                        controllerBrand, controllerOutside, zipCode) {

    appointment.appointmentID = appointmentID;
    appointment.address = address;
    appointment.isComplete = isComplete;
    appointment.zone_amount = zoneAmount;
    appointment.controllerBrand = controllerBrand;
    appointment.controllerIsOutside = controllerOutside;
    appointment.zipCode = zipCode;
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

module.exports = { setAppointment, initCalander };
