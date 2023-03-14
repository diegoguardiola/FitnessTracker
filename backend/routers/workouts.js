const express = require('express');
const router = express.Router();
const Exercise = require('../models/workouts');

// Get all exercises
router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single exercise
router.get('/:id', getExercise, (req, res) => {
  res.json(res.exercise);
});

// Create a new exercise
router.post('/', async (req, res) => {
  const exercise = new Exercise({
    exercises: req.body.exercises

  });
  try {
    const newExercise = await exercise.save();
    res.status(201).json(newExercise);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an exercise
router.patch('/:id', getExercise, async (req, res) => {
  if (req.body.exercises) {
    res.exercise.exercises = req.body.exercises;
  }
  try {
    const updatedExercise = await res.exercise.save();
    res.json(updatedExercise);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an exercise
router.delete('/:id', getExercise, async (req, res) => {
  try {
    await res.exercise.remove();
    res.json({ message: 'Exercise deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single exercise by ID
async function getExercise(req, res, next) {
  let exercise;
  try {
    exercise = await Exercise.findById(req.params.id);
    if (exercise == null) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.exercise = exercise;
  next();
}

module.exports = router;
