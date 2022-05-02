# MySQL Employee Tracker
![license_badge](https://img.shields.io/badge/license-MIT-blueviolet)


## Description
A command-line application which uses mySQL & NPM Inquirer to help the user track company information, such as departments, roles, and employees. Users can view all departments, view all roles, view all employees, add a new department, add a new role, add a new employee, and update an existing employee's role.

---

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Questions](#questions)

---

## Installation 
Before installing, please make sure you have node.js installed locally. If you don't already have node.js, you can download it via their [website](https://nodejs.dev/). 

After cloning this repo, open the integrated terminal in VS Code & install the necessary npm packages. A package.json file already exists with listed dependencies, so you can simply enter "npm install" to acquire the packages. 

Next, you'll need to use mySQL to create & fill the database. Open the integrated terminal via the schema.sql file and enter "mysql -u root -p" & enter the password (listed on index.js file). Now that you're connected, run the following two commands to create & fill the database: "SOURCE schema.sql;" then "SOURCE seeds.sql;". 

Next, return to the integrated terminal where you installed the npm packages and enter "npm start" to run the application. 

---

## Usage
Once you've installed the necessary packages & created the mySQL database, you can begin to use the application. To start, enter "npm start" in the integrated terminal. You will be prompted with a list of actions to choose from. After each selection, you'll return to the initial start menu. To exit the application, select the "exit" option. Each menu selection will perform the following actions:

#### View All Departments
This selection will present a table showing all current departments & their associated IDs.

#### View All Roles
This selection will present a table showing all current role titles, their associated IDs, the department they belong to, and their salary. 

#### View All Employees
This selection will present a table showing all current employees, their associated IDs, their titles, departments, salaries, and managers. 

#### Add a Department
This selection will prompt you to enter the name of the new department, and then add it to the database. 

#### Add a Role
This selection will prompt you to enter the title of the role, select the department the role is in, and enter the role's salary. It will then be added to the database.

#### Add an Employee
This selection will prompt you to enter the first & last name of the new employee, select their role, and select their manager. They will then be added to the database.

#### Update an Employee Role
This selection will prompt you to select which employee to update & then select their new role. The database will then be updated with the new information. 

---

## License
This project is licenced by [MIT](https://choosealicense.com/licenses/mit/).

---

## Contributing
If you'd like to contribute, please contact me via the email listed below. 

---

## Questions
View all of my projects on [GitHub](https://github.com/lola-violet).

If you have any questions or want to contribute, please contact me via email at [lolaviolet.dev@gmail.com](mailto:lolaviolet.dev@gmail.com).