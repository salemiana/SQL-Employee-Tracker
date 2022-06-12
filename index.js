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
    console.log("All Departments");
    console.table(res);
    promptChoices();
  });
};

// WHEN I choose to view all roles title, salary, department_id
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
const viewAllRoles = () => {
    `SELECT role.id, role.title, department.department_name AS department
    FROM role
    INNER JOIN department ON role.department_id = department.id`;
    con.query(sql, (error, response) => {
      if (error) throw error;
      response.forEach((role) => {console.log(role.title);});
      promptChoices();
    });
  };
  

  //functions to view employees first_name, last_name, role_id, manager_id
const viewAllEmployees = () => {
    const sql = `SELECT employee.id, 
    employee.first_name, 
    employee.last_name, 
    role.title, 
    department.department_name AS 'department', 
    role.salary
    FROM employee, role, department 
    WHERE department.id = role.department_id 
    AND role.id = employee.role_id
    ORDER BY employee.id ASC`;
    con.query(sql, (error, response) => {
      if (error) throw error;
      console.log("All Employees");
      promptChoices();
    });
  };

//functions to add departments
// write out inq prompt to ask whats the name of the department
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
//--------------------------------------------ADD---------------//add a new employee
const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'fistName',
      message: "What is the employee's first name?",
      validate: addFirstName => {
        if (addFirstName) {
            return true;
        } else {
            console.log('Please enter a first name');
            return false;
        }
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the employee's last name?",
      validate: addLastName => {
        if (addLastName) {
            return true;
        } else {
            console.log('Please enter a last name');
            return false;
        }
      }
    }
  ])
    .then(answer => {
    const given = [answer.fistName, answer.lastName]
    const roleSql = `SELECT role.id, role.title FROM role`;
    con.query(roleSql, (error, data) => {
      if (error) throw error; 
      const roles = data.map(({ id, title }) => ({ name: title, value: id }));
      inquirer.prompt([
            {
              type: 'list',
              name: 'role',
              message: "What is the employee's role?",
              choices: roles
            }
          ])
            .then(roleChoice => {
              const role = roleChoice.role;
              given.push(role);
              const managerSql =  `SELECT * FROM employee`;
              con.query(managerSql, (error, data) => {
                if (error) throw error;
                const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));
                inquirer.prompt([
                  {
                    type: 'list',
                    name: 'manager',
                    message: "Who is the employee's manager?",
                    choices: managers
                  }
                ])
                  .then(managerChoice => {
                    const manager = managerChoice.manager;
                    given.push(manager);
                    const sql =   `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                  VALUES (?, ?, ?, ?)`;
                    con.query(sql, given, (error) => {
                    if (error) throw error;
                    console.log("Employee has been added!")
                    viewAllEmployees();
              });
            });
          });
        });
     });
  });
};

