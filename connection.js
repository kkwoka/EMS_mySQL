var mysql = require("mysql");
const Ems = require("./ems");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "ClimbUSA007",
  database: "employeeTracker_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  // questionsPrompt();
});

module.exports = connection;
