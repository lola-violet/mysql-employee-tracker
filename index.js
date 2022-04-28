const inquirer = require('inquirer');
const mysql = require('mySQL2');

const initQ = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
        name: 'action'
    }
]

const newDepartment = [
    {
        type: 'input',
        message: 'What is the name of the new department?',
        name: 'newDepart',
    }
]

const newRole = [
    {
        type: 'input',
        message: 'What is the name of the new role?',
        name: 'newRoleName',
    },{
        type: 'input',
        message: 'What is the salary?',
        name: 'newRoleSalary'
    },{
        type: 'input',
        // Maybe list?
        message: 'What department is it in?',
        name: 'newRoleDepart',
    }
]

const newEmployee = [
    {
        type: 'input',
        message: 'What is the new employees first name?',
        name: 'newEmpFirst',
    },{
        type: 'input',
        message: 'What is the new employees last name?',
        name: 'newEmpLast',
    },{
        type: 'input',
        // Maybe list?
        message: 'What is their role?',
        name: 'newEmpRole',
    },{
        type: 'input',
        // Maybe list?
        message: 'Who is their manager?',
        name: 'newEmpManager',
    }
]