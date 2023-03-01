const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const passport = require("passport");

router.post("/register", (req, res, next) => {
  const { username, password } = req.body;
  const user = new User({ username });

  User.register(user, password, (err, user) => {
    if (err) {
      return next(err);
    }

    const token = jwt.sign({ sub: user._id }, "secret");
    res.status(201).json({ token });
  });
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  User.authenticate()(username, password, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ sub: user._id }, "secret");
    res.json({ token });
  });
});

module.exports = router;
