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

                default:
                    connection.end();

            }
        })
}

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
        .getEmployees()
        .then((results) => {

            console.table(results);

            askForAction();

        });
}

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
        // .then(db.getEmployees())
        .then((roles) => {

            const roleChoices =
                roles.map((role) => ({
                    value: role.id,
                    name: role.title
                }))

            // const employeeChoices =
            //     employees.map((employee) => ({
            //         value: employee.id,
            //         name: employee.first_name
            //     }))

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
                    // {
                    //     message: "Who is their manager?",
                    //     name: "role_id",
                    //     type: "list",
                    //     choices: employeeChoices
                    // }
                ])
                // .then(res => {

                //     console.log(res);

                //     db.insertRole(res);

                //     console.log("Role was successfully created!");

                //     askForAction();

                // })

        });
}

askForAction();