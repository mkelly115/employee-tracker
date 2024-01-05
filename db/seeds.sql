USE employee_tracker_db;

-- DEPARTMENT DATA 
INSERT INTO department (name)
VALUES 
("Sales"),
("IT"), 
("Finance"),
("Legal");

-- EMPLOYEE ROLE DATA 
INSERT INTO role (title, salary, department_id) 
VALUES 
("Sales Lead", 100000.000, 1), 
("Salesperson", 800000.000, 1), 
("Lead Software Engineer", 150000.000, 2),
("Software Engineer", 120000.000, 2),
("Account Manager", 125000.000, 3), 
("Accountant", 250000.000, 3),
("Legal Team Lead", 190000.000, 4),
("Accounts Lawyers", 150000.000, 4);

-- EMPLOYEE DATA
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("John", "Doe", 3, NULL),
("Mike", "Kelly", 4, NULL),
("Katelyn", "Rodriguez", 3, NULL), 
("Esher", "Tupik", 2, NULL), 
("Quinton", "Brown", 2, NULL), 
("Elizabeth", "Casey", 1, NULL), 
("Tom", "Alen", 4, NULL), 
("Christian", "Dragon", 2, NULL),
("Jackson", "Smithfield", 1, NULL);