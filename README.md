# EMPLOYEE-TRACKER  [![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)

The purpose of this project was to create a db and seed that would have employees, departments, salaries, and roles. Within the context of this db, using inquirer, the user would be able to navigate the DB and have it post locally to the command line. Beyond this the user is also able to add a department, employee, or role to the database, as well as modifying the role of any given employee. I added the ability for the user to scroll through employees as an idea for a later iteration to get more personal info on any given employee.

## Usage

Once the db has been created and seeded, the user will simply enter "node server.js" into the command line and the program will begin with a main menu prompt. Within this main menu are the following options: View Departments, View Roles, View Employees, Add a Department, Add a role, Add an employee, and Update an employee. The user will then be able to scroll to their chosen input and hit enter. This will bring up a table if the user wishes to see departments, roles, or employees. If the user wishes to add one of the aforementioned sections, they will be prompted via inquirer with the relevant information for that section. When the user enters the final prompt of a given add section, a console command will confirm with the name, department, or role created in the command line so that the user is sure it has been created. This also applies to the updating of a role with the employees new role. On the back end the change in role will also change their department and pay according to the new role.

## Conclusion

This turned out to be one of the toughest projects for me yet. I had many issues with getting connects to work, a misnamed variable that cost 5 hours, and a great deal of issues with fixing one section of code only for it to break a previous working code block. I would say that this section taught me alot about delving deep into resources online and the importance of persistence. When referencing some other similar projects online I did take not that my code was a bit longer than others and is something I will take into account next time on a project like this. I managed to cut down heavily on code by kicking the user back to the main menu and using console.logs to show that a section had been completed. Before I did this I relied heavily on if statements and long code blocks to direct the user to the appropriate location. I found that the kick back to main menu was both cleaner and easier for the user. This project really tested me mentally - but I would argue that I came out the other side with more confidence that with enough effort I can overcome any obstacle that comes into my path on this coding journey.

# Screencastify

# Licensing

MPL 2.0