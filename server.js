const express = require("express");
const notes = require("./db/db.json");
const path = require("path");
const fs = require("fs");


const PORT = process.env.PORT || 3001;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });











  app.listen(PORT, function() {
    console.log(`listening on PORT: ${PORT}`);
  });