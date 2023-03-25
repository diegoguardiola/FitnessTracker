// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: String,
  // Add any other fields you want to store for the user, e.g.
  // someData: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
