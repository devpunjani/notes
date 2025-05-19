const express = require("express");
const router = express.Router();

const {
  createNote,
  deleteNote,
  editNote,
  getNoteById,
  getNotes,
} = require("../controllers/notesController");

router.get("/", getNotes);
router.post("/", createNote);
router.get("/:id", getNoteById);
router.put("/:id", editNote);
router.delete("/:id", deleteNote);

module.exports = router;