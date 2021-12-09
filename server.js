const express = require("express");
const path = require("path");
const fs = require("fs");
const {readFromFile, readAndAppend} = require("./develop/file-handler");

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


app.get("/api/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
  });

app.post("/api/notes", (req, res) => {

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
     title,
     text,
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  } 
});



  app.listen(PORT, function() {
    console.log(`listening on PORT: ${PORT}`);
  });