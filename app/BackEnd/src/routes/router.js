const router = require("express").Router();
const {
  getNotes,
  postNote,
  putNote,
  deleteNote
} = require("../controllers/notes.controller");

router
  .get("/", getNotes)

  .post("/", postNote)

  .put("/:id", putNote)

  .delete("/:id", deleteNote);

module.exports = router;
