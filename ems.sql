drop database if exists EmployeeTracker_db;

create database EmployeeTracker_db;

use EmployeeTracker_db;
-- create department first, then employeeRole, then employee bc of foreign keys!

create table department (
	department_id int not null auto_increment,
    name varchar(30) not null,
    primary key (department_id)
);

create table employeeRole (
	role_id int not null auto_increment,
    title varchar(30) not null,
    salary decimal(10, 2),
    department_id int,  -- (FK)
    primary key (role_id),
	FOREIGN KEY (department_id) REFERENCES department(department_id)
);

create table employee (
	id int not null auto_increment,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int, -- (FK)
    manager_id int,
    primary key (id),
	FOREIGN KEY (role_id) REFERENCES employeeRole(role_id)
);

-- breaksssss

insert into department (name)
values ('Sales'), ('Legal'), ('Engineering'), ('Finance');
 
insert into employeerole (title, salary, department_id)
values ("Sales Lead", 100000, 1),("Salesperson", 80000, 1),("Lead Engineer", 150000, 3),
("Software Engineer", 120000, 3),("Account Manager", 125000, 4),("Accountant", 115000, 4),
("Legal Team Lead", 110000, 2),("Lawyer", 180000, 2);

insert into employee (first_name, last_name, role_id, manager_id)
values ("John", "Doe", 1, null),('Mike', 'Chan', 2, 1),('Ashley', 'Rodriquez', 3, null),
('Kevin', 'Tupik', 4, 3),('Kunal', 'Singh', 5, null),('Malia', 'Brown', 6, 5),
('Sarah', 'Lourd', 7, null),('Tom', 'Allen', 8, 7); 

-- breaksssss

select  employeeRole.title, employee.id, employee.first_name, employee.last_name, department.name, employeerole.salary
from employee
left join employeerole on employee.role_id = employeerole.role_id
left join department on employeerole.department_id = department.department_id
order by employee.id;

SELECT employee.first_name, employee.last_name, employeeRole.title, employee.manager_id
FROM employee
left join employeerole on employee.role_id = employeerole.role_id;

SELECT employeeRole.role_id, employee.first_name, employee.last_name, employeeRole.title, department.name, employeerole.salary 
FROM employee
left join employeerole on employee.id = employeerole.role_id
left join department on employeerole.department_id = department.department_id 
order by employee.id;

SELECT employee.id, employee.first_name, employee.last_name, employeerole.title, department.name, employeerole.salary, concat(employee2.first_name, " ", employee2.last_name) manager
FROM employee
left join employee employee2 on employee.manager_id = employee2.id
left join employeerole on employee.role_id = employeerole.role_id
left join department on employeerole.department_id = department.department_id 
Order By employee.id;

SELECT employee.id, employee.first_name, employee.last_name, employeeRole.title, department.name,
employeeRole.salary, concat(employee2.first_name, " ", employee2.last_name) manager
FROM employee
left join employee employee2 on employee.manager_id = employee2.id
left join employeerole on employee.id = employeerole.role_id
left join department on employeerole.department_id = department.department_id
Order By employee.id;