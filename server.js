const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const {readFromFile, writeToFile, readAndAppend} = require("./develop/file-handler");
const { text } = require("express");

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
     id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  } 
});

app.delete("/api/notes/:id", (req, res) => {
  
  const noteId = req.params.id;
  
  readFromFile("./db/db.json")
  .then((data) => JSON.parse(data))
  .then((parsed) => {
      const newNotes = parsed.filter((text) => text.id !== noteId);  
      writeToFile("./db/db.json", newNotes);
      res.json("Note has been deleted");
    });
  });


  app.listen(PORT, function() {
    console.log(`listening on PORT: ${PORT}`);
  });