-- View All Departments
SELECT 
    department.id AS ID, 
    department.name AS Department 
FROM department;

-- View All Roles
SELECT 
    role.id AS ID, 
    role.title AS Title, 
    department.name AS Department, 
    role.salary AS Salary
FROM role 
JOIN department ON role.department_id = department.id
ORDER BY role.id;

-- View All Employees
SELECT 
    a.id AS ID,
    CONCAT(a.first_name, " ", a.last_name) AS Employee, 
    role.title AS Title, 
    department.name AS Department,
    role.salary AS Salary,
    IFNULL(CONCAT(b.first_name, " ", b.last_name),"[None]") AS Manager
FROM employee a
LEFT JOIN employee b ON b.id = a.manager_id
JOIN role ON a.role_id = role.id
JOIN department ON role.department_id = department.id
ORDER BY a.id;


-- Add a Department
-- INSERT INTO department (name) VALUES (?)

-- Add a Role
-- INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)

-- Add an Employee
-- INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)

-- Update an Employee Role
-- UPDATE employee SET role_id = (?) WHERE id = (?)