// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

// Routes
// =============================================================

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
    });

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Returns all notes
app.get("/api/notes", function (req, res) {
    let allItems = JSON.parse(fs.readFileSync("./db.json"))
    return res.json(allItems);
    
});

//Create new note
app.post("/api/notes", function (req, res) {

    let newNote = req.body;

    newNote.id = uuidv4();

    res.json(newNote);

    fs.readFile("./db.json", function (err, data) {
        if (err) throw err;
        let jsonOutput = JSON.parse(data);
        jsonOutput.push(newNote);

        fs.writeFile("./db.json", JSON.stringify(jsonOutput), function (err) {
            if (err) throw err;
        
        });
    });

});

// Delete Note
app.delete("/api/notes/:id", function (req, res) {
    let selectedNote = req.params.id

    res.json(selectedNote);

    fs.readFile("./db.json", function (err, data) {
        if (err) throw err;
        let jsonOutput = JSON.parse(data);
        for (var i = 0; i < jsonOutput.length; i++)
            if (jsonOutput[i].id === selectedNote) {
                jsonOutput.splice(i, 1);
                break;
            }
            fs.writeFile("./db.json", JSON.stringify(jsonOutput), function (err) {
                if (err) throw err;

        });
    })
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});