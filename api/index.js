// import packages downloaded with npm install <package1> <package2>
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');

const { setAppointment, initCalander } = require("./calander/calender");
const {storeAppointmentIntoDatabase} = require('./calander/storeAppointment');
const {getAppointmentsForHalfDay} = require('./crew/loadCrewAppointments');

const dbController = require('./dbController');

// Set constants
const saltRounds = 10;  // complexity of bcrypt hash

// initialize the Express app
const app = express();

// enable CORS security headers
app.use(cors());

// add an Express method to parse the POST method
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// [TEMPLATE] retrieve something from the database
app.get('/get-something', (req, res) => {
    const SelectQuery = " SELECT * FROM table_name";
    dbController.query(SelectQuery, (err, result) => {
        res.send(result)
    })
})

// [TEMPLATE] insert something into the database
app.post('/insert-something', (req, res) => {
    const someField1 = req.body.setSomeField1;
    const someField2 = req.body.setSomeField2;
    const InsertQuery = "INSERT INTO table_name (field_name1, field_name2) VALUES (?, ?)";
    dbController.query(InsertQuery, [someField1, someField2], (err, result) => {
        console.log(result)
    })
})

// [TEMPLATE] delete something from the database
app.delete("/delete/:someId", (req, res) => {
    const someId = req.params.someId;
    const DeleteQuery = "DELETE FROM table_name WHERE id = ?";
    dbController.query(DeleteQuery, bookId, (err, result) => {
        if (err) console.log(err);
    })
})

// [TEMPLATE] update something in the database
app.put('/update/:someId', (req, res) => {
    const someField = req.body.someFieldUpdate;
    const someId = req.params.someId;
    const UpdateQuery = "UPDATE table_name SET field_name = ? WHERE id = ?";
    dbController.query(UpdateQuery, [someField, someId], (err, result) => {
        if (err) console.log(err)
    })
})

// Temorary test endpoint to check database connection
app.get('/api/get-all-users', (req, res) => {
    const SelectQuery = "SELECT * FROM user";
    dbController.query(SelectQuery, (err, result) => {
        res.send(result)
    })
})

// Check user credentials and return the user's info if credential are valid, else return false
app.post('/api/verify-user', (req, res) => {
    const email = req.body.sentEmail;
    const pass = req.body.sentPw;
    if (!email || !pass) {
        res.json({
			success: false,
			message: "Email and password are required"
		});
        return;
	}
    const getHashQuery = "CALL get_password_hash(?);";
    dbController.query(getHashQuery, [email], (err, result) => {
        console.log(result)
        if (err) {
            console.log("Error while retrieving password hash.");
            res.json({
				success: false,
				message: 'Error while retrieving password hash.'
			});
			return;
        }
        else {
			const password_hash = result[0]?.[0]?.password_hash || false;
			if (!password_hash) {
				res.json({
					success: false,
					message: 'User does not exist.'
				});
				return;
			}
            console.log("User email exists.");
            bcrypt.compare(pass, result[0][0].password_hash, function(err, hashResult) {
                if (hashResult) {
                    console.log("User verified.");
					// now get the relevant user info
					const userInfoQuery = "CALL get_user_info(?);";
					dbController.query(userInfoQuery, [email], (err, result) => {
						console.log(result);
						if (err) {
							res.json({
								success: false,
								message: "Error getting user info"
							});
							return;
						} else {
							var allInfoButCrew = result[0][0];
							const getCrewNameQuery = "SELECT c.crew_name FROM placed_on AS p JOIN crew AS c ON p.crew_id = c.crew_id WHERE p.user_id = ?;";
							dbController.query(getCrewNameQuery, [allInfoButCrew.user_id], (err, resultTwo) => {
								console.log(result);
								if (err) {
									res.json({
										success: false,
										message: "Error while getting user's crew"
									});
									return;
								} else {
									allInfoButCrew.crewName = resultTwo[0].crew_name;
									res.json({
										success: true,
										message: "User info sent.",
										queryResult: allInfoButCrew
									});
									return;
								}
							})
						}
					})
				} else {
                    console.log("Bad password");
                    console.log(err);
                    res.json({
						success: true,
						message: "Password doesn't match.",
						queryResult: false
					});
                }
            })
        }
    })
})

