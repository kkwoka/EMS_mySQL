var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "ClimbUSA007",
  database: "employeeTracker_db"
});

// --------------------------------------------

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
  selectDepartment();
  selectEmployee();
  selectRoles();
  // addDepartment();
  // addEmployee();
  // addRoles();
  updateEmployee();
});

function afterConnection() {
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  };