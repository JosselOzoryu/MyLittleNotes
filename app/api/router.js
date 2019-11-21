const router = require("express").Router();
const notes = require("./notes");

let counter = 1;

// router.get('/', function(req, res, next) {
// 	res.locals.connection.query('SELECT * from notes', function (error, results, fields) {
// 		if (error) throw error;
// 		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
// 	});
// });

router
  .get("/", (req, res) => {
    res.status(200).json(notes);
  })

  .post("/", (req, res) => {
    const { title, body } = req.body;
    const note = {
      id: counter,
      title: title,
      body: body
    };
    notes.push(note);
    counter++;
    res.status(201).json({ response: "note created", id: counter });
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
    res.status(200).json({ response: "note updated" });
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
    res.status(200).json({ response: "note deleted" });
  });

module.exports = router;
