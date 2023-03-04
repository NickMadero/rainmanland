const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const db = mysql.createPool({
    host: 'mysql_db', // the host name MYSQL_DATABASE: node_mysql
    user: 'MYSQL_USER', // database user MYSQL_USER: MYSQL_USER
    password: 'MYSQL_PASSWORD', // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
    database: 'books' // database name MYSQL_HOST_IP: mysql_db
})

//enable CORS security headers

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hi There')
});

app.get('/get', (req, res) => {
    const SelectQuery = " SELECT * FROM user_test";
    db.query(SelectQuery, (err, result) => {
        res.send(result)
    })
})

// add a new user to the database
app.post("/insert", (req, res) => {
    const username = req.body.username;
    const password   = req.body.password;
    const InsertQuery = "INSERT INTO user_test (user_name, password_name) VALUES (?, ?)";
    db.query(InsertQuery, [username, password], (err, result) => {
        console.log(result)
    })
})


// listening on localhost 3001
app.listen('3001', () => { })