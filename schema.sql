-- Drops the employeeTracker if it already exists --
DROP DATABASE IF EXISTS employeeTracker;
-- Creates a database called employeeTracker --
CREATE DATABASE employeeTracker;
USE employeeTracker;

-- Creates a table within employeeTracker called 'department' --
CREATE TABLE department (
	id INT AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- Creates a table within employeeTracker called 'role' --
CREATE TABLE role (
	id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8, 2) NOT NULL,
    department_id INT,
    PRIMARY KEY (id)
);

-- Creates a table within employeeTracker called 'employee' --
CREATE TABLE employee (
	id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);