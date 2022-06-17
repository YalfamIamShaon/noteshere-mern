const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModels");

const getNotes = asyncHandler(async (req, res) => {
  const note = await Note.find({ user: req.user._id });
  res.json(note);
});

const createNotes = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const note = new Note({ user: req.user._id, title, content, category });
    const createdNote = await note.save();
    res.status(201).json(createdNote);
  }
});

const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});

const updateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body; //requesting from the user about the updation

  const note = await Note.findById(req.params.id); //first we'll get the ID of the note

  if (note.user.toString() !== req.user._id.toString()) {
    //if the user who's trying to update the note, is not valid user for that note, then they can't perform the action.
    res.json(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    //if the note is found, then it can be updated
    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    //if not found, then will throw error
    res.json(404);
    throw new Error("Note not found!");
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id); //first we'll get the ID of the note

  if (note.user.toString() !== req.user._id.toString()) {
    //if the user who's trying to update the note, is not valid user for that note, then they can't perform the action.
    res.json(401);
    throw new Error("You can't perform this action");
  }
  if (note) {
    await note.remove();
    res.json({ message: "Note is deleted" });
  } else {
    //if not found, then will throw error
    res.json(404);
    throw new Error("Note not found!");
  }
});

module.exports = { getNotes, createNotes, getNoteById, updateNote, deleteNote };
