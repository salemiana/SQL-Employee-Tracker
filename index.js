//const fs = require("fs");
const inquirer = require("inquirer");
// const table = require("console.table");
// const db = require("/db");
const con = require("./config/server.js");

// view all departments
//  ('Accounting'),
// ('IT Support'),
// ('Marketing'),
// ('Executive');

// team array
const teamArray = [];

// start of manager prompts
const promptChoices = () => {
  return (
    inquirer
      .prompt([
        {
          type: "list",
          name: "dept",
          message: "Please choose an option",
          choices: [
            "view all departments",
            "view all roles",
            "view all employees",
            "add a department",
            "add a role",
            "add an employee",
            "update an employee role",
          ],
        },
      ])
      //Assigns choice to anwser if choice == call function
      .then((answer) => {
        const { choices } = answer;
        if (choices === "view all departments") {
          viewAllDepartments();
        }
        if (choices === "view all roles") {
          viewAllRolls();
        }
        if (choices === "view all employees") {
          viewAllEmployees();
        }
        if (choices === "add a department") {
          addDepartment();
        }
        if (choices === "add a role") {
          addRole();
        }
        if (choices === "update an emloyee role") {
          updateRole();
        }
      })
  );
};

//functions to view departments
const viewAllDepartments = () => {
  const sql = `SELECT department.id, department.name AS department FROM department`;
  con.query(sql, (error, response) => {
    if (error) throw error;
    console.log("All Departments");
    promptChoices();
  });
};
promptChoices();

//functions to add departments
// write out inq prompt to ask whats the name of the depqartment
// youll use the .then and assign there anwse
// write sql query to inserts into department table on department name with value(?)
//call function view all departments
//console log your steps to see whats going on
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDept",
        message: "Please enter a department name?",
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO departments AS department (name) VALUES ('?')`;
      con.query(sql, (error, response) => {
        if (error) throw error;
        console.log("viewAllDepartments");
        viewAllDepartments();
      });
    });
};