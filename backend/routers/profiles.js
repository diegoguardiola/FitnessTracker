const {Profile} = require('../models/profiles')
const express =require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const profile = await Profile.find()
    res.send(profile);
})

router.post(`/newprofile`, (req, res) => {
    const newProfile = new Profile({
        fisrtName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age
    })
    newProfile.save().then((createdProfile => {
        res.status(201).json(createdProfile)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

module.exports = router;