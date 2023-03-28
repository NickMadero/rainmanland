// Tiny module used to connect to the database.
// Uses environment variables set by the start-app script -> docker-compose file to
// figure out which database to connect to. dev branch connects to the test database
// in the mysql container, prod branch connects to the real database hosted
// directly in the EC2 instance. (each branch has its own docker-compose.yml)

const mysql = require('mysql2');



//console.error(`MYSQL_HOST_IP_OR_HOSTNAME: ${MYSQL_HOST_IP_OR_HOSTNAME}\nMYSQL_USER: ${MYSQL_USER}\nMYSQL_PASSWORD: ${MYSQL_PASSWORD}\nMYSQL_PORT: ${MYSQL_PORT}\nMYSQL_DATABASE: ${MYSQL_DATABASE}\nNODE_ENV: ${NODE_ENV}`);




const	connection = mysql.createPool({
		connectionLimit	: 10,
    	host            : 'localhost',
    	user            : 'dev',
    	password        : 'dev',
    	database        : 'rainmanland',
		port			: '3307'
	});




connection.getConnection(function(err) {
	if (err) {
		console.error('Error connecting to database: ' + err.stack);
		return;
	}
	console.log('Connected to database with ID ' + connection.threadId);
});


module.exports = connection;


