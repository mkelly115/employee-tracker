const db = require('./db/db.js');
const Table = require('cli-table');
const inquirer = require('inquirer');


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
  
          // rows.forEach((employee) => {
          //   table.push([
          //     employee.employeeId,
          //     `${employee.firstName} ${employee.lastName}`,
          //     employee.jobTitle,
          //     employee.departmentName,
          //     employee.salary,
          //     employee.managerName || 'None',
          //   ]);
          // });
          rows.forEach((employee) => {
            table.push([
              employee.employeeId,
              `${employee.firstName} ${employee.lastName}`,
              employee.jobTitle || 'N/A',
              employee.departmentName || 'N/A', 
              employee.salary || 'N/A',
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
  
  const addDepartmentPrompt = {
    type: 'input',
    name: 'newDepartmentName',
    message: 'Please enter the new Department Name:',
  };

  async function addNewDepartment(departmentName) {
    try {
      const [result] = await db.execute('INSERT INTO department (name) VALUES (?)', [departmentName]);
      console.log(`New department "${departmentName}" added. Department ID: ${result.insertId}`);
      return result.insertId;
    } catch (error) {
      console.error('Error adding new department:', error);
      throw error;
    }
  }

// Below is test for the add employee function - do during class
const addEmployeePrompt = [
  {
    type: 'input',
    name: 'firstName',
    message: 'Enter the first name of the employee:',
  },
  {
    type: 'input',
    name: 'lastName',
    message: 'Enter the last name of the employee:',
  },
  {
    type: 'list',
    name: 'role',
    message: 'Select the employee role:',
    choices: async () => {
      try {
        const [rows] = await db.query('SELECT id, title FROM role');
        return rows.map(role => ({ name: role.title, value: role.id }));
      } catch (error) {
        console.error('Error fetching roles:', error);
        return [{ name: 'Error fetching roles.', value: 'error' }];
      }
    },
  }
];


async function addEmployee(returnToMainMenuCallback) {
  try {
    const employeeData = await inquirer.prompt([...addEmployeePrompt]);
    console.log('Employee Data:', employeeData);

    const [result] = await db.execute('INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)', [
      employeeData.firstName,
      employeeData.lastName,
      employeeData.role,
    ]);

    console.log(`Employee ${employeeData.firstName} ${employeeData.lastName} added successfully. Employee ID: ${result.insertId}`);

    // Ask the user if they want to return to the main menu
    const returnToMainMenu = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'returnToMainMenu',
        message: 'Do you want to return to the main menu?',
        default: true,
      },
    ]);

    if (returnToMainMenu.returnToMainMenu) {
      // If the user wants to return to the main menu, call the provided callback function
      returnToMainMenuCallback();
    } else {
      // If the user doesn't want to return to the main menu, exit the application
      console.log('Exiting the application.');
      process.exit(0);
    }

  } catch (error) {
    console.error('Error adding employee:', error);
  }
}

const addRolePrompt = [
  {
    type: 'input',
    name: 'title',
    message: 'Enter the title of the role:',
  },
  {
    type: 'input',
    name: 'salary',
    message: 'Enter the salary for the role:',
  },
  {
    type: 'input',
    name: 'departmentName',
    message: 'Enter the department for the role:',
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
    addNewDepartment,
    viewAllRoles,
    viewAllEmployees,
    addDepartmentPrompt,
    addRolePrompt,
    addEmployee,
    addEmployeePrompt,
    exitConfirmation,
  };