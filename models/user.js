const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: "Username is required",
  },
  passwordHash: {
    type: String,
    required: "Password is required",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
