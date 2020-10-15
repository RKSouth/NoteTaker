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

//Require routes file
require('./routes/routes')(app);

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// reservation.html
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

// // api/tables display all tables
// app.get("/api/tables", function(req, res) {
//     return res.json(tables);
//   });

// // api/waitlist display all waitlist
// app.get("/api/waitlist", function(req, res) {
//     return res.json(waitlist);
// });

// // api/clear clear tables!
// app.put("/api/clear", function(req, res) {
//     tables = [];
//     waitlist = [];
//     res.send("clear")
// })

// // api/delete/table
// app.delete("/api/delete/table", function(req, res) {
//     var index = req.body.index;
//     var temp = [];
//     for (var i = 0; i < tables.length; i++) {
//         if (i !== parseInt(index)) {
//           temp.push(tables[i]);
//         }
//     }
//     tables = temp;
//     res.send("table removed")
// })

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

// // post api/tables
// app.post("/api/tables", function(req, res) {
//     var newTable = req.body;
//     console.log(newTable);
//     if (tables.length < 5 ) {
//         tables.push(newTable);
//         res.send("Table")
//     } else {
//         waitlist.push(newTable);
//         res.send();
//     }
// });



// Setup listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
}); 