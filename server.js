// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

// MySQL DB Connection Info
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "12345678",
    database: "employeeTracker"
});

// Initiate MySQL Connection
connection.connect((err) => {
    if(err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
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
            choices: ["View All Employees", "View All Departments", "View All Roles", "Add Employee", "Update Employee Roles", "Exit"]
        }
    ]).then(answer => {
        switch (answer.begin) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "View All Departments":
                viewAllDepartments();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Roles":
                updateEmployeeRole();
                break;
            case "Exit":
                connection.end();
                break;
        }
    });
};

// Function to view all employees stored in database
function viewAllEmployees() {
    var query = "SELECT * FROM employee ORDER BY id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("\n-----------------------------------");
        const table = cTable.getTable(res);
        console.log(table);
        start();
    });
};

// Function to view all departments stored in database
function viewAllDepartments() {
    var query = "SELECT * FROM department ORDER BY id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("\n-----------------------------------");
        const table = cTable.getTable(res);
        console.log(table);
        start();
    });
};

// Function to view all roles stored in database
function viewAllRoles() {
    var query = "SELECT * FROM role ORDER BY id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("\n-----------------------------------");
        const table = cTable.getTable(res);
        console.log(table);
        start();
    });
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
            message: "Who is the employee's manager?",
            name: "managerName",
            choices: ["None", ]
        }
    ]).then(answers => {
        var query = "SELECT title, id FROM role";
        inquirer.prompt([
            {
                type: "list",
                message: "What is the employee's role?",
                name: "role",
                choices: [query.map(role => {
                    return role.title;
                })]
            },
        ])
        
        var query1 = "INSERT INTO employee (first_name, last_name, role_id, manager_id)";
        console.log("\n-----------------------------------");
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
        console.log("\n-----------------------------------");
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
        console.log("\n-----------------------------------");
        start();
    });
};

// function addRole() { };

// function removeRole() { };

start();