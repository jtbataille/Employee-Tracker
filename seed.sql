-- Creates the following rows in the 'department' table --
INSERT INTO department (name)
VALUES
("Sales"),
("Engineering"),
("Legal"),
("Finance");

-- Creates the following rows in the 'role' table --
INSERT INTO role (title, salary, department_id)
VALUES
("Sales Lead Manager", "100000.00", 1),
("Salesperson", "80000.00", 1),
("Lead Engineer Manager", "150000.00", 2),
("Software Engineer", "120000.00", 2),
("Legal Team Lead Manager", "250000.00", 3),
("Lawyer", "190000.00", 3),
("Account Manager", "130000.00", 4),
("Accountant", "125000.00", 4);

-- Creates the following rows in the 'employee' table --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("John", "Doe", 1, NULL),
("Mike", "Chan", 2, 1),
("Frank", "Adams", 2, 1),
("Ashley", "Rodriguez", 3, NULL),
("Kevin", "Tupik", 4, 4),
("Mason", "Ochoa", 4, 4),
("Tom", "Allen", 5, NULL),
("Malia", "Brown", 6, 7),
("Xiang", "Reily", 6, 7),
("Sally", "Ford", 7, NULL),
("Danny", "Fitz", 8, 10),
("Lauren", "Folley", 8, 10);

-- Selects all columns from each table in database --
SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;