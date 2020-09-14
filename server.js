// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

// Create instance of express app
var app = express();

// Set port for app
var PORT = process.env.PORT || 8080;

// MySQL DB Connection Info
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "12345678",
    database: "employeeTracker"
});

// Initiate MySQL Connection
connection.conect((err) => {
    if(err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connectionn.threadId);
});

// Function to validate first and last name in CLI open-input fields
const responseValidation = function (input) {
    if (input === "") {
        console.log("This parameter cannot be empty!");
        return false;
    }

    return true;
};

// Function to begin application
function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "begin",
            choices: ["View All Employees","Add Employee", "Update Employee Roles"]
        }
    ]).then(answer => {
        if (answer.begin === "View All Employees") {
            viewAll();
        } else if (answer.begin === "Add Employee") {
            addEmployee();
        } else if (answer.begin === "Update Employee Roles") {
            updateEmployeeRole();
        }
    });
};

// Function to view all employees stored in database
function viewAll() {

};

// function viewAllByDepart() { };

// function viewAllByManager() { };

// Function to add employee to database
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "firstName",
            validate: responseValidation
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "lastName",
            validate: responseValidation
        },
        {
            type: "list",
            message: "What is the employee's role?",
            name: "role",
            choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Mannager", "Accountant", "Legal Team Lead"]
        },
        {
            type: "list",
            message: "Who is the employee's manager?",
            name: "managerName",
            choices: ["None", ]
        }
    ]).then(answers => {

        start();
    });
};

// function removeEmployee() { };

// Function to update an employee's role within database
function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee would you like to update?",
            name: "employee",
            choices: []
        },
        {
            type: "list",
            message: "What is the employee's role?",
            name: "role",
            choices: []
        },
        {
            type: "list",
            message: "Who is the employee's manager?",
            name: "managerName",
            choices: []
        }
    ]).then(answers => {

        start();
    });
};

// Function to update employee's mananger
function updateEmployeeManager() {
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee's manager do you want to update?",
            name: "managers",
            choices: []
        },
        {
            type: "list",
            message: "Which employee do you want to set as manager for the select employee?",
            name: "manager",
            choices: []
        }
    ]).then(answers => {

        start();
    });
};

// function viewAllRoles() { };

// function addRole() { };

// function removeRole() { };