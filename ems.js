var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "ClimbUSA007",
  database: "employeeTracker_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
  selectDepartment();
  selectEmployee();
  selectRoles();
});

function afterConnection() {
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  };

// View departments
function selectDepartment() {
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].name)
    }
    console.log("----------------------");
  });
};

// View roles
function selectRoles() {
    connection.query("SELECT * FROM employeerole", function(err, res) {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].title + " | " + res[i].salary + " | " + res[i].department_id);
      }    
      console.log("----------------------");
    });
  };

// View employees
function selectEmployee() {
    connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].first_name + " | " + res[i].last_name + " | " + res[i].role_id + " | " + res[i].manager_id);
      }
      console.log("----------------------");
    });
  };

// function queryAllSongs() {
//   connection.query("Select * from products", function(err, res) {
//     if (err) throw err;
//     for (let i=0; i <res.length; i++) {
//       console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
//     }
//     console.log("----------------------");
//   })
// };

// function queryDanceSongs() {
//   connection.query("select * from products where ?", {"genre":"Dance"}, function(err, res) {
//     // Select *
//     // from products
//     // where genre = "Dance" 
//     // HOW IT LOOKS IN SEQUEL ^^^
//     if (err) throw err;
//     for (let i=0; i <res.length; i++) {
//       console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
//     };
//   });
//   console.log(query.sql);

// };
