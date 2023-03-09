const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema({
    Workout_ID: {
        type: Number

    },
    Workout_Name: {
        type: String
    },
    Start_Time: {
        type: Date

    },
    End_Time: {
        type: Date

    },
    Exercises: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exercises',
        },
    ],
    Avg_HR: {
        type: Number,
    },
})

exports.Workouts = mongoose.model('Workout', workoutSchema)