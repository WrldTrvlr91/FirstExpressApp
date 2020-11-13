// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
// =============================================================

app.get("/", function(req, res){
res.sendFile(path.join(__dirname, "assets/html/index.html"));
console.log("I AM HOME");
});

app.get("/notes", function(req, res){
res.sendFile(path.join(__dirname, "assets/html/notes.html"));
console.log("NOTES HERE I AM");
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT);
});