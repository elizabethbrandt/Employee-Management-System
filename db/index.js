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

    }
}