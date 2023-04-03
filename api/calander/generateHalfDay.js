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
function generateHalfDaysForCrew(crew, zipCodes, settings){

    console.log(zipCodes);
    console.log(crew);
    console.log(settings);


    //TODO generate halfdays and store in database in this file


}




module.exports = {generateHalfDaysForCrew};