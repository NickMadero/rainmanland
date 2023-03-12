const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dev',
    port: '9906',
    database: 'rainmanland'
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database with ID ' + connection.threadId);
});

module.exports = connection;
