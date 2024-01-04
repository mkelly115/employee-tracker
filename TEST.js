const inquirer = require('inquirer');
const prompts = require('./questions.js');
const db = require('./db/db.js');

async function viewAllDepartments() {
  try {
    const answers = await inquirer.prompt(prompts.viewAllDepartments);
    console.log('Selected department ID:', answers.viewAllDepartments);
  } catch (error) {
    console.error('Error in viewAllDepartments:', error);
  }
}

async function mainMenu() {
  try {
    console.log('Before main menu prompt');
    const answers = await inquirer.prompt(prompts.mainMenu);
    console.log('User selected:', answers.mainMenuOption);

    switch (answers.mainMenuOption) {
      case 'View all departments':
        await viewAllDepartments();
        break;
        
      case 'Exit':
        console.log('Exiting the application.');
        break;
    }
  } catch (error) {
    console.error('Error in mainMenu:', error);
  }
}

async function main() {
  try {
    await mainMenu();
  } catch (error) {
    console.error('Error in main:', error);
  }
}

main();