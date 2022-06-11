use employees;
INSERT INTO department
    (name)
VALUES
    ('Operations'),
    ('Analystics'),
    ('Marketing'),
    ('Executive');
INSERT INTO role
    (title, salary, department_id)
VALUES
    ('General Manager', 3000000, 1),
    ('Coach', 2500000, 1),
    ('Team Lead Analyst', 800000, 2),
    ('Team Analyst', 750000, 2),
    ('Media Manager', 700000, 3),
    ('Media Specialist', 450000, 3),
    ('CEO', 5550000, 4),
    ('CEO Assistant', 660000, 4);
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