use employees;

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
    ('Sales', 1),
    ('Program Engineer', 2),
    ('Manager', 3),
    ('CEO', 4);

INSERT INTO employee
    (first_name, last_name, role_id)
VALUES
    ('Mark', 'Cuban', 1, NULL),
    ('Jake', 'Smith', 2, NULL),
    ('John', 'Michaels', 3, NULL),
    ('Morgan', 'Driskell', 4, NULL),
