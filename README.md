# learn-languages-app

A foreign language vocabulary training app for kids.

## Author

Roger Graham

## Demo Website

https://nordicirish-learn-languages.herokuapp.com/

## Requirements

Node.js
MySQL / MariaDB
React

## Install

### Database

Create database tables and add some translation information and word categories.

CREATE TABLE translations(
id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
english VARCHAR(255) UNIQUE NOT NULL,
finnish VARCHAR(255) UNIQUE NOT NULL,
tag_id VARCHAR(255),
FOREIGN KEY(tag_id) REFERENCES tags(tag) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE tags(
tag VARCHAR(255) UNIQUE NOT NULL PRIMARY KEY
);

INSERT INTO
tags (tag)
VALUES
("Colors"),
("Vehicles"),
("Animals"),
("Furniture"),
("Plants");

INSERT INTO
translations (english, finnish, tag_id)
VALUES
("red", "punainen", "Colors"),
("car", "auto", "Vehicles"),
("dog", "koira", "Animals"),
("cat", "kissa", "Animals"),
("table", "pöytä", "Furniture"),
("birch", "koivu", "Plants")
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
