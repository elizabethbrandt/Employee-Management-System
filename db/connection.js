const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employees_DB"

});

connection.connect((err) => {

    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

    askForAction();

});

connection.query = util.promisify(connection.query);

module.exports = connection;