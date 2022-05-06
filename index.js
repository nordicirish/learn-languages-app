const express = require("express");
const app = express();
var cors = require("cors");
const port = process.env.PORT || 8080;
//needed for express.static
const path = require("path");
require("dotenv").config();
// post won't work without express.json
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "./frontend/build")));
const database = require("./database/crudrepository.js");
app.use(cors());
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./frontend/build", "index.html"));
// });
app.get("/api/all", async (req, res) => {
  try {
    let result = await database.findAll();
    res.status(200).send(result).end();
  } catch (err) {
    res.status(500).end();
  }
});
app.get("/api/sort-by-tag", async (req, res) => {
  try {
    let result = await database.sortByTag();
    res.status(200).send(result).end();
  } catch (err) {
    res.status(500).end();
  }
});
app.get("/api/sort-by-tag-desc", async (req, res) => {
  try {
    let result = await database.sortByTagDesc();
    res.status(200).send(result).end();
  } catch (err) {
    res.status(500).end();
  }
});

app.post("/api/add", async (req, res) => {
  newTranslation = req.body;
  try {
    //crudrepository response is database row id
    id = await database.save(newTranslation);
    //add id to object so it can be referenced for the reactKey
    newTranslation.id = id;
    res.send(newTranslation).end();
  } catch (err) {
    res.status(500).end();
  }
});

app.get("/api/find/:id([0-9]+)", async (req, res) => {
  id = req.params.id;
  console.log(id);
  try {
    let result = await database.findById(id);
    result === false ? res.status(404).end() : res.status(200);
    res.send(result).end();
  } catch (err) {
    res.status(500).end();
  }
});

app.delete("/api/delete/:id([0-9]+)", async (req, res) => {
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

app.put("/api/update/:id([0-9]+)", async (req, res) => {
  translation = req.body;
  // translation = { english: "squirrel", finnish: "orava", tag_id: "Animals" };
  id = req.params.id;
  try {
    let result = await database.putById(translation, id);
    result === false
      ? res.status(404).send("Item not found").end()
      : res.status(200);
    res.send(translation).end();
  } catch (err) {
    res.status(500).end();
  }
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});
