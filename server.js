process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const inquirer = require('inquirer');
const prompts = require('./questions.js');
const db = require('./db/db.js');

// Function to handle the main menu
async function mainMenu() {
  try {
    const mainMenuResponse = await inquirer.prompt(prompts.mainMenu);

    switch (mainMenuResponse.mainMenuOption) {
      case 'View all departments':
        await viewAllDepartments();
        break;
      case 'View all roles':
        await viewAllRoles();
        break;
      case 'View all employees':
        await viewAllEmployees();
        break;
      case 'Exit':
        await exitApplication();
        break;
    }

    console.log('User selected:', mainMenuResponse.mainMenuOption);
  } catch (error) {
    console.error('Error in handleUserInput:', error);
  }
}

// Function to view all departments
async function viewAllDepartments() {
  try {
    const viewAllDepartmentsResponse = await inquirer.prompt(prompts.viewAllDepartments);
     if (viewAllDepartmentsResponse.viewAllDepartments === 'mainMenu') {
      console.log('Returning to the main menu...');
      mainMenu();
      return;
     }
  } catch (error) {
    console.error('Error in viewAllDepartments:', error);
  }
}

// Function to view all roles
async function viewAllRoles() {
  try {
    const viewAllRolesResponse = await inquirer.prompt(prompts.viewAllRoles);

    // Check if the user selected "Return to Main Menu"
    if (viewAllRolesResponse.viewAllRoles === 'mainMenu') {
      console.log('Returning to the main menu...');
      mainMenu();
      return;
    }

    // Handle the logic for other choices
    console.log(`Selected role ID: ${viewAllRolesResponse.viewAllRoles}`);
    console.log('User selected: View all roles');
  } catch (error) {
    console.error('Error in viewAllRoles:', error);
  }
};

// Function to view all employees
async function viewAllEmployees() {
  try {
    const viewAllEmployeesResponse = await inquirer.prompt(prompts.viewAllEmployees);
   
    if (viewAllEmployeesResponse.viewAllEmployees === "mainMenu") {
      console.log("Returning to the main menu...")
      mainMenu()
      return;
    }
  } catch (error) {
    console.error('Error in viewAllEmployees:', error);
  }
};

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
