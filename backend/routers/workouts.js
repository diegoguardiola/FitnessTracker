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

// Create new exercises
router.post('/', async (req, res) => {
  try {
    const exercisesData = req.body.exercises;

    // Validate that exercisesData is an array
    if (!Array.isArray(exercisesData)) {
      return res.status(400).json({ message: 'Invalid data format. Expected an array of exercises.' });
    }

    // Save each exercise in the database
    const exercises = exercisesData.map((exerciseData) => {
      const exercise = new Exercise({
        exerciseName: exerciseData.exerciseName,
        sets: exerciseData.sets,
      });
      return exercise.save();
    });

    // Wait for all exercises to be saved
    const newExercises = await Promise.all(exercises);

    // Respond with the created exercises
    res.status(201).json(newExercises);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Create a new exercise
router.post('/test', async (req, res) => {
  const exercise = new Exercise({
    exerciseName: req.body.exerciseName,
    sets: req.body.sets,  
    weight: req.body.weight,
    reps: req.body.reps,
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
