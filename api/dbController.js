// Tiny module used to connect to the database.
// Uses environment variables set by the start-app script -> docker-compose file to
// figure out which database to connect to. dev branch connects to the test database
// in the mysql container, prod branch connects to the real database hosted
// directly in the EC2 instance. (each branch has its own docker-compose.yml)

const mysql = require('mysql2');

// get environment variables
const MYSQL_HOST_IP_OR_HOSTNAME = process.env.MYSQL_HOST_IP_OR_HOSTNAME;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_PORT = process.env.MYSQL_PORT;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const NODE_ENV = process.env.NODE_ENV;

console.error(`MYSQL_HOST_IP_OR_HOSTNAME: ${MYSQL_HOST_IP_OR_HOSTNAME}\nMYSQL_USER: ${MYSQL_USER}\nMYSQL_PASSWORD: ${MYSQL_PASSWORD}\nMYSQL_PORT: ${MYSQL_PORT}\nMYSQL_DATABASE: ${MYSQL_DATABASE}\nNODE_ENV: ${NODE_ENV}`);

var connection = null;

if (NODE_ENV === "development") {
	console.error("USING DEV SETTINGS TO CONNECT TO DB");
	connection = mysql.createPool({
		connectionLimit	: 10,
    	host            : MYSQL_HOST_IP_OR_HOSTNAME,
    	user            : MYSQL_USER,
    	password        : MYSQL_PASSWORD,
    	database        : MYSQL_DATABASE
	});
}

else if (NODE_ENV === "production") {
	console.error(`using host: 127.0.0.1, user: ${MYSQL_USER}, port: ${MYSQL_PORT}, database: ${MYSQL_DATABASE}, pass: ${MYSQL_PASSWORD}.`);
	connection = mysql.createPool({
		connectionLimit : 10,
    	host            : "127.0.0.1",  // We use port forwarding to gaslight the Node container into thinking the MySQL database is running locally
    	user            : MYSQL_USER,
		password        : MYSQL_PASSWORD,
    	port            : MYSQL_PORT,
    	database        : MYSQL_DATABASE
	});
}

connection.getConnection(function(err) {
	if (err) {
		console.error('Error connecting to database: ' + err.stack);
		return;
	}
	console.log('Connected to database with ID ' + connection.threadId);
});


module.exports = connection;

