const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'employee_tracker_db',
});

module.exports = connection.promise();

// async function addNewDepartment(departmentName) {
//   try {
//     const [result] = await connection.execute('INSERT INTO department (name) VALUES (?)', [departmentName]);
//     console.log(`New department "${departmentName}" added. Department ID: ${result.insertId}`);
//     return result.insertId;
//   } catch (error) {
//     console.error('Error adding new department:', error);
//     throw error;
//   }
// }

// module.exports = {
//   addNewDepartment,
// };