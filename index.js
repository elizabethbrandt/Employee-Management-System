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
                "QUIT"
            ]
        })
        .then((res) => {

            switch(res.action) {

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

// function createRole() {

//     db
//         .getDepartments()
//         .then((departments) => {

//             const departmentChoices = 
//                 departments.map((department) => ({
//                     value: department.id,
//                     name: department.name
//                 }))

//             inquirer
//                 .prompt([
//                     {
//                         message: "What department is this role a part of?",
//                         name: "department_id",
//                         type: "list",
//                         choices: departmentChoices
//                     },
//                 ])
//                 .then(res => {

//                     console.log(res);

//                 })
            
//         });
// }

askForAction();