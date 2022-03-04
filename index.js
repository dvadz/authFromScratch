const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const ejs = require("ejs");
const bcrypt = require("bcrypt");
const PORT = process.env.PORT || 3000;
const app = express();

mongoose.connect("mongodb://localhost:27017/myAuthFromScratch");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("HOME");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  console.log(hash);
  res.send({ hash });
  res.send(req.body);
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
