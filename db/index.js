const connection = require("./connection");

module.exports = {

    getDepartments() {

        return connection.query("SELECT * FROM department");

    },

    getRoles() {

        return connection.query("SELECT * FROM role");

    },

    getEmployees() {

        return connection.query("SELECT * FROM employee");

    },

    insertDepartment(data) {

        return connection.query("INSERT INTO department SET ?", data);

    },

    insertRole(data) {

        return connection.query("INSERT INTO role SET ?", data);

    },

    insertEmployee(data) {

        return connection.query("INSERT INTO employee SET ?", data);

    },

    updateEmployeeRole(data) {

        return connection.query("UPDATE employee SET ? WHERE ?", 
        [
            {
                role_id: data.role_id
            },
            {
                id: data.id
            }
        ]);

    },

    allEmployeeInfo() {
        
        return connection.query(`SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS employee_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON manager.id = employee.manager_id;`);
        
    },

    deleteEmployee(data) {

        return connection.query("DELETE FROM employee WHERE ?", 
        {id: data.id});
    }
}