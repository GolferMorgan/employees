const connections = require("./connections");

class DB {
  constructor(connections) {
    this.connections = connections;
  }
  // Create new employee
  createEmployee(employee) {
    return this.connections.promise().query("INSERT INTO employee SET ?", employee);
  }
  // find all employees   
  findAllEmployees() {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;"
    );
  }
  // update role
  updateEmployeeRole(employeeId, roleId) {
    return this.connections.promise().query(
      "Update employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId]
    );
  }
  // all roles
  findAllRoles() {
    return this.connections.promise().query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id;"
    );
  }
  // new role
  createRole(role) {
    return this.connections.promise().query("INSERT into roles SET?", role);
  }
  // all departments
  findAllDepartments() {
    return this.connections.promise().query("SELECT department.id, department.name FROM department;");
  }
  // new department
  createDepartment(department) {
    return this.connections.promise().query("INSERT into department SET?;", department);
  }
  // employees by department
  findAllEmployeesByDepartment(departmentId) {
    return this.connections.promise().query("SELECT employee.first_name, employee.last_name, role.title",departmentId);
  }
}

module.exports = new DB(connections);