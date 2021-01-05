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

        return connection.query("UPDATE employee.role_id SET ? WHERE first_name = ?", data);

    },

    allEmployeeInfo() {

        let query = "SELECT employee.first_name, employee.last_name, employee.manager_id,role.title, role.salary, department.name";
        query += "FROM employee "
        
        // return connection.query("SELECT * FROM employee");
        
    }
}