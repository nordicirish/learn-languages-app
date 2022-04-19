const express = require("express");
const app = express();
var cors = require("cors");
const port = process.env.PORT || 8080;
require("dotenv").config();
const mysql = require("mysql");
app.use(express.static("frontend/build"));
// app.use(express.static("public"));
app.use(cors());

let config = {
  host: process.env.db_server,
  user: process.env.user,
  password: process.env.password,
  database: process.env.db,
  connectionLimit: 10,
  multipleStatements: false,
};

var pool = mysql.createPool(config);
app.get("/translations", (req, res) => {
  pool.query(
    "SELECT * FROM translations, tags WHERE tag_id = tags.id",
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.send(results);
      }
    }
  );
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});
