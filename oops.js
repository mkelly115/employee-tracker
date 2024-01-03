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

async function main() {
  try {
    console.log('Before prompt');
    const answers = await inquirer.prompt(mainMenu);
    console.log('After prompt. User selected:', answers.mainMenuOption);
  } catch (error) {
    console.error('Error in main:', error);
  }
}

main();