// Add a new employee to the user table
app.post('/api/add-user', (req, res) => {
	// raw info from request
	const email = req.body.addEmail;
	const plaintextPass = req.body.addPassword;
	const firstName = req.body.addFirstName;
	const lastName = req.body.addLastName;
	const phone = req.body.addPhoneNum;
	const crewNum = req.body.addCrewNum;
	const currentlyWorking = req.body.addCurrentlyWorking ? 1 : 0;

	// generate password hash
	const passHash = bcrypt.hash(plaintextPass, saltRounds, (err, hashedPassword) => {
		if (err) {
			console.error('Error hashing password: ', err);
			res.json({
				success: false,
				message: 'Error hashing password.'
			});
			return;
		} else {
			console.log('Hashed password: ', hashedPassword);
			// add to database using stored procedure
			const addCustQuery = "CALL add_new_crew_member(CURDATE(),?,?,?,?,?,?);";
			const params = [firstName, lastName, email, hashedPassword, phone, currentlyWorking];
			dbController.query(addCustQuery, params, (err, result) => {
				if (err) {
					console.log("error while adding crew member: ", err);
					res.json({
						success: false,
						message: 'Error while adding crew member.'
					});
					return;
				} else {
					console.log("successfully added new employee");
				}
				// if a crew number was given while adding the employee, add them to the crew
				if (crewNum) {
					const addToCrewQuery = "CALL put_user_on_crew(?,?);";
					dbController.query(addToCrewQuery, [email, crewNum], (err, result) => {
						if (err) {
							console.log("error while adding new crew member to crew: ", err);
							res.json({
								success: false,
								message: 'Error while adding new crew member to crew.'
							});
						} else {
							console.log("successfully added employee to crew");
							res.json({
								success: true,
								message: 'successfully added employee to crew'
							})
						}
					})
				}
			})
		}
	})
});

// get a list of the available controller brand options author: Nick Madero / Steve Piccolo
app.post('/api/get-controller-brand', (req, res) => {
    const getController = "call get_controller_enum();";
    dbController.query(getController,  (err, result) => {
        // console.log(result);
		// parse the result before sending it to the frontend
		const unparsedString = result[0][0]["column_type"];
		// console.log(`Got unparsed string: ${unparsedString}.`);
		const parsedArray = unparsedString.slice(1, -1).split("','");
		// console.log(`Parsed string into array: ${parsedArray}`);
        res.send(parsedArray);
    })
})

//author : Nick Madero
app.post('/api/insert-newcustomer', (req, res) => {
    const new_appointment = `CALL create_new_appointment_return_app_id(?, ?, ?, ?, ?, ?, ?, ?, ?, @appointment_id_out);`;
    const app_id = `SELECT @appointment_id_out AS appointment_id;`;
    dbController.query(new_appointment, [req.body.email, req.body.first_name, req.body.last_name, req.body.address,
        req.body.numZones,req.body.brand, req.body.outside,req.body.zip_code , req.body.phone_number],  (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            //this is used to send the current appointment to the calander to generate
            let appointment_id;
            dbController.query(app_id, async (error, resultt) => {
                appointment_id = resultt[0].appointment_id;
                // console.log(resultt);
                // setAppointment(appointment_id, req.body.address, 0, req.body.numZones, req.body.brand,
                //     req.body.outside, req.body.zip_code);
                //this will start the process of generating a calander
                let calendar = await initCalander(appointment_id, req.body.address, 0, req.body.numZones, req.body.brand,
                    req.body.outside, req.body.zip_code);

                const responseObj = {
                    appointment_id: appointment_id,
                    result: result,
                    calendar: calendar
                };
                res.send(responseObj);
            });
        }
    })
})

