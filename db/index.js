const connection = require("./connection");
class Store {
  constructor(connection) {
    this.connection = connection;
  }
  // GET/read queries
  getAllDepartments() {
    return this.connection.query("select * from department");
  }
  viewAllRoles() {
    return this.connection.query(
      "SELECT id, title, salary, department_id AS role FROM company_roles"
    );
  }
  viewAllEmployees() {
    return this.connection.query("SELECT * FROM company_employees");
  }

  // POST/create queries
  createDepartment(department) {
    return this.connection.query(
      "INSERT INTO company_departments SET ?",
      department
    );
  }
  createRole(newRole) {
    return this.connection.query("INSERT INTO company_roles SET ?", newRole);
  }
  createEmployee() {
    return this.connection.query(
      "INSERT INTO company_employees SET ?",
      employee
    );
  }

  // PUT/update queries
  updateEmployee() {
    return this.connection.query(
      "UPDATE company_employees SET role_id = role_id WHERE first_name = name"
    );
  }
  updateEmployeeRole(employeeId, newRoleId) {
    console.log("inside query");
    return this.connection.query(
      "UPDATE company_employees SET role_id = ? WHERE id = ?",
      [newRoleId, employeeId]
    );
  }

  // DELETE/delete queries
  deleteDepartment(id) {
    return this.connection.query(
      "DELETE FROM company_departments WHERE id = ?",
      id
    );
  }
  deleteRole(id) {
    return this.connection.query("DELETE FROM company_roles WHERE id = ?", id);
  }
  deleteEmployee(id) {
    return this.connection.query(
      "DELETE FROM company_employees WHERE id = ?",
      id
    );
  }
}

module.exports = new Store(connection);
