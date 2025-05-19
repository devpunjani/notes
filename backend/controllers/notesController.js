const Note = require("../models/Notes");

exports.createNote = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    if (!title || !description || !date) {
      return res.status(400).json({ message: "Title, description and date are required" });
    }

    const note = new Note({ title, description, date });

    await note.save();
    res.status(201).json({ message: "Note created successfully", note });
  } catch (err) {
    console.error("Error creating note:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (err) {
    console.error("Error fetching note:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.editNote = async (req, res) => {
  try {
    const { title, description } = req.body;

    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (title) note.title = title;
    if (description) note.description = description;

    await note.save();
    res.json({ message: "Note updated successfully", note });
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ error: err.message });
  }
};