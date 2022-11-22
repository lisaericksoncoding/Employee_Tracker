const mysql = require("mysql2");
const inquirer = require("inquirer");
const express = require('express');
const { createConnection } = require("net");
const { start } = require("repl");
require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
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

}

then(function ({ task }) {
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

function viewAllDepts() {
    createConnection.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        console.log("All departments are listed.");
        console.table(data);
        start();
    
    });
}
function viewAllRoles() {
    createConnection.query("SELECT * FROM role", (err, data) => {
        if (err) throw err;
        console.log("All roles are listed.");
        console.table(data);
        start();
    
    });
}
function viewAllEmployees() {
    createConnection.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err;
        console.log("All employees are listed.");
        console.table(data);
        start();
    
    });
}