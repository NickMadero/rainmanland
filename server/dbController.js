const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'host.docker.internal',
    user: 'dev',
    port: '3306',
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
