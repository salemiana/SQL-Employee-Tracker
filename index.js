//const fs = require("fs");
const inquirer = require("inquirer");
const tables = require("console.table");
// const db = require("/db");
const con = require("./config/server.js");
// con.query(`SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id"
// FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id`, (err, res) => {
//   console.log(res);
// });
// ----------------------------------------------------------------------
//                                VIEW
//-----------------------------------------------------------------------

// start of manager prompts

const promptChoices = () => {
  //return (
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "Please choose an option",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
          "exit",
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
      if (choices === "update an employee role") {
        return updateRole();
      }
      if (choices === "Exit") {
        connection.end();
      }
    });
};

//choiceArray.push(department);

//functions to view departments
const viewAllDepartments = () => {
  const sql = `SELECT id AS id, name AS department FROM department`;
  con.query(sql, (error, res) => {
    if (error) throw error;
    console.log(`All Departments`);
    console.table(res);
    promptChoices();
  });
};

// WHEN I choose to view all roles title, salary, department_id
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
const viewAllRoles = () => {
  const sql = `SELECT role.id, role.title, department.name AS department
    FROM role
    INNER JOIN department ON role.department_id = department.id`;
  con.query(sql, (error, response) => {
    if (error) throw error;
    response.forEach((role) => {
      console.log(role.title);
    });
    promptChoices();
  });
};

//functions to view employees first_name, last_name, role_id, manager_id
const viewAllEmployees = () => {
  const sql = `SELECT employee.id, 
    employee.first_name, 
    employee.last_name, 
    role.title, 
    department.name AS 'department', 
    role.salary
    FROM employee, role, department 
    WHERE department.id = role.department_id 
    AND role.id = employee.role_id
    ORDER BY employee.id ASC`;
  con.query(sql, (error, response) => {
    if (error) throw error;
    console.log("All Employees");
    console.table(response);
    promptChoices();
  });
};
promptChoices();
// ----------------------------------------------------------------------
//                                ADD
//-----------------------------------------------------------------------
// functions to add departments
// write out inq prompt to ask whats the name of the department
// youll use the .then and assign there answer
// write sql query to inserts into department table on department name with value(?)
// call function view all departments
// console log your steps to see whats going on
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
      const sql = `INSERT INTO department (name) VALUES (?)`;
      con.query(sql, answer.newDept, (error) => {
        if (error) throw error;
        console.log("viewAllDepartments");

        viewAllDepartments();
        //promptChoices();
      });
    });
};

// Add a New Role
const addRole = () => {
  const sql = `SELECT * FROM department;`;
  con.query(sql, (error, response) => {
    if (error) throw error;
    let deptNameArray = [];
    //console.log(response);
    response.forEach((department) => {
      deptNameArray.push(department.name);
    });
    inquirer
      .prompt([
        {
          name: "newRole",
          type: "input",
          message: "What is the name of your new role?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of this new role?",
        },
        {
          name: "deptName",
          type: "list",
          message: "Which department is this new role in?",
          choices: deptNameArray,
        },
      ])

      //loop through choices: deptNameArray
      //store in var
      //use var in sql call after WHERE name
      // let deptNameArray = [];
      // for (let i = 0; i < arr.length; i++) {
      //   console.log(arr[i]);
      // }
      .then((answer) => {
        let deptName = deptNameArray.indexOf(answer.deptName) + 1;
        const sql = `INSERT INTO role (title, salary, department_id) 
          VALUES ("${answer.newRole}", "${answer.salary}", "${deptName}")`;

        con.query(sql, (error, response) => {
          console.log(response);
          if (error) throw error;
          console.log(`Role successfully created!`);
          viewAllRoles();
        });
      });
  });
};

//add a new employee
const addEmployee = () => {
  const sql = `SELECT role.id, role.title FROM role`;
  con.query(sql, (error, response) => {
    if (error) throw error;
    let roleNameArray = [];
    response.forEach((role) => {
      roleNameArray.push(role.title);
    });
    console.log(roleNameArray);
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the employee's first name?",
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the employee's last name?",
        },
        {
          type: "list",
          name: "roleName",
          message: "What is the employee's role?",
          choices: roleNameArray,
        },
      ])

      .then((answer) => {
        let roleName =
          roleNameArray.indexOf(answer.firstName + "" + answer.lastName) + 1;
        const sql = `INSERT INTO employee (first_name, last_name, role_id) 
        VALUES ("${answer.firstName}", "${answer.lastName}", "${roleName}")`;

        con.query(sql, (error, response) => {
          console.log(response);
          if (error) throw error;
          console.log(`Employee Added!`);
          viewAllEmployees();
        });
      });
  });
};

// ----------------------------------------------------------------------
//                                UPDATE
//-----------------------------------------------------------------------

// Update an Employee's Role
const updateRole = () => {

  console.log("clicked")
  let sql = `SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id"
                    FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id`;
  con.query(sql, (error, response) => {
    if (error) throw error;
    let employeeNamesArray = [];
    response.forEach((employee) => {
      employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);
    });

    let pickles = `SELECT role.id, role.title FROM role`;
    con.query(pickles, (error, response) => {
      if (error) throw error;
      let rolesArray = [];
      response.forEach((role) => {
        rolesArray.push(role.title);
      });

      inquirer
        .prompt([
          {
            name: "chosenEmployee",
            type: "list",
            message: "Which employee has a new role?",
            choices: employeeNamesArray,
          },
          {
            name: "chosenRole",
            type: "list",
            message: "What is their new role?",
            choices: rolesArray,
          },
        ])
        .then((answer) => {
          let newTitleId, employeeId;

          response.forEach((role) => {
            if (answer.chosenRole === role.title) {
              newTitleId = role.id;
            }
          });

          response.forEach((employee) => {
            if (
              answer.chosenEmployee ===
              `${employee.first_name} ${employee.last_name}`
            ) {
              employeeId = employee.id;
            }
          });

          let tony = `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
          con.query(tony, [newTitleId, employeeId], (error) => {
            if (error) throw error;
            console.log(`Employee Role Updated`);
            promptChoices();
          });
        });
    });
   });
};
