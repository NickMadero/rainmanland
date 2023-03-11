const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'docker.host.internal',
    user: 'dev',
    port: '3307',
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
