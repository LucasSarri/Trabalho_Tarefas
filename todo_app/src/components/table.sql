create database task;

use task;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(512) NOT NULL UNIQUE,
  password VARCHAR(512) NOT NULL,
  passwordConfirm VARCHAR(512) NOT NULL,
  name VARCHAR(512) NOT NULL
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(50) NOT NULL,
  isDone BOOL DEFAULT FALSE,
  isPriority BOOL DEFAULT FALSE,
  created_date TIMESTAMP DEFAULT NOW(),
  user_id INT NOT NULL REFERENCES users(id)
);

-- senha: 123123
INSERT INTO users(email, password, passwordConfirm,name) Values('rsdevigo@gmail.com', '$2b$10$/EiJAYpr55zxclYLfi3hWeR08Ys6.ZdyBIXemP8Vi7FzywfwijdSC', '$2b$10$/EiJAYpr55zxclYLfi3hWeR08Ys6.ZdyBIXemP8Vi7FzywfwijdSC' ,'Rodrigo Sanches Devigo');

INSERT INTO tasks(description,user_id) VALUES('Uma tarefa ai',1);

select * from users;

select * from tasks;