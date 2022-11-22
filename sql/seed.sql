USE employeeDB;

INSERT INTO department(name)
VALUES
("Digital"),
("Marketing"),
("Merchandising"),
("Sourcing");

INSERT INTO role(title, salaray, dept_id)
VALUES
("Digital Operations Analyst", 65000, 1),
("Digital Content Editor", 70000, 1),
("Brand Strategy Manager", 175000, 2),
("Ad Operations Coordinator", 50000, 2),
("Assistant Merchant", 72000, 3),
("Planning Manager", 130000, 3),
("Associate Materials Manager", 78000, 4),
("EVP Global Sourcing", 400000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
("Sarah", "Stockton", 1, NULL),
("James", "Johnson", 2, NULL),
("Laura", "Leeland", 3, 1),
("Tom", "Townsand", 4, NULL),
("Bradley", "Benson", 5, NULL),
("Maria", "Marcus", 6, 2),
("Nick", "Naumann", 7, 3),
("Kelly", "Kluth", 8, 4);