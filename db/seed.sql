use employeedb; 
INSERT INTO department
(name)
VALUES 
('Sales'),
("management"),
("hr");

INSERT INTO role
(title, salary, department_id)
VALUES 
("sales lead", 50000, 1),
("manager", 100000, 2),
("hr representative", 50000, 3);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
("John", "Smith", 1, null),
("Jane", "Doe", 2, 1),
("Bob", "Johnson", 2, 1),
("Emily", "Wang", 3, 2),
("Michael", "Nguyen", 2, 2),
("Taylor", "Evans", 1, 1);
