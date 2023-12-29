
USE employee_tracker;

-- DEPARTMENT DATA 

INSERT INTO department (name)
VALUES 
("Sales"),
("IT"), 
("Finance"),
("Legal");


-- EMPLOYEE ROLE DATA 


INSERT INTO employee_role (title, salary, department_id) 
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
("John", "Doe", 3, null),
("Mike", "Kelly", 4, null),
("Katelyn", "Rodriguez", 3, null), 
("Esher", "Tupik", 2, null), 
("Quinton", "Brown", 2,  null), 
("Elizabeth", "Casey", 1, null), 
("Tom", "Alen", 4, null), 
("Christian", "Dragon", 2, null),
("Jackson", "Smithfield", 1, null);