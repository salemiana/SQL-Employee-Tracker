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
const choiceArray = [];

// start of manager prompts

const promptChoices = () => {
  //return (
    inquirer
      .prompt([
        {
          type: "list",
          name: "opt",
          message: "Please choose an option",
          choices: [
            "view all departments",
            "view all roles",
            "view all employees",
            "add a department",
            "add a role",
            "add an employee",
            "update an employee role",
            "exit"
          ],
        }
      ])
      //Assigns choice to anwser if choice == call function
      .then((answer) => {
        const { choices } = answer;
        if (choices === "view all departments") {
          viewAllDepartments();
        }
        if (choices === "view all roles") {
          viewAllRoles();
        }
        if (choices === "view all employees") {
          viewAllEmployees();
        }
        //choiceArray.push();
        if (choices === "add a department") {
          addDepartment();
        }
        if (choices === "add a role") {
          addRole();
        }
        if (choices === "add an employee") {
            addEmployee();
          }
        if (choices === "update an emloyee role") {
          updateRole();
        } 
        if(choices === 'Exit') {
            connection.end();
         }
      });
  };
    


//functions to view departments
const viewAllDepartments = () => {
  const sql = `SELECT department.id AS id, department.name AS department FROM department`;
  con.query(sql, (error, response) => {
    if (error) throw error;
    //console.log("All Departments");
    console.table(res);
    promptChoices();
  });
};
//promptChoices();

// async function getDepartment(_) {
//     const sql = "SELECT * FROM department";
//     con.query(sql, (err, res) => {
//       if (err) throw err;
//       console.log(res);
//       return res;
//     });
//   }

// WHEN I choose to view all roles title, salary, department_id
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
const viewAllRoles = () => {
    const sql = `SELECT role.title, role.salary, role.department_id AS role FROM role`;
    con.query(sql, (error, response) => {
      if (error) throw error;
      console.log("All Roles");
      //promptChoices();
    });
  };
  //promptChoices();

  //functions to view employees first_name, last_name, role_id, manager_id
const viewAllEmployees = () => {
    const sql = `SELECT first_name, last_name, role_id, manager_id AS employee FROM employee`;
    con.query(sql, (error, response) => {
      if (error) throw error;
      console.log("All Employees");
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
