const express = require('express');
const router = express.Router();
const Exercise = require('../models/workouts');

/*
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
        startTime: exerciseData.startTime,
        endTime: exerciseData.endTime,
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
});*/

// Create a new exercise
router.post('/', async (req, res) => {
  const exercise = new Exercise({
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    exercises: req.body.exercises,
  });

  try {
    const newExercise = await exercise.save();
    res.status(201).json(newExercise);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
