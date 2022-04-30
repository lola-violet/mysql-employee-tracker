// Variables for npm packages
const inquirer = require('inquirer');
const mysql = require('mySQL2');

// Port & app variables
// const PORT = process.env.PORT || 3000;
// const app = express();

// // Middleware for parsing data
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());


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

// Connect mySQL
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '396',
        database: 'company_db',
    },
    console.log('Successfully connected to the company_db database.')
);

// Initial question with menu options
function initMenu() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit'],
            name: 'menu'
        }
    ]).then(ans => {
        if (ans.menu === 'View All Departments') {
            viewDepartments();
        } else if (ans.menu === 'View All Roles') {
            viewRoles();
        } else if (ans.menu === 'View All Employees') {
            viewEmployees();
        } else if (ans.menu === 'Add a Department') {
            addDepartment();
        } else if (ans.menu === 'Add a Role') {
            addRole();
        } else if (ans.menu === 'Add an Employee') {
            addEmployee();
        } else if (ans.menu === 'Update an Employee Role') {
            updateEmployee();
        } else {
            process.exit();
        }
    })
}

// Function to view all departments
const viewDepartments = () => {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) {
            throw err;
        } else {
            console.table(results);
        }
    })
}
// Function to view all roles
const viewRoles = () => {
    db.query('SELECT * FROM role', function (err, results) {
        if (err) {
            throw err;
        } else {
            console.table(results);
        }
    })
}
// Function to view all employees
const viewEmployees = () => {
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) {
            throw err;
        } else {
            console.table(results);
        }
    })
}
// Function to add a department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the new department?',
            name: 'newDepartment',
        }
    ]).then(ans => {
        db.query('INSERT INTO department (name) VALUES (?)')
    })
}
// Function to add a role

// Function to add an employee
// Function to update an employees role