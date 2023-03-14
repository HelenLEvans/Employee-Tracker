const connection = require("./connection");
class Store {
  constructor(connection) {
    this.connection = connection;
  }
  // GET/read queries
  getAllDepartments() {
    return this.connection.promise().query("select * from department");
  }
  viewAllRoles() {
    return this.connection
      .promise()
      .query("SELECT id, title, salary, department_id FROM role");
  }
  viewAllEmployees() {
    return this.connection.promise().query("SELECT * FROM employee");
  }

  // POST/create queries
  createDepartment(department) {
    return this.connection
      .promise()
      .query("INSERT INTO department SET ?", department);
  }
  createRole(newRole) {
    return this.connection.promise().query("INSERT INTO role SET ?", newRole);
  }
  createEmployee() {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", employee);
  }

  // PUT/update queries
  updateEmployee() {
    return this.connection
      .promise()
      .query("UPDATE employee SET role_id = role_id WHERE first_name = name");
  }
  updateEmployeeRole(employeeId, newRoleId) {
    console.log("inside query");
    return this.connection
      .promise()
      .query("UPDATE employee SET role_id = ? WHERE id = ?", [
        newRoleId,
        employeeId,
      ]);
  }

  // DELETE/delete queries
  deleteDepartment(id) {
    return this.connection
      .promise()
      .query("DELETE FROM department WHERE id = ?", id);
  }
  deleteRole(id) {
    return this.connection.promise().query("DELETE FROM role WHERE id = ?", id);
  }
  deleteEmployee(id) {
    return this.connection
      .promise()
      .query("DELETE FROM employee WHERE id = ?", id);
  }
}

module.exports = new Store(connection);
