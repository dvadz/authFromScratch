const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const logger = require("morgan");
const ejs = require("ejs");
const bcrypt = require("bcrypt");
const session = require("express-session");
const { redirect } = require("express/lib/response");
const req = require("express/lib/request");
const morgan = require("morgan");
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
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 15 },
  })
);
app.use(morgan("dev"));

const requireLogin = (req, res, next) => {
  if (req.session.user_id) {
    next();
  } else {
    res.redirect("/login");
  }
};

app.get("/", (req, res) => {
  res.send("HOME");
});

app.get("/settings", requireLogin, (req, res) => {
  res.send("You are in SETTINGS! ");
});

app.get("/secret", requireLogin, (req, res) => {
  res.render("secret");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await User.validateUser(username, password);
  if (foundUser) {
    req.session.user_id = foundUser._id;
    res.redirect("/secret");
  } else {
    res.redirect("/login");
  }
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const passwordHash = password;
  const user = new User({ username, passwordHash });
  await user.save();
  if (user) {
    req.session.user_id = user._id;
    res.redirect("/secret");
  } else {
    res.send(user);
  }
});

app.post("/logout", (req, res) => {
  req.session.user_id = null;
  res.redirect("/login");
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
