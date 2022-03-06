const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

userSchema.statics.validateUser = async function (username, password) {
  const foundUser = await this.findOne({ username });
  if (foundUser) {
    const isValid = await bcrypt.compare(password, foundUser.passwordHash);
    return isValid ? foundUser : false;
  } else {
    return false;
  }
};

userSchema.pre("save", async function (next) {
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
