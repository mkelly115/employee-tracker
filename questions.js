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
          const [rows] = await db.query('SELECT id, name FROM department');
  
          const table = new Table({
            head: ['Department ID', 'Department Name'],
            colWidths: [15, 30],
          });
  
          rows.forEach((department) => {
            table.push([department.id, `${department.name}`]);
          });
 
          console.log(table.toString());
  
          const choices = rows.map((department) => ({
            name: `${department.name} (ID: ${department.id})`,
            value: department.id,
          }));
  
          choices.push({ name: 'Return to Main Menu', value: 'mainMenu' });
  
          return choices;
        } catch (error) {
          console.error('Error fetching departments:', error);
          return [{ name: 'Error fetching departments.', value: 'error' }];
        }
      },
    },
  ];

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
  
          const table = new Table({
            head: ['Role ID', 'Title', 'Salary', 'Department'],
            colWidths: [10, 30, 15, 30],
          });

          rows.forEach((role) => {
            table.push([role.roleId, role.roleTitle, role.salary, role.departmentName]);
          });
  
          console.log(table.toString());

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
  
          const table = new Table({
            head: ['Employee ID', 'Name', 'Job Title', 'Department', 'Salary', 'Manager'],
            colWidths: [15, 40, 30, 30, 15, 40],
          });
  
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
  
          console.log(table.toString());
  
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