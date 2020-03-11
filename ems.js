const connection = require("./connection");
let inquirer = require("inquirer");
let allEmployeeData

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
        'Update Employee Role',
        'Finish'
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
      break;

      case 'View All Departments':
      selectDepartment();
      break;

      case 'View All Roles':
      selectRoles();
      break;

      case 'Update Employee Role':
      updateEmployee();
      break;

      case 'Finish':
      finish();
      break;
    }
  });
};

function selectDepartment() {
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    console.table(res)
    questionsPrompt();
  });
};

function selectRoles() {
  connection.query("SELECT * FROM employeerole", function(err, res) {
    if (err) throw err;
    console.table(res);
    questionsPrompt();
  });
};

function selectEmployee() {
  connection.query(
    'SELECT employeeRole.role_id, employee.first_name, employee.last_name, employeeRole.title, department.name, employeerole.salary ' +
    'FROM employee ' +
    'left join employeerole on employee.id = employeerole.role_id ' +
    'left join department on employeerole.department_id = department.department_id ' +
    'order by employee.id',


    // "SELECT employee.id, employee.first_name, employee.last_name, employeeRole.title," +
    // "department.name, employeerole.salary FROM employee left join employeerole on employee.role_id = employeerole.role_id " +
    // "left join department on employeerole.department_id = department.department_id order by employee.id;", 
    function(err, res) {
    if (err) throw err;
    console.table(res);
    questionsPrompt();
  });
};

function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'addDepartment',
      message: 'What department would you like to add?'
    }
  ]).then(function(answer) {
    let query = connection.query(
      `INSERT INTO department (name) value ('${answer.addDepartment}')`,
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows = `${answer.addDepartment} department inserted!\n`);
      });
      console.log(query.sql);  
      questionsPrompt();
    });
};

function addRoles() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'addTitle',
      message: 'What is the title of the role you would like to add?'
    },
    {
      type: 'input',
      name: 'addSalary',
      message: 'What is the salary of the role you would like to add?'
    },
    {
      type: 'input',
      name: 'addDepartmentId',
      message: 'What is the department ID of the role you would like to add?'
    }
  ]).then(function(answer) {
    let query = connection.query(
      `INSERT INTO employeerole (title, salary, department_id) value ('${answer.addTitle}','${answer.addSalary}','${answer.addDepartmentId}')`,
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows = `${answer.addTitle},${answer.addSalary},${answer.addDepartmentId} department inserted!\n`);
      });
      console.log(query.sql);  
      questionsPrompt();
    });
};

function addEmployee() {
    connection.query(
      "SELECT employee.first_name, employee.last_name, employeeRole.role_id, employeeRole.title, employee.manager_id " +
      "FROM employee " +
      "left join employeerole on employee.id = employeerole.role_id ", function(err, res) {
      // allEmployeeData = res
      if (err) throw err;

      inquirer.prompt([
        {
          type: 'input',
          name: 'addFirst',
          message: 'What is first name of the employee you would like to add?'
        },
        {
          type: 'input',
          name: 'addLast',
          message: 'What is last name of the employee you would like to add?'
        },
        {
          type: 'rawlist',
          name: 'AddRoleId',
          choices: function() {
            let roleArray = [];
            for (let i = 0; i < res.length; i++) {
              if (res[i].title != null) {
                // console.log('res', res);
                roleArray.push(res[i].title);
              }
            }
            return roleArray;
          },
          message: 'What is role of the employee you would like to add?',
        },
        {
          type: 'rawlist',
          name: 'addManagerId',
          choices: function() {
            let managerArray = [];
            for (let i = 0; i < res.length; i++) {
              if (res[i].manager_id != null) {
                // console.log('res', res);
                managerArray.push(res[i].manager_id);
              }
            }
            return managerArray;
          },
          message: 'Who is mangager of the employee you would like to add?',
        }
      ]).then(function(answer) {
        console.log("answer:", answer)
        // console.log(answer.addFirst, answer.addLast, answer.AddRoleId, answer.addManagerId);

        let query = connection.query(
          `INSERT INTO employee (first_name, last_name, manager_id) value ('${answer.addFirst}','${answer.addLast}', ${answer.addManagerId})`,
          function(err, res) {
            if (err){ throw err;}
            console.log(res.affectedRows = `${answer.addFirst},${answer.addLast},${answer.addManagerId} inserted!\n`);
          });

        let query2 = connection.query(
          `INSERT INTO employeerole (title) value ('${answer.AddRoleId}')`,
          
          function(err, res) {
            if (err){ throw err;}
            console.log(res.affectedRows = `${answer.AddRoleId}, ${answer.salary} inserted!\n`);
          });

        // let query3 = connection.query(
        //   `INSERT INTO employeerole (manager_id) value ('${answer.addManagerId}')`,
        //   function(err, res) {
        //     console.log("I'm in")
        //     if (err){ throw err;}
        //     console.log(res.affectedRows = `${answer.addManagerId} inserted!\n`);
        //   });
        
          console.log(query.sql);  
          console.log(query2.sql);  
          // console.log(query3.sql);  

          questionsPrompt();
        })
      })
    };

function updateEmployee() {
  // console.log("Updating employee... \n");
  inquirer.prompt([
    {
      type: 'input',
      name: 'setClause',
      message: 'What role are you inputting?'
    },
    {
      type: 'input',
      name: 'whereClause',
      message: 'What is role ID of the employee you are updating?'
    }
  ]).then(function(answer) {
    let query = connection.query(
      `Update employeerole set title = '${answer.setClause}' where role_id = ${answer.whereClause}`,
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " employee role updated!\n");
      });
      console.log(query.sql);  
      questionsPrompt();
  })
};

function finish() {
  connection.end();
};


questionsPrompt();