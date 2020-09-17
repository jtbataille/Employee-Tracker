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
            choices: ["View All Employees", "View All Departments", "View All Roles", "Add Department", "Add Role", "Add Employee", "Update Employee Roles", "Exit"]
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
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                newEmployeeName();
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
    var query = "SELECT CONCAT(a.first_name, ' ', a.last_name) AS 'employee name', title, salary, name AS department, ";
    query += "CONCAT(b.first_name, ' ', b.last_name) AS manager FROM employee a LEFT JOIN employee b ON a.manager_id = b.id ";
    query += "INNER JOIN role ON a.role_id = role.id INNER JOIN department ON department_id = department.id"
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
    var query = "SELECT title, salary, name AS department FROM role INNER JOIN department ON role.department_id = department.id";
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

// Function to get new employee's first and last name
function newEmployeeName () {
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
        }
    ]).then(answers => {
        newEmployeeRole(answers.firstName.trim(), answers.lastName.trim());
    });
};

// Function to get new employee's role
function newEmployeeRole (firstName, lastName) {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;

        inquirer.prompt([
            {
                type: "list",
                message: "Choose a role",
                choices: () => {
                    const choices = [];
                    for (let i = 0; i < res.length; i++) {
                        choices.push(res[i].title);
                    }
                    return ([...new Set(choices)]);
                },
                name: "role"
            }
        ]).then (answer => {
            newEmployeeDept(answer.role, firstName, lastName);
        });
    });
};

// Function to get new employee's manager
function newEmployeeDept(role, firstName, lastName) {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;

        inquirer.prompt([
            {
                type: "list",
                message: "Choose a department",
                choices: () => {
                    const choices = [];
                    for (let i = 0; i < res.length; i++) {
                        choices.push(res[i].name);
                    }
                    return choices;
                },
                name: "dept"
            }
        ]).then(answer => {
            addEmployee(answer.dept, role, firstName, lastName);
        });
    });
};

// Function to add employee to database
function addEmployee(dept, role, firstName, lastName) {
    let query = "SELECT role.id FROM role INNER JOIN department ON department_id = department.id WHERE title = ? AND name = ?";
    connection.query(query, [role, dept], (err, response) => {
        if (err) {
            throw err;
        }
        role_id = response[0].id;
        connection.query("SELECT id, first_name, last_name FROM employee",
        (err, res1) => {
            if (err) throw err;
            
            inquirer.prompt([
                {
                    type: "list",
                    message: "Choose a manager for this employee",
                    choices: () => {
                        const choices = ["None"];
                        for (let i = 0; i < res1.length; i++) {
                            choices.push(res1[i].first_name + " " + res1[i].last_name);
                        }
                        return choices;
                    },
                    name: "manager"
                }
            ]).then((managerResponse) => {
                if (managerResponse.manager === "None") {
                    let query = "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)";
                    connection.query(query, [firstName, lastName, role_id], (err, res) => {
                        if (err) throw err;

                        console.log(`Added new employee with the name of ${firstName} ${lastName} to the database.`);
                        start();
                    });
                } else {
                    let manager = managerResponse.manager.split(" ");
                    let managerFirstName = manager[0];
                    let managerLastName = manager[1];
                    for (let i = 0; i < res1.length; i++) {
                        if (res1[i].first_name === managerFirstName && res1[i].last_name === managerLastName) {
                            manager_id = res1[i].id;
                        }
                    }
                    let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                    connection.query(query, [firstName, lastName, role_id, manager_id], (err, res) => {
                        if (err) throw err;

                        console.log(`Added new employee with the name of ${firstName} ${lastName} to the database.`);
                        start();
                    });
                }
            });
        });
    });
};

function addRole() {
    let query = "SELECT * FROM department";
    connection.query(query, (err, result) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "input",
                message: "What is the title of this role?",
                name: "title",
                validate: responseValidation
            },
            {
                type: "number",
                message: "What is the salary for this position (please include 2 decimal places)",
                name: "salary",
                validate: responseValidation
            },
            {
                type: "list",
                message: "Please choose a department",
                choices: () => {
                    const choices = [];
                    for (let i = 0; i < result.length; i++) {
                        choices.push(result[i].name);
                    }
                    return choices;
                },
                name: "department"
            }
        ]).then(answer => {
            let dept_id;
            for (let i = 0; i < result.length; i++) {
                if (result[i].name === answer.department) {
                    dept_id = result[i].id;
                }
            }
            query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
            connection.query(query, [answer.title, answer.salary, dept_id], (err, res) => {
                if (err) throw err;

                start();
            });
        });
    });
};

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the department you wish to add?",
            name: "name",
            validate: responseValidation
        }
    ]).then(answer => {
        let duplicate = false;
        connection.query("SELECT * FROM department", (err, result) => {
            if (err) throw err;
            for (let i = 0; i < result.length; i++) {
                if (result[i].name === answer.name) {
                    duplicate = true;
                }
            }
            if (!duplicate) {
                var query = "INSERT INTO department (name) VALUES (?)";
                connection.query(query, [answer.name], (err, res) => {
                    if (err) throw err;
                    console.log("\n-----------------------------------");
                    console.log(query);
                });
            } else {
                console.log("\n ------ This department already exists! -----");
            }
            start();
        });
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

// function removeRole() { };

start();