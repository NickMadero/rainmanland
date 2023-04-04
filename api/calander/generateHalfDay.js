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
const numDays = 30;


async function generateHalfDaysForCrew(crew, zipCodes, settings, calendar) {

    console.log(zipCodes);
    console.log(crew);
    console.log(settings);


    let calendarDates = [];

    await generateDates(calendarDates);

    console.log(calendarDates);

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







module.exports = {generateHalfDaysForCrew};