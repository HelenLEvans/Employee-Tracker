const inquirer = require("inquirer");
const store = require("./db/index");
function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
          "View Departments",
          "View Role",
          "View Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee",
          "Quit",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case "View Departments":
          getAllDepartments();
          break;
        case "View Role":
          viewAllRoles();
          break;
        case "View Employees":
          viewAllEmployees();
          break;
        case "Add Department":
          createDepartment();
          break;
        case "Add Role":
          createRole();
          break;
        case "Add Employee":
          createEmployee();
          break;
        case "Update Employee":
          updateEmployeeRole();
          break;
        default:
        case "Quit":
          process.exit();
      }
    })
    .catch((err) => {
      console.error(err);
      process.exit();
    });
}
function getAllDepartments() {
  store.getAllDepartments().then(([departments]) => {
    console.table(departments);
    mainMenu();
  });
}
function viewAllRoles() {
  store.viewAllRoles().then(([roles]) => {
    console.table(roles);
    mainMenu();
  });
}
function viewAllEmployees() {
  store.viewAllEmployees().then(([employees]) => {
    console.table(employees);
    mainMenu();
  });
}
function createDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "Name of the new department?",
      },
    ])
    .then((res) => {
      let name = res;
      store.createDepartment(name);
    });
}
function createRole() {
  store.getAllDepartments().then(([departments]) => {
    const departmentChoices = departments.map((department) => {
      return {
        name: department.name,
        value: department.id,
      };
    });
    inquirer
      .prompt([
        {
          name: "title",
          message: "Role title?",
        },
        {
          name: "salary",
          message: "What is the salary?",
        },
        {
          type: "list",
          name: "department_id",
          message: "What is the department?",
          choices: departmentChoices,
        },
      ])
      .then((res) => {
        store.createRole(res);
      })
      .then(() => {
        console.log("role created!");
        mainMenu();
      });
  });
}
mainMenu();
