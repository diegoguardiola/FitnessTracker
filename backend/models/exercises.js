const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
    Exercise_ID: {
        type: Number,
        required: true,
    },
    Exercise_Name: {
        type: String,
    },
    Duration_Time: {
        type: Date,
        required: true,
    },
    Reps: {
        type: [Number],
        required: true,
        default: [],
        minItems: 1,
        maxItems: 15,
      },
      Weight: {
        type: [Number],
        required: true,
        default: [],
        minItems: 1,
        maxItems: 15,
      },
      Avg_HR: {
        type: Number,
    },
})

exerciseSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

exerciseSchema.set('toJSON', {
    virtuals: true,
});

exports.Exercises = mongoose.model('Exercises', exerciseSchema)