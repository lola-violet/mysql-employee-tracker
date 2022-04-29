-- Seeds for departments
INSERT INTO department (name)
VALUES
    ("Sales"),
    ("Marketing"),
    ("Operations");

-- Seeds for roles
INSERT INTO role (title, salary, department)
VALUES
    ("Sales Manager", 1),
    ("Marketing Manager", 2),
    ("Operations Manager", 3),
    ("Assistant Sales Manager", 1),
    ("Assistant Marketing Manager", 2),
    ("Assistant Operations Manager", 3);
-- Seeds for employees
