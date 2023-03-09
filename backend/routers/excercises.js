const {Exercises} = require('../models/exercises')
const express =require('express');
const router = express.Router();

//Get All Exercises
router.get('/', async (req, res) => {
    const exerciseList = await Exercises.find()
    
    if(!exerciseList) {
        res.status(500).json({succss: flase})       //server encountered an unexpected condition that prevented it from fulfilling the request.
    }
    res.status(200).send(exerciseList);             //the request has succeeded.
})
//Get Exercise by ID
    //to select specific items, can use Exercises.find().select() ... see video 34
router.get('/:id', async(req, res) => {
    const exercise = await Exercises.findById(req.params.id)        

    if(!exercise) {
        res.status(500).json({message: 'The category with the given ID was not found'})       
    }
    res.status(200).send(exercise);             
})

//updating exercise
router.put('/:id', async(req, res) => {
    const exercise = await Exercises.findByIdAndUpdate(
        req.params.id, 
        {
            Workout_ID: req.body.Workout_ID,
            Exercise_Name: req.body.Exercise_Name,
            Duration_Time: req.body.Duration_Time,
            Reps: req.body.Reps,
            Weight: req.body.Weight,
            AVG_HR: req.body.AVG_HR,
        },
        {new: true}
    )

    if(!exercise)
    return res.status(400).send('the exercise cannot be created!')
    res.send(exercise);
})

//posting new exercise
router.post('/final', async (req, res) => {
    let exercise = new Exercises({
        Workout_ID: req.body.Workout_ID,            //if there are wrong entries see video 32 for code
        Exercise_Name: req.body.Exercise_Name,
        Duration_Time: req.body.Duration_Time,
        Reps: req.body.Reps,
        Weight: req.body.Weight,
        AVG_HR: req.body.AVG_HR,
    })

    exercise = await exercise.save();

    if(!exercise)
    return res.status(500).send('the exercise cannot be created!')
    res.send(exercise);
})

//posting new exercise preliminary
router.post('/first', async (req, res) => {
    let exercise = new Exercises({
        Exercise_ID: req.body.Exercise_ID,            //if there are wrong entries see video 32 for code
        Exercise_Name: req.body.Exercise_Name,
        Reps: req.body.Reps,
        Weight: req.body.Weight,
    })

    exercise = await exercise.save();

    if(!exercise)
    return res.status(500).send('the exercise cannot be saved!')
    res.send(exercise);
})

//deleting exercise
router.delete('/:id', (req, res) => {
    Exercises.findOneAndRemove(req.params.id).then(exercise => {
        if(exercise) {
            return res.status(200).json({success: true, message: 'the exercise is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "exercise not found!"})
        }
    }).catch(err=>{
        return res.status(500).json({success: false, error: err}) 
     })
})

module.exports = router;