// Get a list of today's appointments for a specific crew
app.post('/api/get-joblist', (req, res) => {

	console.log(`Body of request to /get-joblist : ${req.body}`);

	const getTodayDate = () => {
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const day = String(today.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	// send failure response if bad request
	if (!req.body.crewName) {
		res.json({
			success: false,
			message: "Bad request: no crew number included."
		});
		return;
	}

	// if request was good, make the db query	
	const getJobListQuery = "CALL get_appointments_on_half_day_from_date_crew(?, CURDATE());";
	const params = [req.body.crewName];
	dbController.query(getJobListQuery, params, (err, result) => {
		if (err) {
			console.log("Error while fetching appointments: ", err);
			res.json({
				success: false,
				message: "Error while fetching appointments"
			});
			return;
		} else {
			console.log("successfully fetched appointments: ", result);
			res.json({
				success: true,
				message: "Successfully fetched appointments",
				queryResult: result
			});
		}
	})
});

app.post('/api/show-maxHalf', (req,res) => {
    const show_maxHalf = "call get_all_zip_codes();";
    dbController.query(show_maxHalf,(err,result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            const maxhalfs = result[0].map(maxhalf => ({
                zipcode : maxhalf.zip_code,
                maxhalfdays : maxhalf.max_half_days
            }));
            res.send(maxhalfs);
        }
    })
})

app.post('/api/update-maxHalf', (req,res) => {
    const updateMax = " call set_max_half_days_zip_code(?,?);";
    dbController.query(updateMax,[req.body.max_half_days,req.body.zip_code],(err,result) =>{
        if (err){
            console.log(err);
        }   else {
            console.log(result);

        }
    })
})

//author : Nick
app.post('/api/show-appointments', (req, res) => {
    const show_appointments = "call get_all_appointments_on_date(?);";
    dbController.query(show_appointments, [req.body.date], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(result);
            const appointments = result[0].map(appointment => ({

                address: appointment.address,
                date: new Date(appointment.date_occuring).toLocaleDateString(),
                finished: appointment.is_complete,
                numZones: appointment.zone_amount,
                controller_Brands: appointment.controller_brand,
                outside: appointment.controller_is_outside,
                firstName: appointment.first_name,
                lastName: appointment.last_name,
                email: appointment.email,
                zipcode: appointment.zip_code,
                phone : appointment.phone_number,
            }));
            res.send(appointments);
        }
    })
});

// Add a crew member
app.post('/api/add-crewmember' , (req,res) => {
    const add_member = "call put_user_on_crew(?,?);";
    dbController.query(add_member,[req.body.email,req.body.crew_name],(err,result) =>{
        if (err){
            console.log(err)
        }else{
            console.log("successfully added a crew member")
        }
    })
})

// Remove a crew member
app.post('/api/remove-crewmember', (req,res) => {
    const remove_member = "call remove_user_from_crew(?,?);";
    if (!req.body.crew_name) {
        res.status(400).send("Missing crew name parameter");
    } else {
        dbController.query(remove_member,[req.body.email,req.body.crew_name],(err,result) =>{
            if (err){
                console.log(err);
                res.status(500).send("Error removing crew member");
            }else {
                res.status(200).send("Crew member removed successfully");
            }
        })
    }
})

// author Nick
app.post('/api/add-zip-to-crew', (req,res) =>{
    const add_zip_to_crew = "call add_zip_to_crew(?,?);";
    dbController.query(add_zip_to_crew,[req.body.crew_name,req.body.zip_code],(err,result) =>{
        if (err){
            console.log(err)
        }else {
            console.log("added zip code succesfully")
        }
    })
})

// author Nick
app.post('/api/remove-zip-from-crew', (req,res) =>{
    const remove_zip_to_crew = "call remove_zip_from_crew(?,?);";
    dbController.query(remove_zip_to_crew,[req.body.zip_code,req.body.crew_name],(err,result) =>{
        if (err){
            console.log(err)
        }else {
            console.log("remove zip code succesfully")
        }
    })
})

// author Nick
app.post('/api/get-zip-by-crew', (req,res) =>{
    const add_zip_to_crew = "call get_all_zip_codes_serviced_by_crew(?);";
    dbController.query(add_zip_to_crew,[req.body.crew_name],(err,result) =>{
        if (err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log(result);
            const zipData = {};
            result[0].forEach(zip => {
                const Zip = zip.zip_code;
                const zipInfo = {
                    zipcode: zip.zip_code
                };
                if (!zipData[Zip]) {
                    zipData[Zip] = { zip: [Zip] };
                } else {
                    zipData[Zip].zip.push(zipInfo);
                }
            });
            const zips = Object.values(zipData);
            res.send(zips);
        }
    });
});

