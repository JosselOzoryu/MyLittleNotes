const router = require("express").Router();
const sequalizeConnection = require("./database/sequalize");
const Note = sequalizeConnection.models.note;
const uuid = require("uuid/v1");

//TODO ROUTER
router
  .get("/", async function(req, res, next) {
    const notes = await Note.findAll();
    res.status(200).json(notes);
  })

  .post("/", async (req, res) => {
    const { title, body } = req.body;
    const note = {
      id: uuid(),
      title: title,
      body: body
    };
    const newNote = await Note.create(note);
    res.status(200).json(newNote);
  })

  .put("/:id", async (req, res) => {
    const { title, body } = req.body;
    const { id } = req.params;
    console.log(req.body);
    const noteFound = await Note.findOne({ where: { id } });
    if (noteFound === undefined) {
      res.status(404).json({ response: "ID INVALID" });
      return;
    }
    const newNote = await noteFound.update({
      id: id,
      title: title,
      body: body
    });
    res.status(200).json(newNote);
  })

  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    const noteFound = await Note.findOne({ where: { id } });
    if (noteFound === undefined) {
      res.status(404).json({ response: "ID INVALID" });
      return;
    }
    await noteFound.destroy();
    res.status(200).json({ response: "NOTE DELETED" });
  });

module.exports = router;
