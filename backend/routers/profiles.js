// routes/profile.js

const express = require('express');
const router = express.Router();
const Profile = require('../models/profiles');

// POST request for creating a new profile
router.post('/', async (req, res) => {
  const { firstName, lastName, email, age, height, weight, profilePicture } = req.body;

  try {
    const newProfile = new Profile({
      firstName,
      lastName,
      email,
      age,
      height,
      weight,
      profilePicture,
    });

    const profile = await newProfile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
