USE employee_tracker_db;

-- DEPARTMENT DATA 

INSERT INTO department (id, name)
VALUES 
(1, "Sales"),
(2, "IT"), 
(3, "Finance"),
(4, "Legal");

-- EMPLOYEE ROLE DATA 

INSERT INTO role (id, title, salary, department_id) 
VALUES 
(1, "Sales Lead", 100000.000, 1), 
(2, "Salesperson", 800000.000, 1), 
(3, "Lead Software Engineer", 150000.000, 2),
(4, "Software Engineer", 120000.000, 2),
(5, "Account Manager", 125000.000, 3), 
(6, "Accountant", 250000.000, 3),
(7, "Legal Team Lead", 190000.000, 4),
(8, "Accounts Lawyers", 150000.000, 4);

-- EMPLOYEE DATA

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
(1, "John", "Doe", 3, null),
(2, "Mike", "Kelly", 4, null),
(3, "Katelyn", "Rodriguez", 3, null), 
(4, "Esher", "Tupik", 2, null), 
(5, "Quinton", "Brown", 2, null), 
(6, "Elizabeth", "Casey", 1, null), 
(7, "Tom", "Alen", 4, null), 
(8, "Christian", "Dragon", 2, null),
(9, "Jackson", "Smithfield", 1, null);