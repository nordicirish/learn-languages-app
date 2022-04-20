# learn-languages-app

A foreign language vocabulary training app for kids.

## Author

Roger Graham

## Requirements

Node.js
MySQL / MariaDB
React

## Install

### Database

Create database tables and add some translation information and word categories.

CREATE TABLE translations(
id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
english VARCHAR(255) NOT NULL,
finnish VARCHAR(255) NOT NULL,
tag_id INT(11),
FOREIGN KEY(tag_id) REFERENCES tags(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE tags(
id INT (11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
category VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO
tags (category)
VALUES
("Colors"),
("Vehicles"),
("Animals"),
("Furniture"),
("Plants");

INSERT INTO
translations (english, finnish, tag_id)
VALUES
("red", "punainen", 1),
("car", "auto", 2),
("dog", "koira", 3),
("cat", "kissa", 3),
("table", "pöytä", 4),
("birch", "koivu", 5)
;

### Application

clone the code to your computer

git clone https://github.com/nordicirish/learn-languages-app

Install dependencies in the root of the project
npm init

<!-- cd frontend npm i ?? -->

Rename env file to .env and fill your database credentials:

db_server =

user =

password =

db =

<!-- cd .. nodemon index.js -->
<!-- cd frontend npm run start  -->
<!-- access http://localhost:8080 -->
