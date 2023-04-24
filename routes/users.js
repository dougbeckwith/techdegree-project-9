const express = require("express");
const router = express.Router();

const User = require("../models").User;

router.get("/", async (req, res, next) => {
  try {
    // Find all users
    const users = await User.findAll();
    res.status(200).json({ users: users });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    // Find all users
    console.log(req.body);
    const { firstName, lastName, emailAddress, password } = req.body;
    const user = await User.create({
      firstName,
      lastName,
      emailAddress,
      password
    });
    console.log(user);
    res.location("/");
    res.status(201).end();
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
