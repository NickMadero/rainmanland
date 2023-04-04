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

    //get the inital calendar for the next 30 days
    await generateDates(calendarDates);

    console.log(calendarDates);

    //this will check all of the half days that exist and if the next 30 days are not full of half days it will
    //generate the half days and store them in the database
    calendar = await checkAndGenerateHalfDays(calendar, calendarDates, settings);


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




    for(let i =0; i< calendarDates.length; i++){
        if(calendar.halfDays.prototype.find.call(singleHalfDay, (x) => x.date == calendarDates[i]) != null) {
            console.log(calendar.halfDays.prototype.find.call(singleHalfDay, (x) => x.date == calendarDates[i]));
        }
        else{
            //create half days for each date that they do not exist for yet

        }

    }


    return Promise.resolve(calendar);
}




module.exports = {generateHalfDaysForCrew};