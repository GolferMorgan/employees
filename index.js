const { prompts } = require('inquirer');
const db = require('./db');
const logo = require("asciiart-logo");

init();

function init() {
    const text = logo({ name: "Employee Tracker" }).render();
    mainPrompts();
  }

// main prompts to choose from
function mainPrompts() {
    prompts([
    {
        type: 'list',
        name: 'choice',
        message: 'What would you like to see?',
        choices: [
        {
            name: 'View all Employees',
            value: 'EMPLOYEES'
        },
        {
            name: 'View Employees by Department',
            value: 'EMPLOYEES_BY_DEPARTMENT'
        },
        {
            name: 'View All Roles',
            value: 'ROLES'
        },
        {
            name: 'Add a Department',
            value: 'ADD_DEPARTMENT'
        },
        {
            name: 'Add a Role',
            value: 'ADD_ROLE'
        },
        {
            name: 'Add an Employee',
            value: 'ADD_EMPLOYEE'
        },
        {
            name: 'Update and Employee Role',
            value: 'UPDATE_EMPLOYEE'
        }
      ]
    }
]).then(res => {
    let choice = res.choice;
    switch (choice) {
        case 'EMPLOYEES':
            viewEmployees();
            break;
        case 'EMPLOYEES_BY_DEPARTMENT':
            viewEmployeesByDepartment();
            break;
        case 'ROLES':
            viewRoles();
            break;
        case 'ADD_DEPARTMENT':
            viewAddDepartment();
            break;
        case 'ADD_ROLE':
            viewAddRole();
            break;
        case 'ADD_EMPLOYEE':
            viewAddEmployee();
            break;
        case 'UPDATE_EMPLOYEE_ROLE':
            viewUpdateEmployee();
            break;
    }
})
}

// employees function
function viewEmployees() {
    db.findAllEmployees()
    .then(([rows]) => {
        let employees = rows;
        console.table(employees);
    })
    .then((() => mainPrompts()));
}

// employees by department
function viewEmployeesByDepartment() {
    db.findAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        const departmentChoice = departments.map(({ id, name}) => ({
           name: name,
           value: id
        }));
        prompt([
            {
                type: 'list',
                name: 'departmentId',
                message: 'What department do you want to see all the employees for?',
                choices: departmentChoice
            }
        ])
        .then(res => db.findAllEmployeesByDepartment(res.departmentId))
        .then(([rows]) => {
            let employees = rows;
            console.table(employees);
        })
        .then(() => mainPrompts())
    });
}

// all roles
function viewRoles() {
    db.findAllRoles()
    .then(([rows]) => {
        let roles =rows;
        console.table(roles);
    })
    .then(() => mainPrompts());
}

// add department
function viewAddDepartment() {
    prompt([
        {
            name: 'name',
            message: 'What is the department name?'
        }
    ])
    .then(res => {
        let name = res;
        db.createDepartment(name)
        .then(() => mainPrompts)
    })
}

// add role
function viewAddRole() {
    db.findAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        const departmentChoice = departments.map(({ id, name}) => ({
            name: name,
            value: id
        }));
        prompt([
            {
                name: 'title',
                message: 'What role would you like to add?'
            },
            {
                type: "list",
                name: "department_id",
                message: "Which department does the role belong to?",
                choices: departmentChoice
            }
        ])
        .then(role => {
            db.createRole(role)
            .then(() => mainPrompts())
        })
    })
}

// add employee
function viewAddEmployee() {
    prompt([
      {
        name: "first_name",
        message: "What is the employee's first name?"
      },
      {
        name: "last_name",
        message: "What is the employee's last name?"
      }
    ])
      .then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;
        db.findAllRoles()
          .then(([rows]) => {
            let roles = rows;
            const roleChoice = roles.map(({ id, title }) => ({
              name: title,
              value: id
            }));
            prompt({
              type: "list",
              name: "roleId",
              message: "What is the employee's role?",
              choices: roleChoice
            })
            db.createEmployee(employee);
            })
            .then(() => console.log(`Added ${firstName} ${lastName} to the database`))
            .then(() => mainPrompts())
         })
       }


// update employee role
function viewUpdateEmployee() {
    db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoice = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));

      prompt([
        {
          type: "list",
          name: "id",
          message: "Which employee role would you like to update?",
          choices: employeeChoice
        }
      ])
        .then(res => {
          let employeeId = res.employeeId;
          db.findAllRoles()
            .then(([rows]) => {
              let roles = rows;
              const roleChoice = roles.map(({ id, title }) => ({
                name: title,
                value: id
              }));

              prompt([
                {
                  type: "list",
                  name: "id",
                  message: "What role do you want the employee to have?",
                  choices: roleChoice
                }
              ])
                .then(res => db.updateEmployeeRole(employeeId, res.roleId))
                .then(() => mainPrompts())
            });
        });
    })
}
