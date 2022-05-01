// Variables for npm packages
const inquirer = require('inquirer');
const mysql = require('mySQL2');

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

// Calling initial start menu
initMenu();

// Initial question with menu options
function initMenu() {
    inquirer.prompt([
        {
            type: 'rawlist',
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
    const command = 'SELECT department.id AS ID, department.name AS Department FROM department';
    db.query(command, function (err, results) {
        if (err) {
            throw err;
        } else {
            console.table(results);
            initMenu();
        }
    })
}
// Function to view all roles
const viewRoles = () => {
    const command = 'SELECT role.id AS ID, role.title AS Title, department.name AS Department, role.salary AS Salary FROM role JOIN department ON role.department_id = department.id ORDER BY role.id'
    db.query(command, function (err, results) {
        if (err) {
            throw err;
        } else {
            console.table(results);
            initMenu();
        }
    })
}
// Function to view all employees
const viewEmployees = () => {
    const command = 'SELECT a.id AS ID, CONCAT(a.first_name, " ", a.last_name) AS Employee, role.title AS Title, department.name AS Department, role.salary AS Salary, IFNULL(CONCAT(b.first_name, " ", b.last_name),"[None]") AS Manager FROM employee a LEFT JOIN employee b ON b.id = a.manager_id JOIN role ON a.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY a.id'
    db.query(command, function (err, results) {
        if (err) {
            throw err;
        } else {
            console.table(results);
            initMenu();
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
        const input = ans.newDepartment;
        db.query('INSERT INTO department (name) VALUES (?)', input, (err, data)=>{
            if (err) {
                throw err;
            }
            console.log("New department successfully added.");
            initMenu();
        })
    })
}



// Promise to list departments for inquirer prompt
const listDepartments = () => {
    return new Promise((resolve, reject) => {
        var departmentArr = [];
        db.query('SELECT * FROM department', (err, data) => {
            if (err) reject(err);
            for (let i = 0; i < data.length; i++) {
                departmentArr.push(data[i].name);
            }
            resolve(departmentArr);
        })
    })
}

// Promise to list role titles for inquirer prompt
const listRoles = () => {
    return new Promise((resolve, reject) => {
        var roleArr = [];
        db.query('SELECT * FROM role', (err, data) => {
            if (err) reject(err);
            for (let i = 0; i < data.length; i++) {
                roleArr.push(data[i].title);
            }
            resolve(roleArr);
        })
    })
}

// Promise to list possible managers for inquirer prompt
const listEmployees = () => {
    return new Promise((resolve, reject) => {
        var employeeArr = [];
        db.query('SELECT * FROM employee', (err, data) => {
            if (err) reject(err);
            for (let i = 0; i < data.length; i++) {
                employeeArr.push(data[i].first_name + ' ' + data[i].last_name);
            }
            resolve(employeeArr);
        })
    })
}

// Promise to find department ID from name chosen
const getDepartmentId = (input) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id FROM department WHERE name = (?)', [input], (err, ans) => {
            if (err) reject(err);
            const newDeptId = ans[0].id;
            resolve(newDeptId);
        })    
    })
}

// Promise to find role id from title chosen
const getRoleId = (input) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id FROM role WHERE title = (?)', [input], (err, ans) => {
            if (err) reject(err);
            const newRoleId = ans[0].id;
            resolve(newRoleId);
        })    
    })
}

// Promise to find employee id from manager chosen
const getEmployeeId = (input) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id FROM employee WHERE first_name = (?) AND last_name = (?)', [input.split(" ")[0], input.split(" ")[1]], (err, ans) => {
            if (err) reject(err);
            const newEmployeeId = ans[0].id;
            resolve(newEmployeeId);
        })    
    })
}

// Function to add a role
async function addRole() {
    const deptList = await listDepartments();
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the new role?',
            name: 'newRoleName',
        },{
            type: 'input',
            message: 'What is the salary?',
            name: 'newRoleSalary'
        },{
            type: 'rawlist',
            message: 'What department is it in?',
            choices: deptList,
            name: 'newRoleDepart',
        }
    ])
    .then(async (data) => {
        const newDeptId = await getDepartmentId(data.newRoleDepart);
        db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [data.newRoleName, data.newRoleSalary, newDeptId], (err, ans) => {
            if (err) throw err;
            console.log("New role successfully added.");
            initMenu();
        })
    })
}

// Function to add an employee
async function addEmployee() {
    const roleList = await listRoles();
    const employeeList = await listEmployees();
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the new employees first name?',
            name: 'newEmpFirst',
        },{
            type: 'input',
            message: 'What is the new employees last name?',
            name: 'newEmpLast',
        },{
            type: 'rawlist',
            message: 'What is their role?',
            choices: roleList,
            name: 'newEmpRole',
        },{
            type: 'rawlist',
            message: 'Who is their manager?',
            choices: employeeList,
            name: 'newEmpManager',
        }
    ]).then(async (data) => {
        const newRoleId = await getRoleId(data.newEmpRole);
        const newManagerId = await getEmployeeId(data.newEmpManager);
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [data.newEmpFirst, data.newEmpLast, newRoleId, newManagerId], (err, ans) => {
            if (err) throw err;
            console.log("New employee successfully added.");
            initMenu();
        })
        
    })
}

// Function to update an employees role
async function updateEmployee() {
    const employeeList = await listEmployees();
    const roleList = await listRoles();
    inquirer.prompt([
        {
            type: 'rawlist',
            message: 'Which employees role would you like to update?',
            choices: employeeList,
            name: 'chosenEmployee'
        },{
            type: 'rawlist',
            message: 'What is their new role?',
            choices: roleList,
            name: 'newRole'
        }
    ]).then(async (data) => {
        const empId = await getEmployeeId(data.chosenEmployee);
        const newRole = await getRoleId(data.newRole);
        db.query('UPDATE employee SET role_id = (?) WHERE id = (?)', [newRole, empId], (err, ans) => {
            if (err) throw err;
            console.log("Employee role successfully updated.");
            initMenu();
        })
    })
}