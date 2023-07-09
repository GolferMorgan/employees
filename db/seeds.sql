use employees_db;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Programming'),
    ('Manager'),
    ('Boss');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales', 80000, 1),
    ('Program Engineer', 80000, 2),
    ('Manager', 80000, 3),
    ('CEO', 80000, 4);

INSERT INTO employee
    (first_name, last_name, role_id)
VALUES
    ('Mark', 'Cuban', 1),
    ('Jake', 'Smith', 2),
    ('John', 'Michaels', 3),
    ('Morgan', 'Driskell', 4);