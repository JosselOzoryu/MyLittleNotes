const router = require("express").Router();
const notes = require("./notes");
const uuid = require("uuid/v1");
const mysql = require('mysql');

// router.get('/', function(req, res, next) {
// 	res.locals.connection.query('SELECT * from notes', function (error, results, fields) {
// 		if (error) throw error;
// 		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
// 	});
// });

const DBconection = mysql.createConnection({
  host: "localhost",
  databse: "my-little-notes",
  user: "MyLittleNotes",
  password: "12345"
});

DBconection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to Database!");
});

router
  .get("/", (req, res) => {
    res.status(200).json(notes);
  })

  .post("/", (req, res) => {
    const { title, body } = req.body;
    const note = {
      id: uuid(),
      title: title,
      body: body
    };
    notes.push(note);
    res.status(201).json({ response: "NOTE CREATED", note: note});
  })

  .put("/:id", (req, res) => {
    const { title, body } = req.body;
    const { id } = req.params;
    const note = notes.find(note => {
      if (note.id == id) return note;
    });
    if (note === undefined) {
      res.status(404).json({ response: "ID INVALID" });
      return;
    }
    const index = notes.indexOf(note);
    const newNote = {
      id,
      title,
      body
    };
    notes.splice(index, 0, newNote);
    res.status(200).json({ response: "NOTE UPDATED" });
  })

  .delete("/:id", (req, res) => {
    const { id } = req.params;
    const note = notes.find(note => {
      if (note.id == id) return note;
    });
    if (note === undefined) {
      res.status(404).json({ response: "ID INVALID" });
      return;
    }
    const index = notes.indexOf(note);
    notes.splice(index, 1);
    res.status(200).json({ response: "NOTE DELETED" });
  });

module.exports = router;
