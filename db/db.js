const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'employee_tracker_db',
});

module.exports = connection.promise();
