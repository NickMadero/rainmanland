// import packages downloaded with npm install <package1> <package2>
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const AWS = require('aws-sdk');
const http = require('http');

// define constants
const DEFAULT_LOCAL_IP = "127.0.0.1"
const AWS_METADATA_SERVICE_IP = "169.254.169.254"

// Function to fetch the local IP address from the EC2 instance metadata
async function getLocalIpAddress() {
    return new Promise((resolve, reject) => {
        const options = {
            host: AWS_METADATA_SERVICE_IP,
            path: '/latest/meta-data/local-ipv4',
            method: 'GET',
        };

        const request = http.request(options, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to fetch local IP address: ${response.statusCode}`));
                return;
            }

            let ipAddress = '';

            response.on('data', (chunk) => {
                ipAddress += chunk;
            });

            response.on('end', () => {
                resolve(ipAddress);
            });
        });

        request.on('error', (error) => {
            reject(error);
        });

        request.end();
    });
}

var localIpAddress = '';
(async () => {
    try {
        localIpAddress = await getLocalIpAddress();
        console.log(`Local IP address: ${localIpAddress}`);
    } catch (error) {
        localIpAddress = DEFAULT_LOCAL_IP;
        console.error(`Error: ${error.message}\nTrying to connect with DEFAULT_LOCAL_IP`);
    }
})();


// add MySQL database connection
const db = mysql.createPool({
    host: localIpAddress, // the host name
    user: 'admin', // the database user
    password: 'admin', // database user password
    database: 'rainmanland-db' // database name
})

// initialize the Express app
const app = express();

// enable CORS security headers
app.use(cors());

// add an Express method to parse the POST method
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// gives express access to the compiled front end code
app.use(express.static(path.join(__dirname, 'build')))

// [TEMPLATE] retrieve something from the database
app.get('/get-something', (req, res) => {
    const SelectQuery = " SELECT * FROM table_name";
    db.query(SelectQuery, (err, result) => {
        res.send(result)
    })
})

// [TEMPLATE] insert something into the database
app.post('/insert-something', (req, res) => {
    const someField1 = req.body.setSomeField1;
    const someField2 = req.body.setSomeField2;
    const InsertQuery = "INSERT INTO table_name (field_name1, field_name2) VALUES (?, ?)";
    db.query(InsertQuery, [someField1, someField2], (err, result) => {
        console.log(result)
    })
})

// [TEMPLATE] delete something from the database
app.delete("/delete/:someId", (req, res) => {
    const someId = req.params.someId;
    const DeleteQuery = "DELETE FROM table_name WHERE id = ?";
    db.query(DeleteQuery, bookId, (err, result) => {
        if (err) console.log(err);
    })
})

// [TEMPLATE] update something in the database
app.put('/update/:someId', (req, res) => {
    const someField = req.body.someFieldUpdate;
    const someId = req.params.someId;
    const UpdateQuery = "UPDATE table_name SET field_name = ? WHERE id = ?";
    db.query(UpdateQuery, [someField, someId], (err, result) => {
        if (err) console.log(err)
    })
})

// Check credentials against db and return user info if credentials are good
// TODO: make this secure by storing hashed passwords instead of plaintext. this is a placeholder for the demo
app.post('/api/get-user-info', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const SelectQuery = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(SelectQuery, [email, password], (err, result) => {
        res.send(result);
    })
})

// get a list of today's jobs for the crew number passed as URL param
app.get('/api/get-jobs/:crewNum', (req, res) => {
    const crewNum = req.params.crewNum
    // TODO: make this query actually do its job - this is just for the demo again
    const GetJobsQuery = "SELECT * FROM appointments";
    db.query(GetJobsQuery, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    })
})

// Handles any requests that don't match the others. This is so react-router will handle any url that
// isn't a request for data.
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// add a port to expose the API when the server is running
app.listen('3001', () => { })
