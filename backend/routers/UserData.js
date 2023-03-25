// routers/UserData.js
const express = require("express");
const User = require("../models/userData");
const router = express.Router();

router.post("/submitUID", async (req, res) => {
  const { uid } = req.body;

  // Save the user's UID to your MongoDB database
  const newUser = new User({ uid });
  await newUser.save();

  res.json({ message: "UID submitted and saved" });
});

module.exports = router;