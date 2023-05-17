const { prompt } = require('inquirer');
const db = require('./db');
const logo = require("asciiart-logo");

init();

function init() {
    const logoText = logo({ name: "Employee Tracker" }).render();
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
        case 'UPDATE_EMPLOYEE':
            viewUpdateEmployee();
            break;
    }
})
}