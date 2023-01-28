const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express');
// const { createConnection } = require('net');
// const { start } = require('repl');
// const consoleTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "ER642fun!",
        database: 'employeeDB'
    },
    console.log(`Connected to the employee database.`)
);

db.connect(function (err) {
    if (err) throw err;
    console.log(`
┏━━━┓━━━━━━━━┏┓━━━━━━━━━━━━━━━━━━━━━━┏━━━┓━━━━━━┏┓━━━━━━┏┓━━━━━━━━━━━━━━━
┃┏━━┛━━━━━━━━┃┃━━━━━━━━━━━━━━━━━━━━━━┗┓┏┓┃━━━━━┏┛┗┓━━━━━┃┃━━━━━━━━━━━━━━━
┃┗━━┓┏┓┏┓┏━━┓┃┃━┏━━┓┏┓━┏┓┏━━┓┏━━┓━━━━━┃┃┃┃┏━━┓━┗┓┏┛┏━━┓━┃┗━┓┏━━┓━┏━━┓┏━━┓
┃┏━━┛┃┗┛┃┃┏┓┃┃┃━┃┏┓┃┃┃━┃┃┃┏┓┃┃┏┓┃━━━━━┃┃┃┃┗━┓┃━━┃┃━┗━┓┃━┃┏┓┃┗━┓┃━┃━━┫┃┏┓┃
┃┗━━┓┃┃┃┃┃┗┛┃┃┗┓┃┗┛┃┃┗━┛┃┃┃━┫┃┃━┫━━━━┏┛┗┛┃┃┗┛┗┓━┃┗┓┃┗┛┗┓┃┗┛┃┃┗┛┗┓┣━━┃┃┃━┫
┗━━━┛┗┻┻┛┃┏━┛┗━┛┗━━┛┗━┓┏┛┗━━┛┗━━┛━━━━┗━━━┛┗━━━┛━┗━┛┗━━━┛┗━━┛┗━━━┛┗━━┛┗━━┛
━━━━━━━━━┃┃━━━━━━━━━┏━┛┃━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
━━━━━━━━━┗┛━━━━━━━━━┗━━┛━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
    initialPrompt();
})

//functions

function initialPrompt() {
    inquirer
        .prompt({
            type: "list",
            name: "task",
            message: "What would you like to do?",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee Role",
                "Exit"]
        })

        .then(function ({ task }) {
            switch (task) {
                case "View All Departments":
                    viewAllDepts();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "Add a Department":
                    addADept();
                    break;
                case "Add a Role":
                    addARole();
                    break;
                case "Add an Employee":
                    addAnEmployee();
                    break;
                case "Exit":
                    process.exit(0);
                
            }
        });
}

function viewAllDepts() {
    db.query(`SELECT * FROM department`, (err, data) => {
        if (err) throw err;
        console.log("All departments are listed.");
        console.table(data);
        initialPrompt();

    });
}
function viewAllRoles() {
    db.query(`SELECT * FROM role`, (err, data) => {
        if (err) throw err;
        console.log("All roles are listed.");
        console.table(data);
        initialPrompt();

    });
}
function viewAllEmployees() {
    db.query(`SELECT * FROM employee`, (err, data) => {
        if (err) throw err;
        console.log("All employees are listed.");
        console.table(data);
        initialPrompt();

    });
}

function addADept() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the department you would like to add?",
            validate: (answer) => {
                if (answer) {
                    return true;
                } else {
                    console.log("You must enter a department name in order to add.");
                }
            }

        }
    ]).then(function (answer) {
        db.query(`INSERT INTO department SET ?`, { name: answer.name }, function (err, data) {
            if (err) throw err;
            console.log("You have succesfully added this department.")
            initialPrompt();
        })
    })
}

function addARole() {
    db.query(`SELECT * FROM department`, (err, data) => {
        if (err) throw err;

var deptChoices = data.map(dept => {
    return {
        name: dept.name,
        value: dept.id
    }
})
        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "What is the title of the role that you would like to add?",
                validate: (answer) => {
                    if (answer) {
                        return true;
                    } else {
                        console.log("You must enter a title in order to add.");
                    }
                }

            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the role that you would like to add?",
                validate: (answer) => {
                    if (answer) {
                        return true;
                    } else {
                        console.log("You must enter a salary in order to add.");
                    }
                }

            },
            {
                type: "list",
                name: "name",
                message: "What department will this role be a part of?",
                choices: deptChoices
            },

        ]).then(function (answer) {
            db.query(`INSERT INTO role SET ?`, { title: answer.title, salary: answer.salary, dept_id: answer.name }, function (err, data) {
                if (err) throw err;
                console.log("The role has been successfully added.");
                initialPrompt();
            })
        }) .catch(err => {
            console.log(err)}
        )
        
    });
}
function addAnEmployee() {
    db.query(`SELECT * FROM role`, (err, data) => {
        if (err) throw err;

var roleChoices = data.map(role => {
    return {
        name: role.title,
        value: role.id
    }
})
        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?",
                validate: (answer) => {
                    if (answer) {
                        return true;
                    } else {
                        console.log("You must enter a name in order to add.");
                    }
                }

            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?",
                validate: (answer) => {
                    if (answer) {
                        return true;
                    } else {
                        console.log("You must enter a last name in order to add.");
                    }
                }

            },
            {
                type: "list",
                name: "name",
                message: "What role does this employee have?",
                choices: roleChoices
            },

        ]).then(function (answer) {
            db.query(`INSERT INTO employee SET ?`, { first_name: answer.first_name, last_name: answer.last_name, role_id: answer.name }, function (err, data) {
                if (err) throw err;
                console.log("The employee has been successfully added.");
                initialPrompt();
            })
        }) .catch(err => {
            console.log(err)}
        )
        
    });
}

