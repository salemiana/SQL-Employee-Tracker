const express = require('express');
const mysql = require('mysql2');
const fs = require('fs'); 
const inquirer = require('inquirer');
const conTable = require('console.table');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const con = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'awlette5QL173*',
      database: 'emp_tracker'
    },
    console.log('Connected to the emp_tracker database.')
  );

module.exports = con;