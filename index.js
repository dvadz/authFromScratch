const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("HOME");
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
