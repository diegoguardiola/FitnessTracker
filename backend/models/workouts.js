const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  startTime: Date,
  endTime: Date,
  exercises: [
    {
      exerciseName: String,
      sets: [
        {
          weight: Number,
          reps: Number,
        },
      ],
    },
  ],
});

module.exports = mongoose.model('Exercise', exerciseSchema);
