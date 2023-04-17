/**
 * Author: Marcus Tangradi
 *
 * This file willl generate a half day.
 * This is to be used once when adding new half days and should not be used to re-generate
 *  half days that already exist
 *
 *  Takes a crew, zip code, time slots, first/second half, if its available (used for weekends)
 *  and stores the generated half days in the database
 *
 *
 */

/**
 * this function will
 */

const dbController = require('../dbController');

const numDays = 30;




async function generateHalfDaysForCrew(crew, zipCodes, settings, calendar) {

    // console.log(zipCodes);
    // console.log(crew);
    // console.log(settings);


    let calendarDates = [];

    //get the inital calendar for the next 30 days
    await generateDates(calendarDates);

    // console.log(calendarDates);

    //this will check all of the half days that exist and if the next 30 days are not full of half days it will
    //generate the half days and store them in the database
    calendar = await checkAndGenerateHalfDays(calendar, calendarDates, settings);


    return Promise.resolve(calendar);

    //TODO generate halfdays and store in database in this file
    // show 30 days ALWAYS

}

/**
 * generate array of dates for the next 30 days
 *
 */
function generateDates(dates) {
    const today = new Date(); // get current date

    for (let i = 0; i <= numDays; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);
        // const dateString = nextDay.toLocaleDateString("en-US", {
        //     year: "numeric",
        //     month: "2-digit",
        //     day: "2-digit",
        // });
        const getYear = nextDay.toLocaleString("default", { year: "numeric" });
        const getMonth = nextDay.toLocaleString("default", { month: "2-digit" });
        const getDay = nextDay.toLocaleString("default", { day: "2-digit" });
        const dateString =  getYear + "-" + getMonth + "-" + getDay ;



        dates.push(dateString);
    }

    return Promise.resolve();
}




/**
 * this will use the existing half days and create new ones if there doesnt exist half days for the next 30 days
 *
 * @param calendar the calendar with the loaded half days that exist
 * @param calendarDates the dates of the next 30 days for checking against existing half days
 * @param settings to get the start and stop times of half days to set
 */
async function checkAndGenerateHalfDays(calendar, calendarDates, settings) {
console.log(calendar)


// check if half DAY exist that equals that day. if they exist continues if not create two half days
    for (let i = 0; i < calendarDates.length; i++) {
        const date = calendarDates[i];
        const halfDayExists =  calendar.halfDays.find(singleHalfDay => singleHalfDay.date === date)


        if (halfDayExists) {
            // console.log('Half day already exists for', date);
            let firstHalf = calendar.halfDays.find(singleHalfDay => singleHalfDay.date === date && singleHalfDay.whichHalf === "first");
            let secondHalf = calendar.halfDays.find(singleHalfDay => singleHalfDay.date === date && singleHalfDay.whichHalf === "second");
            // console.log(firstHalf);
            // console.log(secondHalf);

        } else {
            // console.log('Creating two half days for', date);
            // TODO: create two half days for this date
            let firstHalfDay = {
                whichHalf: "first",
                startTime: settings.start_time_first_half,
                endTime: settings.end_time_first_half,
                isAvailable: 1,
                isFull: 0,
                date: date

            };
            let secondHalfDay = {
                whichHalf: "second",
                startTime: settings.start_time_second_half,
                endTime: settings.end_time_second_half,
                isAvailable: 1,
                isFull: 0,
                date: date

            };

            //store the new half days in the calendar object
            calendar.halfDays.push(firstHalfDay);
            calendar.halfDays.push(secondHalfDay);

            await storeHalfDaysIntDatabase(firstHalfDay, secondHalfDay, calendar.crewName);
        }
    }



    return Promise.resolve(calendar);
}

/**
 * this is used to store the newly created half days into the database
 * @param firstHalfDay
 * @param secondHalfDay
 * @param crewName
 * @returns {Promise<void>}
 */
async function storeHalfDaysIntDatabase(firstHalfDay, secondHalfDay, crewName) {
    const addFirstHalf =  'CALL `add_new_half_day_for_crew`' +
        '(\'' + crewName + '\', \'' + firstHalfDay.date + '\', \'' + firstHalfDay.whichHalf + '\', \'' +
        firstHalfDay.startTime + '\', \'' + firstHalfDay.endTime + '\');';
    const addSecondHalf =  'CALL `add_new_half_day_for_crew`' +
        '(\'' + crewName + '\', \'' + secondHalfDay.date + '\', \'' + secondHalfDay.whichHalf + '\', \'' +
        secondHalfDay.startTime + '\', \'' + secondHalfDay.endTime + '\');';


    // console.log(addFirstHalf);
    // console.log(addSecondHalf);


    return new Promise((resolve, reject) => {
        dbController.query(addFirstHalf,  (err, result) => {
            if (err) {
                reject(err);
            } else {
                // console.log(result);
            }
        });
        dbController.query(addSecondHalf,  (err, result) => {
            if (err) {
                reject(err);
            } else {
                // console.log(result);
            }
        });
        resolve();
    });
}


module.exports = {generateHalfDaysForCrew};