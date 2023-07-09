const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 4000;
const uri = "mongodb://127.0.0.1:27017/Blog-API";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo connected");
  })

  .catch((error) => {
    console.error("error connecting to Mongo:", error);
  });
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  username: String,
});
const User = mongoose.model("register", userSchema);

const schema = joi.object({
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(6).required(),
  username: joi.string().alphanum().min(3).max(10).required(),
});

app.post("/register", (req, res) => {
  const { error, value } = schema.validate(req.body);
  const newUser = new User({
    username: value.username,
    password: value.password,
  });
  newUser.save();
  res.status(201).send(newUser);
});

// login
app.post("/login", async (req, res) => {
  const { error, value } = schema.validate(req.body);
  const user = await signUp.findOne({ username: value.username });
  if (value.username === user.username && value.password === user.password) {
    res.send("user login is successful");
  } else {
    res.send("Retry");
  }
});
app.listen(4002, () => {
  console.log("server is listening on port");
});
