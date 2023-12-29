const inquirer = require("inquirer")
const db = require('./db/db.js');

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
  
          // Return the array of choices for the list
          return departmentChoices;
        } catch (error) {
          console.error('Error fetching departments:', error);
          return ['Error fetching departments.'];
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
          // Use a SQL query to fetch role details from the database
          const [rows] = await db.query(`
            SELECT r.id AS roleId, r.title AS roleTitle, r.salary, d.name AS departmentName
            FROM role r
            JOIN department d ON r.department_id = d.id
          `);
  
          // Map the rows to create choices with role information
          const roleChoices = rows.map((role) => ({
            value: role.roleId,
            name: `${role.roleTitle} (Role ID: ${role.roleId}) - Department: ${role.departmentName} - Salary: ${role.salary}`,
          }));
  
          // Return the array of choices for the list
          return roleChoices;
        } catch (error) {
          console.error('Error fetching roles:', error);
          return ['Error fetching roles.'];
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
    viewAllDepartments,
    exitConfirmation,
    mainMenu,
    viewAllRoles,

  };