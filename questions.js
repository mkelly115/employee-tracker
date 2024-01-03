const db = require('./db/db.js');

const mainMenu = [
    {
      type: 'rawlist',
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
          const [rows] = await db.query(`
            SELECT r.id AS roleId, r.title AS roleTitle, r.salary, d.name AS departmentName
            FROM role r
            JOIN department d ON r.department_id = d.id
          `);
  
          const roleChoices = rows.map((role) => ({
            value: role.roleId,
            name: `${role.roleTitle} (Role ID: ${role.roleId}) - Department: ${role.departmentName} - Salary: ${role.salary}`,
          }));
  
          return roleChoices;
        } catch (error) {
          console.error('Error fetching roles:', error);
          return ['Error fetching roles.'];
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
          const [rows] = await db.query(`SELECT 
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
          LEFT JOIN employee m ON e.manager_id = m.id;`);

          const employeeChoices = rows.map((employee) => ({
            value: employee.employeeId,
            name: `ID: ${employee.employeeId} - ${employee.firstName} ${employee.lastName} 
                   | Job Title: ${employee.jobTitle} | Department: ${employee.departmentName} 
                   | Salary: ${employee.salary} | Manager: ${employee.managerName || 'None'}`,
          }));
          
          return employeeChoices;
        } catch (error) {
          console.error('Error fetching employees:', error);
          return ['Error fetching employees.'];
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