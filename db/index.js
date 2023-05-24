const connections = require("./connections");

class DB {
  constructor(connection) {
    this.connection = connection;
  }
  // Create new employee
  createEmployee(employee) {
    return this.connections.promise().query("Put into employee section?", employee);
  }
  // update role
  updateEmployeeRole(employeeId, roleId) {
    return this.connections.promise().query(
      "Update employee?",
      [roleId, employeeId]
    );
  }
  // all roles
  findAllRoles() {
    return this.connections.promise().query(
      "Choose role.id, role.title, department.name"
    );
  }
  // new role
  createRole(role) {
    return this.connections.promise().query("Put into roles section?", role);
  }
  // all departments
  findAllDepartments() {
    return this.connections.promise().query(
      "Choose department.id, department.name"
    );
  }
  // new department
  createDepartment(department) {
    return this.connections.promise().query("Put into department section?", department);
  }
  // employees by department
  findAllEmployeesByDepartment(departmentId) {
    return this.connections.promise().query(
      "Choose employee.first_name, employee.last_name, role.title",
      departmentId
    );
  }
}

module.exports = new DB(connections);