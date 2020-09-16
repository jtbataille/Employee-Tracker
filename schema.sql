-- Drops the employeeTracker if it already exists --
DROP DATABASE IF EXISTS employeeTracker;
-- Create a database called employeeTracker --
CREATE DATABASE employeeTracker;
USE employeeTracker;

-- Create a table within employeeTracker called 'department' --
CREATE TABLE department (
	id INT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

-- Create a table within employeeTracker called 'role' --
CREATE TABLE role (
	id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id)
);

-- Create a table within employeeTracker called 'employee' --
CREATE TABLE employee (
	id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY (id)
);