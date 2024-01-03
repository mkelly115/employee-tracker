process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const inquirer = require('inquirer');
const prompts = require('./questions.js');
const db = require('./db/db.js');

// Function to handle the main menu
async function mainMenu() {
  try {
    console.log('Before main menu prompt');
    const answers = await inquirer.prompt(prompts.mainMenu);
    console.log('User selected:', answers.mainMenuOption);

    switch (answers.mainMenuOption) {
      case 'View all departments':
        await viewAllDepartments();
        break;
      case 'View all roles':
        await viewAllRoles();
        break;
      case 'View all employees':
        await viewAllEmployees();
        break;
      case 'Add a department':
        break;
      case 'Exit':
        await exitApplication();
        break;
    }
  } catch (error) {
    console.error('Error in mainMenu:', error);
  }
}

// Function to view all departments
async function viewAllDepartments() {
  try {
    const answers = await inquirer.prompt(prompts.viewAllDepartments);
    console.log('Selected department ID:', answers.viewAllDepartments);
  } catch (error) {
    console.error('Error in viewAllDepartments:', error);
  }
}

// Function to view all roles
async function viewAllRoles() {
  try {
    const answers = await inquirer.prompt(prompts.viewAllRoles);
    console.log('Selected role ID:', answers.viewAllRoles);
  } catch (error) {
    console.error('Error in viewAllRoles:', error);
  }
}

// Function to view all employees
async function viewAllEmployees() {
  try {
    const answers = await inquirer.prompt(prompts.viewAllEmployees);
    console.log('Selected employee ID:', answers.showAllEmployees);
  } catch (error) {
    console.error('Error in viewAllEmployees:', error);
  }
}

// Function to exit the application
async function exitApplication() {
  try {
    const answers = await inquirer.prompt(prompts.exitConfirmation);
    if (answers.confirmExit) {
      console.log('Exiting the application.');
      process.exit(0);
    } else {
      console.log('Continuing the application.');
      mainMenu();
    }
  } catch (error) {
    console.error('Error in exitApplication:', error);
  }
}


mainMenu();
