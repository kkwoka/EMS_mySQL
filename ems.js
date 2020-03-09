var mysql = require("mysql");
let inquirer = require("inquirer");

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
  questionsPrompt();
});

// PROMPTS SECTION:
// -------------------------------------------------------
function questionsPrompt() {
  return inquirer
  .prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'Add Department',
        'Add Role',
        'Add Employee', 
        'View All Employees', 
        'View All Departments', 
        'View All Roles', 
        'Update Employee Role'
      ]
    }
  ])
  .then(function(answers) {
    switch (answers.action) {
      case 'Add Department':
      addDepartment();
      break;

      case 'Add Role':
      addRoles();
      break;

      case 'Add Employee':
      addEmployee();
      break;

      case 'View All Employees':
      selectEmployee();
      // this works!
      break;

      case 'View All Departments':
      selectDepartment();
      // this works!
      break;

      case 'View All Roles':
      selectRoles();
      // this works!
      break;

      case 'Update Employee Role':
      updateEmployee();
      break;
    }
  });
};

// VIEW SECTION:
// -------------------------------------------------------
// View departments
function selectDepartment() {
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
        console.table(res[i].department_id + " | " + res[i].name)
    }
    console.log("----------------------");
    questionsPrompt();
  });
};

// View roles
function selectRoles() {
    connection.query("SELECT * FROM employeerole", function(err, res) {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        console.table(res[i].role_id + " | " + res[i].title + " | " + res[i].salary + " | " + res[i].department_id);
      }    
      console.log("----------------------");
      questionsPrompt();
    });
  };

// View employees
function selectEmployee() {
    connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, employeeRole.title," +
      "department.name, employeerole.salary FROM employee left join employeerole on employee.role_id = employeerole.role_id " +
      "left join department on employeerole.department_id = department.department_id order by employee.id;", function(err, res) {

      if (err) throw err;
      console.table(res);
      
      console.log("----------------------");
      questionsPrompt();
    });
  };


// ADD SECTION:
// -------------------------------------------------------
// Add departments
function addDepartment() {
  console.log("Adding department... \n");
  inquirer.prompt([
    {
      type: 'input',
      name: 'addDepartment',
      message: 'What department would you like to add?'
    }
  ]).then(function(answer) {
    let query = connection.query(
      `INSERT INTO department SET ${answer}`,
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows = `${answer} department inserted!\n`);
      });
    });
    console.log(query.sql);  
};

// Add roles
function addRoles() {
  console.log("Adding roles... \n");
  let query = connection.query(
    "INSERT INTO employeerole SET ?",
    {
      title: "Secretary",
      salary: 65000.00,
      department_id: 4
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows = " role inserted!\n");
    }
  );
  console.log(query.sql);
}

// Add employees
function addEmployee() {
  console.log("Adding employee... \n");
  let query = connection.query(
    "INSERT INTO employee SET ?",
    {
      first_name: "Jessie",
      last_name: "Jones",
      role_id: 10,
      manager_id: 32
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows = " employee inserted!\n");
    }
  );
  console.log(query.sql);
}

// UPDATE SECTION:
// -------------------------------------------------------
// update Employee Roles
function updateEmployee() {
  console.log("Updating Employee... \n");
  let query = connection.query(
    "Update employeerole set ? where?",
    [
      {
        title: "IT"
      },
      {
        department_id: 5
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " employee role updated!\n");
    }
  );
  console.log(query.sql);
}




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
