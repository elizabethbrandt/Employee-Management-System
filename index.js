const inquirer = require("inquirer");
const db = require("./db");
const connection = require("./db/connection")


function askForAction() {

    inquirer
        .prompt({
            message: "Choose what you would like to do",
            name: "action",
            type: "list",
            choices: [
                "VIEW_DEPARTMENTS",
                "VIEW_ROLES",
                "VIEW_EMPLOYEES",
                "CREATE_ROLE",
                "CREATE_DEPARTMENT",
                "CREATE_EMPLOYEE",
                "UPDATE_EMPLOYEE_ROLE",
                "DELETE_EMPLOYEE",
                "DELETE_ROLE",
                "DELETE_DEPARTMENT",
                "QUIT"
            ]
        })
        .then((res) => {

            switch (res.action) {

                case "VIEW_DEPARTMENTS":
                    viewDepartments();
                    return;

                case "VIEW_ROLES":
                    viewRoles();
                    return;

                case "VIEW_EMPLOYEES":
                    viewEmployees();
                    return;

                case "CREATE_ROLE":
                    createRole();
                    return;

                case "CREATE_DEPARTMENT":
                    createDepartment();
                    return;

                case "CREATE_EMPLOYEE":
                    createEmployee();
                    return;

                case "UPDATE_EMPLOYEE_ROLE":
                    updateRoleForEmployee();
                    return;

                case "DELETE_EMPLOYEE":
                    removeEmployee();
                    return;

                case "DELETE_ROLE":
                    removeRole();
                    return;

                case "DELETE_DEPARTMENT":
                    removeDepartment();
                    return;

                default:
                    connection.end();

            }
        })
}

// VIEW FUNCTIONS

function viewDepartments() {

    db
        .getDepartments()
        .then((results) => {

            console.table(results);

            askForAction();

        });
}

function viewRoles() {

    db
        .getRoles()
        .then((results) => {

            console.table(results);

            askForAction();

        });
}

function viewEmployees() {

    db
        .allEmployeeInfo()
        .then((results) => {

            console.table(results);

            askForAction();

        });
}

// CREATE FUNCTIONS

function createDepartment() {

    inquirer
        .prompt({
            message: "What is the name of the department?",
            name: "name",
            type: "input"
        })
        .then(res => {

            console.log(res);

            db.insertDepartment(res);

            console.log("Department was successfully created!");

            askForAction();

        })
}

function createRole() {

    db
        .getDepartments()
        .then((departments) => {

            const departmentChoices =
                departments.map((department) => ({
                    value: department.id,
                    name: department.name
                }))

            inquirer
                .prompt([
                    {
                        message: "What is the job title?",
                        name: "title",
                        type: "input"
                    },
                    {
                        message: "What is their salary?",
                        name: "salary",
                        type: "input",
                        validate: function (value) {
                            if (isNaN(value) === false) {
                                return true;
                            }
                            console.log("Your entry was not a valid number");
                            return false;
                        }
                    },
                    {
                        message: "What department is this role a part of?",
                        name: "department_id",
                        type: "list",
                        choices: departmentChoices
                    }
                ])
                .then(res => {

                    console.log(res);

                    db.insertRole(res);

                    console.log("Role was successfully created!");

                    askForAction();

                })

        });
}

function createEmployee() {

    db
        .getRoles()
        .then((roles) => {

            const roleChoices =
                roles.map((role) => ({
                    value: role.id,
                    name: role.title
                }))

            db.getEmployees()

            .then(employees => {
                const employeeChoices =
                    employees.map((employee) => ({
                        value: employee.id,
                        name: `${employee.first_name} ${employee.last_name}`
                    }))

            inquirer
                .prompt([
                    {
                        message: "What is the employee's FIRST name?",
                        name: "first_name",
                        type: "input"
                    },
                    {
                        message: "What is the employee's LAST name?",
                        name: "last_name",
                        type: "input",
                    },
                    {
                        message: "What is their role?",
                        name: "role_id",
                        type: "list",
                        choices: roleChoices
                    },
                    {
                        message: "Would you like to add a manager?",
                        name: "manager",
                        type: "confirm",
                    },
                    {
                        message: "Who is their manager?",
                        name: "manager_id",
                        type: "list",
                        choices: employeeChoices,
                        when: (answers) => answers.manager === true
                    }
                ])
                .then(res => {

                    console.log(res);

                    const {first_name, last_name, role_id, manager_id} = res

                    const employeeData = {first_name, last_name, role_id, manager_id}

                    db.insertEmployee(employeeData);

                    console.log("Employee was successfully created!");

                    askForAction();

                })
            })
        });
}

// UPDATE FUNCTION

function updateRoleForEmployee() {

    db
        .getRoles()
        .then((roles) => {

            const roleChoices =
                roles.map((role) => ({
                    value: role.id,
                    name: role.title
                }))

            db.getEmployees()

            .then(employees => {
                const employeeChoices =
                    employees.map((employee) => ({
                        value: employee.id,
                        name: `${employee.first_name} ${employee.last_name}`
                    }))

            inquirer
                .prompt([
                    {
                        message: "Which employee would you like to update?",
                        name: "id",
                        type: "list",
                        choices: employeeChoices
                    },
                    {
                        message: "What is their new role?",
                        name: "role_id",
                        type: "list",
                        choices: roleChoices
                    }
                ])

                .then((res) => {

                    console.log(res);

                    db.updateEmployeeRole(res);

                    console.table(res);

                    askForAction();

                });
        })

    });
}

function removeEmployee() {

    db
        .getEmployees()

        .then(employees => {
            const employeeChoices =
                employees.map((employee) => ({
                    value: employee.id,
                    name: `${employee.first_name} ${employee.last_name}`
                }))

        inquirer
            .prompt([
                {
                    message: "Which employee would you like to delete?",
                    name: "id",
                    type: "list",
                    choices: employeeChoices,
                }
            ])
            .then(res => {

                console.log(res);

                db.deleteEmployee(res);

                console.log("Employee was successfully deleted!");

                askForAction();

            })
        })
}

function removeRole() {

    db
        .getRoles()
        .then((roles) => {

            const roleChoices =
                roles.map((role) => ({
                    value: role.id,
                    name: role.title
                }))

            inquirer
                .prompt([
                    {
                        message: "Which role would you like to delete?",
                        name: "id",
                        type: "list",
                        choices: roleChoices
                    }

                ])
                .then(res => {

                    console.log(res);

                    db.deleteRole(res);

                    console.log("Role was successfully deleted!");

                    askForAction();

                })
    
        });
}

function removeDepartment() {

    db
        .getDepartments()
        .then((departments) => {

            const departmentChoices =
                departments.map((department) => ({
                    value: department.id,
                    name: department.name
                }))

            inquirer
                .prompt(
                    {
                        message: "Which department would you like to delete?",
                        name: "id",
                        type: "list",
                        choices: departmentChoices
                    }
                )
                .then(res => {

                    console.log(res);

                    db.deleteDepartment(res);

                    console.log("Department was successfully deleted!");

                    askForAction();

                })

        });
}

askForAction();