const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// CREATE task
router.post("/", async (req, res) => {
  const newTask = new Task({
    title: req.body.title,
    description: req.body.description,
  });

  const savedTask = await newTask.save();
  res.json(savedTask);
});

// UPDATE task
router.put("/:id", async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
    },
    { new: true }
  );
  res.json(updatedTask);
});

// DELETE task
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;
