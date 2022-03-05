const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const ejs = require("ejs");
const bcrypt = require("bcrypt");
const session = require("express-session");
const PORT = process.env.PORT || 3000;
const app = express();

mongoose.connect("mongodb://localhost:27017/myAuthFromScratch");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "thePathToEnlightenmentIsThroughDarkness",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 15 },
  })
);
app.get("/", (req, res) => {
  res.send("HOME");
});

app.get("/secret", (req, res) => {
  if (req.session.username) {
    res.send("This is top secret information. Santa Claus is not real. His real name is Nick.");
  } else {
    res.send("This is top secret information. Please login to gain access!");
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({ username, passordHash: hash });
  await user.save();
  req.session.username = username;
  res.redirect("/secret");
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
