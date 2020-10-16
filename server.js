// Require Dependencies


const express = require("express");
const fs = require("fs");
const path = require('path');
// Initialize express app

const app = express();
const PORT = process.env.PORT || 3000;

// Setup data parsing


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
//Require routes file
var noteTitles =[];
// require('./routes/routes')(app);
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    return res.sendFile(path.join(__dirname, "db/db.json")); //path.json -> path.join
  });

// api/tables display all tables
app.get("/api/notes", function(req, res) {
    noteTitles = fs.readFileSync("db/db.json", "utf8");
    res.json(noteTitles[Number(req.params.id)]);
    noteTitles = JSON.parse(noteTitles);
    return res.json(noteTitles);
  });

  app.get("/api/notes/:id", function(req, res) {
    let noteTitles = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    res.json(noteTitles[Number(req.params.id)]);
});


app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

// post api/tables
app.post("/api/notes/", function(req, res) {
    noteTitles = fs.readFileSync("db/db.json", "utf8");
    noteTitles= JSON.parse(noteTitles);
    req.body.id = noteTitles.length;
    noteTitles.push(req.body);
    noteTitles = JSON.stringify(noteTitles);
    res.json(noteTitles);
    fs.writeFile("db/db.json", noteTitles, "utf8", function(err) {
        // error handling
        if (err) throw err;
      });
    });

// api/clear clear tables!
app.put("/api/clear", function(req, res) {
    noteTitles = [];
    res.send("clear")
})
// api/delete/table
app.delete("/api/notes/:id", function(req, res) {
    let noteTitles = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteID = req.params.id;
    let newID = 0;
    console.log(`Deleting note with ID ${noteID}`);
    noteTitles = noteTitles.filter(currNote => {
        return currNote.id != noteID;
    })
    
    for (currNote of noteTitles) {
        currNote.id = newID.toString();
        newID++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(noteTitles));
    res.json(noteTitles);



});


// Setup listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});