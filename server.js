const mysql = require("mysql");
const inquirer = require("inquirer");
const express = require('express');
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
})
