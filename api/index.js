// import packages downloaded with npm install <package1> <package2>
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const dbController = require('./dbController');

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
        res.status(400).send("Email and password are required");
        return;
    const verifyQuery = "SELECT * FROM user INNER JOIN placed_on ON placed_on.user_id = user.user_id WHERE email = ?";
    dbController.query(verifyQuery, [email], (err, result) => {
        console.log(result)
        if (result.length !== 1) {
            console.log("Verification failed.");
            res.send(false);
        }
        else {
            console.log("User email exists.");
            bcrypt.compare(pass, result[0]["password_hash"], function(err, hashResult) {
                if (hashResult) {
                    console.log("User verified.");
                    res.send(result[0]);
                }
                else {
                    console.log("Bad password");
                    console.log(err);
                    res.send(false);
                }
            })
        }
    })
}})

// get a list of today's jobs for the crew number passed as URL param
app.get('/api/get-jobs/:crewNum', (req, res) => {
    const crewNum = req.params.crewNum
    // TODO: make this query actually do its job - this is just for the demo again
    const GetJobsQuery = "SELECT * FROM appointments";
    dbController.query(GetJobsQuery, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    })
})

// get a list of the available controller brand options author: Nick Madero / Steve Piccolo
app.post('/api/get-controller-brand', (req, res) => {
    const getController = "call get_controller_enum();";
    dbController.query(getController,  (err, result) => {
        console.log(result);
		// parse the result before sending it to the frontend
		const unparsedString = result[0][0]["column_type"];
		console.log(`Got unparsed string: ${unparsedString}.`);
		const parsedArray = unparsedString.slice(1, -1).split("','");
		console.log(`Parsed string into array: ${parsedArray}`);
        res.send(parsedArray);
    })
})

//author : Nick Madero
app.post('/api/insert-newcustomer', (req, res) => {
    console.log(req.body); // added console.log statement

    const new_appointment = "call create_new_appointment(?,?,?,?,?,?,?,?);";
    dbController.query(new_appointment, [req.body.email, req.body.first_name, req.body.last_name, req.body.address, req.body.numZones,req.body.brand, req.body.outside,req.body.zip_code],  (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    })
})

//author : Nick Madero
app.post('/api/show-appointments', (req, res) => {
    const show_appointments = "call get_all_appointments_on_date(?);";
    dbController.query(show_appointments, [req.body.date], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
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
            }));
            res.send(appointments);
        }
    })
});


// add a port to expose the API when the server is running
app.listen('3001', () => { })
