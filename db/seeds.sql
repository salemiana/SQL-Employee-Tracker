USE emp_tracker;

INSERT INTO department
    (id, name)
VALUES
    ('Accounting'),
    ('IT Support'),
    ('Marketing'),
    ('Executive');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Manager', 3000000, 1),
    ('Developer', 2500000, 1),
    ('Engineer', 800000, 2),
    ('QA', 750000, 2),
    ('Service', 700000, 3),
    ('Accountant', 450000, 3),
    ('CEO', 5550000, 4),
    ('Intern', 6600, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Sandra', 'Bullock', 1, NULL),
    ('Michael', 'Jackson', 2, 1),
    ('Abraham', 'Hans', 3, NULL),
    ('Mohammed', 'Ali', 4, 3),
    ('Oprah', 'Winfrey', 5, NULL),
    ('Sadghuru', 'Jaggi', 6, 5),
    ('Charles', 'Chaplin', 7, NULL),
    ('Amir', 'Diab', 8, 7);