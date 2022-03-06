const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: "Username is required",
  },
  password: {
    type: String,
    required: "Password is required",
  },
});

userSchema.statics.validateUser = async function (username, password) {
  const foundUser = await this.findOne({ username });
  if (foundUser) {
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
  } else {
    return false;
  }
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
