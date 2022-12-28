const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express');
const { createConnection } = require('net');
const { start } = require('repl');
const consoleTable = require('console.table');

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
        case "Update an Employee Role":
            updateRole();
            break;
    }
});
}

function viewAllDepts() {
    db.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        console.log("All departments are listed.");
        console.table(data);
        initialPrompt();

    });
}
function viewAllRoles() {
    db.query("SELECT * FROM role", (err, data) => {
        if (err) throw err;
        console.log("All roles are listed.");
        console.table(data);
        initialPrompt();

    });
}
function viewAllEmployees() {
    db.query("SELECT * FROM employee", (err, data) => {
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
        db.query("INSERT INTO department SET ?", [answer.department]), function (err, data) {
            if (err) throw err;
            console.table(data);
            initialPrompt();
        }
    })
}

function addARole() {
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
            type: "input",
            name: "dept_id",
            message: "What department will this role be a part of?",
            choices: [
                `SELECT * FROM departments`
            ]
        },
        
    ]).then(function (answer) {
        db.query("INSERT INTO role SET ?", [answer.role]), function (err, data) {
            if (err) throw err;
            console.table(data);
            initialPrompt();
        }
    })
}