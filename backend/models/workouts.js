const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  exercises: [{
    exerciseName: String,
    sets: [{
      weight: Number,
      reps: Number
    }]
  }]
});

module.exports = mongoose.model('Exercise', exerciseSchema);