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

function createEmployee() {
  store.viewAllRoles().then(([roles]) => {
    const roleChoices = roles.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });

    // store.getAllDepartments().then(([departments]) => {
    //   const departmentChoices = departments.map((department) => {
    //     return {
    //       name: department.name,
    //       value: department.id,
    //     };
    //   });

    store.viewAllEmployees().then(([employees]) => {
      const managerChoices = employees.map((employee) => {
        return {
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        };
      });
      inquirer
        .prompt([
          {
            name: "first_name",
            message: "First name?",
          },
          {
            name: "last_name",
            message: "Last name?",
          },
          {
            name: "role_id",
            type: "list",
            message: "Employee's role?",
            choices: roleChoices,
          },
          {
            name: "manager_id",
            type: "list",
            message: "Employee's manager?",
            choices: managerChoices,
          },
        ])
        .then((answers) => {
          store.createEmployee(answers).then(() => {
            console.log(
              `${answers.first_name} ${answers.last_name} added to the database!`
            );
            mainMenu();
          });
        });
    });
  });
  // });
}

//   }
// ])
// .then((res) => {
//   let firstName = res.first_name;
//   let lastName = res.last_name;

//   })

//   inquirer
//   .prompt({
//
//   })
//   .then((res) => {
//     let roleId = res.role_id;
//     managerChoices.unshift({ name: "None", value: null });

//     inquirer
//     .prompt({
//
//     .then((res) => {
//       let employee = {
//         first_name: firstName,
//         last_name: lastName,
//         role_id: roleId,
//         manager_id: res.manager_id,
//         is_manager: 0
//       };

//       utilQueries.createEmployee(employee);
//     })
//     .then(() =>
//       console.log(`\n ${firstName} ${lastName} has been added! \n`)
//     )
//     .then(() => startApp());
//   })
// })

function updateEmployeeRole() {
  store.viewAllEmployees().then(([employees]) => {
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    store.viewAllRoles().then(([roles]) => {
      const roleChoices = roles.map(({ title, id }) => ({
        name: title,
        value: id,
      }));

      inquirer
        .prompt([
          {
            name: "employeeId",
            type: "list",
            message: "Select an employee",
            choices: employeeChoices,
          },
          {
            name: "roleId",
            type: "list",
            message: "New role name?",
            choices: roleChoices,
          },
        ])
        .then((answers) => {
          store
            .updateEmployeeRole(answers.employeeId, answers.roleId)
            .then(() => {
              console.log("Employee role updated!");
              mainMenu();
            });
        });
    });
  });
}

//       .then((res) => {
//         let employeeId = res.employeeId;
//         utilQueries.viewAllRoles().then(([rows]) => {
//           let roles = rows;
//           const roleChoices = roles.map(({ id, title }) => ({
//             name: title,
//             value: id,
//           }));

//           inquirer
//             .prompt([
//
//             ])
//             .then((res) =>
//               utilQueries.updateEmployeeRole(employeeId, res.roleId)
//             )
//             .then(() => console.log("The role has been updated"))
//             .then(() => startApp());
//         });
//       });
//   });
// }

function quit() {
  process.exit();
}
mainMenu();
