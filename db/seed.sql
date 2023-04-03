use employeedb; 
INSERT INTO department
(name)
VALUES 
('Sales'),
("Management"),
("HR");

INSERT INTO role
(title, salary, department_id)
VALUES 
("Sales Lead", 50000, 1),
("Manager", 100000, 2),
("HR Representative", 50000, 3);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
("John", "Smith", 1, null),
("Jane", "Doe", 2, 1),
("Bob", "Johnson", 2, 1),
("Emily", "Wang", 3, 2),
("Michael", "Nguyen", 2, 2),
("Taylor", "Evans", 1, 1);
