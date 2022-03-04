const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const ejs = require("ejs");
const PORT = process.env.PORT || 3000;
const app = express();

mongoose.connect("mongodb://localhost:27017/myAuthFromScratch");

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res) => {
  res.send("HOME");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
