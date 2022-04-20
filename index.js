const express = require("express");
const app = express();
var cors = require("cors");
const port = process.env.PORT || 8080;
require("dotenv").config();
// const mysql = require("mysql");
app.use(express.static("frontend/build"));
const database = require("./database/crudrepository.js");
// app.use(express.static("public"));
app.use(cors());

app.get("/translations", async (req, res) => {
  try {
    let result = await database.findAll();
    res.status(200).send(result).end();
  } catch (err) {
    res.status(500).end();
  }
});
app.get("/translations/sort-by-tag", async (req, res) => {
  try {
    let result = await database.sortByTag();
    res.status(200).send(result).end();
  } catch (err) {
    res.status(500).end();
  }
});
app.get("/translations/sort-by-tag-desc", async (req, res) => {
  try {
    let result = await database.sortByTagDesc();
    res.status(200).send(result).end();
  } catch (err) {
    res.status(500).end();
  }
});

app.post("/translations/add", async (req, res) => {
  translation = req.body;
  try {
    await database.save(translation);
    res.status(201);
    res.send(translation).end();
  } catch (err) {
    res.status(500).end();
  }
});

app.get("/translations/delete/:id([0-9]+)", async (req, res) => {
  id = req.params.id;
  console.log(id);
  try {
    let result = await database.deleteById(id);
    result === false
      ? res.status(404).send("Item not found").end()
      : res.status(200);
    res.send("Item deleted").end();
  } catch (err) {
    res.status(500).end();
  }
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});
