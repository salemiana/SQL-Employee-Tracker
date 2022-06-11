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
