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
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

//Require routes file

var noteTitles =[];

// require('./routes/routes')(app);

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// reservation.html
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    return res.sendFile(path.join(__dirname, "db/db.json")); //path.json -> path.join
  });

// api/tables display all tables
app.get("/api/notes", function(req, res) {
    noteTitles = fs.readFileSync("db/db.json", "utf8");
    noteTitles = JSON.parse(noteTitles);
    return res.json(noteTitles);
  });

// // api/waitlist display all waitlist
// app.get("/api/waitlist", function(req, res) {
//     return res.json(waitlist);
// });

// api/clear clear tables!
app.put("/api/clear", function(req, res) {
    noteTitles = [];
    res.send("clear")
})

// api/delete/table
app.delete("/api/delete/table", function(req, res) {
    var index = req.body.index;
    var temp = [];
    for (var i = 0; i < noteTitles.length; i++) {
        if (i !== parseInt(index)) {
          temp.push(noteTitles[i]);
        }
    }
    noteTitles = temp;
    res.send("table removed")
})

// // apie/delete/waitlist
// app.delete("/api/delete/waitlist", function(req, res) {
//     var index = req.body.index;
//     var temp = [];
//     for (var i = 0; i < tables.length; i++) {
//         if (i !== parseInt(index)) {
//           temp.push(waitlist[i]);
//         }
//     }
//     waitlist = temp;
//     res.send("waitlist removed")
// })

// post api/tables
app.post("/api/notes", function(req, res) {
noteTitles =fs.readFileSync("db/db.json", "utf8");
noteTitles= JSON.parse(noteTitles);
req.body.id = noteTitles.length;
noteTitles.push(req.body);
noteTitles = JSON.stringify(noteTitles);
fs.writeFile("db/db.json", noteTitles, "utf8", function(err) {
    // error handling
    if (err) throw err;
  });

});
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });


// Setup listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
}); 