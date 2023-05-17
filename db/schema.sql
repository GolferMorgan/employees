DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db

USE employees_db

CREATE TABLE employee_name(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  salary INT,
  total_employees INT
)