// author Nick
app.post('/api/get-crew', (req, res) => {
    const getCrew = "call get_all_crews_and_members();";
    //const crewName = req.body.name;
    dbController.query(getCrew, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving crew data');
        } else {
            console.log(result);
            const crewData = {};
            result[0].forEach((crew) => {
                const crewName = crew.crew_name;
                const email = crew.email;
                if (email) {
                    const crewMember = {
                        first_name: crew.first_name,
                        last_name: crew.last_name,
                        emailaddress: email,
                        crewName: crewName,
                    };
                    if (!crewData[crewName]) {
                        crewData[crewName] = {
                            name: crewName,
                            members: [],
                        };
                    }
                    crewData[crewName].members.push(crewMember);
                } else {
                    if (!crewData[crewName]) {
                        crewData[crewName] = {
                            name: crewName,
                            members: [],
                        };
                    }
                }
            });

            console.log(crewData)
            const crews = Object.values(crewData);
            res.send(crews);
        }
    });
});

// author Nick
app.post('/api/add-new-crew', (req,res) =>{
    const addNewCrew = "call add_new_crew(?,?);";
    dbController.query(addNewCrew,[req.body.crew_name, req.body.starting_location],(err,result) =>{
        if (err){
            console.log(err)
        }else {
            console.log("added new crew ")
        }
    })
})

// Get settings
app.post('/api/get-settings', (req, res) => {
    const getSettings = "call get_settings();";
    dbController.query(getSettings, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            const appointments = result[0].map(appointment => ({
                name: appointment.setting_name,
                value: appointment.setting_value,
                //id: appointment.setting_id,
            }));
            console.log(appointments);
            res.send(appointments);
        }
    })
})

// Change a setting
app.post('/api/put-setting', (req, res) => {
    const putSetting = "call put_setting(?, ?);";

    dbController.query(putSetting, [req.body.setting_name,req.body.setting_value], (err, result) => {
        if (err){
            console.log(err);
            res.status(500).send("Error changing setting");
        }else {
            res.status(200).send("Setting changed successfully");
        }
    })
})

/**
 * @param req require that req has appointmentId, crewName, halfDay, email, firstName, lastName
 *  stored as those names
 */
app.post('/api/put-new-appointment', async (req, res) => {

    const { appointmentId, crewName, halfDay, email, firstName, lastName } = req.body;

    try {
        const result = await storeAppointmentIntoDatabase(appointmentId, crewName, halfDay, email, firstName, lastName);
        res.status(200).json({ success: true, message: 'Appointment stored successfully', data: result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error storing appointment' });
    }
})

/**
 * this is used to get the appointments that occur on a given halfday
 * @param date "YYYY-MM-DD" the date for which the appointment is to occur
 * @param whichHalf (first, second) which half of a date is it
 * @param crewName the name of the crew you wish to get
 */
app.post('/api/get-crew-jobs-on-date'), async (req, res) =>{
    try {
        const { date, whichHalf, crewName } = req.body;

        if (!date || !whichHalf || !crewName) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const sortedAppointments = await getAppointmentsForHalfDay(date, whichHalf, crewName);
        res.json(sortedAppointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

/**
 * this is used to get the appointments that occur on a given halfday
 * @param date "YYYY-MM-DD" the date for which the appointment is to occur
 * @param whichHalf (first, second) which half of a date is it
 * @param crewName the name of the crew you wish to get
 */
app.post('/api/get-crew-jobs-on-date', async (req, res) => {
    try {
        const { date, whichHalf, crewName } = req.body;

        if (!date || !whichHalf || !crewName) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const sortedAppointments = await getAppointmentsForHalfDay(date, whichHalf, crewName);
        res.json(sortedAppointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// this end point is to remove a crew
app.post('/api/remove-crew', (req,res) => {

    const removeCrew = " call remove_crew(?);";
    dbController.query(removeCrew, req.body.crew_name, (err, result) => {
        if (err){
            console.log(err);
        }else {
            console.log(result)
            res.status(200).send("removed crew");
        }
    })
})

// add a port to expose the API when the server is running
app.listen('3001', () => { })

