const db = require('./db/db.js');
const Table = require('cli-table');

const mainMenu = [
    {
      type: 'list',
      name: 'mainMenuOption',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    },
  ];

  const viewAllDepartments = [
    {
      type: 'list',
      name: 'viewAllDepartments',
      message: 'View all departments:',
      choices: async () => {
        try {
          // Use a SQL query to fetch department IDs and names from the database
          const [rows] = await db.query('SELECT id, name FROM department');
  
          // Map the rows to create choices with both ID and name
          const departmentChoices = rows.map((department) => ({
            value: department.id,
            name: `${department.name} (ID: ${department.id})`,
          }));
          // const departmentChoices = rows.map(row => {
          //   console.log(row)
          // })
          // Return the array of choices for the list
          return departmentChoices;
        } catch (error) {
          console.error('Error fetching departments:', error);
          return ['Error fetching departments.'];
        }
      },
    },
  ];

  // const viewAllRoles = [
  //   {
  //     type: 'list',
  //     name: 'viewAllRoles',
  //     message: 'View all roles:',
  //     choices: async () => {
  //       try {
  //         const [rows] = await db.query(`
  //           SELECT r.id AS roleId, r.title AS roleTitle, r.salary, d.name AS departmentName
  //           FROM role r
  //           JOIN department d ON r.department_id = d.id
  //         `);
  
  //         const roleChoices = rows.map((role) => ({
  //           value: role.roleId,
  //           name: `${role.roleTitle} (Role ID: ${role.roleId}) - Department: ${role.departmentName} - Salary: ${role.salary}`,
  //         }));
  
  //         return roleChoices;
  //       } catch (error) {
  //         console.error('Error fetching roles:', error);
  //         return ['Error fetching roles.'];
  //       }
  //     },
  //   },
  // ];
  const viewAllRoles = [
    {
      type: 'list',
      name: 'viewAllRoles',
      message: 'View all roles:',
      choices: async () => {
        try {
          const [rows] = await db.query(`
            SELECT r.id AS roleId, r.title AS roleTitle, r.salary, d.name AS departmentName
            FROM role r
            JOIN department d ON r.department_id = d.id
          `);
  
          // Create a new table
          const table = new Table({
            head: ['Role ID', 'Title', 'Salary', 'Department'],
            colWidths: [10, 30, 15, 30],
          });
  
          // Add rows to the table
          rows.forEach((role) => {
            table.push([role.roleId, role.roleTitle, role.salary, role.departmentName]);
          });
  
          // Display the formatted table
          console.log(table.toString());
  
          // Add an option to return to the main menu
          const choices = rows.map((role) => ({
            name: `${role.roleId}: ${role.roleTitle}`,
            value: role.roleId,
          }));
  
          choices.push({ name: 'Return to Main Menu', value: 'mainMenu' });
  
          return choices;
        } catch (error) {
          console.error('Error fetching roles:', error);
          return [{ name: 'Error fetching roles.', value: 'error' }];
        }
      },
    },
  ];
  

  // const viewAllEmployees = [
  //   {
  //     type: 'list',
  //     name: 'viewAllEmployees',
  //     message: 'View all employees:',
  //     choices: async () => {
  //       try {
  //         const [rows] = await db.query(`SELECT 
  //           e.id AS employeeId, 
  //           e.first_name AS firstName, 
  //           e.last_name AS lastName,
  //           r.title AS jobTitle, 
  //           d.name AS departmentName, 
  //           r.salary,
  //           CONCAT(m.first_name, ' ', m.last_name) AS managerName
  //         FROM employee e
  //         LEFT JOIN role r ON e.role_id = r.id
  //         LEFT JOIN department d ON r.department_id = d.id
  //         LEFT JOIN employee m ON e.manager_id = m.id;`);

  //         const employeeChoices = rows.map((employee) => ({
  //           value: employee.employeeId,
  //           name: `ID: ${employee.employeeId} - ${employee.firstName} ${employee.lastName} 
  //                  | Job Title: ${employee.jobTitle} | Department: ${employee.departmentName} 
  //                  | Salary: ${employee.salary} | Manager: ${employee.managerName || 'None'}`,
  //         }));
          
  //         return employeeChoices;
  //       } catch (error) {
  //         console.error('Error fetching employees:', error);
  //         return ['Error fetching employees.'];
  //       }
  //     },
  //   },
  // ];

  const viewAllEmployees = [
    {
      type: 'list',
      name: 'viewAllEmployees',
      message: 'View all employees:',
      choices: async () => {
        try {
          const [rows] = await db.query(`
            SELECT 
              e.id AS employeeId, 
              e.first_name AS firstName, 
              e.last_name AS lastName,
              r.title AS jobTitle, 
              d.name AS departmentName, 
              r.salary,
              CONCAT(m.first_name, ' ', m.last_name) AS managerName
            FROM employee e
            LEFT JOIN role r ON e.role_id = r.id
            LEFT JOIN department d ON r.department_id = d.id
            LEFT JOIN employee m ON e.manager_id = m.id;
          `);
  
          // Create a new table
          const table = new Table({
            head: ['Employee ID', 'Name', 'Job Title', 'Department', 'Salary', 'Manager'],
            colWidths: [15, 40, 30, 30, 15, 40],
          });
  
          // Add rows to the table
          rows.forEach((employee) => {
            table.push([
              employee.employeeId,
              `${employee.firstName} ${employee.lastName}`,
              employee.jobTitle,
              employee.departmentName,
              employee.salary,
              employee.managerName || 'None',
            ]);
          });
  
          // Display the formatted table
          console.log(table.toString());
  
          // Add an option to return to the main menu
          const choices = rows.map((employee) => ({
            name: `ID: ${employee.employeeId} - ${employee.firstName} ${employee.lastName}`,
            value: employee.employeeId,
          }));
  
          choices.push({ name: 'Return to Main Menu', value: 'mainMenu' });
  
          return choices;
        } catch (error) {
          console.error('Error fetching employees:', error);
          return [{ name: 'Error fetching employees.', value: 'error' }];
        }
      },
    },
  ];
  

const exitConfirmation = [
    {
      type: 'confirm',
      name: 'confirmExit',
      message: 'Are you sure you want to exit?',
      default: false,
    },
  ];

  module.exports = {
    mainMenu,
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    exitConfirmation,
  };