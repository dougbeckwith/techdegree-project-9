const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/user-auth");
const User = require("../models").User;
const bcrypt = require("bcrypt");

// Get user protected
router.get("/", authenticateUser, async (req, res, next) => {
  try {
    res.status(200).json({ user: req.currentUser });
  } catch (error) {
    console.log(error);
  }
});

// Create user
router.post("/", async (req, res, next) => {
  const user = req.body;

  if (user.password) {
    user.password = bcrypt.hashSync(user.password, 10);
  }

  try {
    await User.create(user);
    res.status(201).location("/").end();
  } catch (error) {
    console.log("ERROR: ", error.name);

    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      const errors = error.errors.map((err) => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
});

module.exports = router;
