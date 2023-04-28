const express = require("express");
const router = express.Router();

const Course = require("../models").Course;
const User = require("../models").User;

const { authenticateUser } = require("../middleware/user-auth");

// get all courses including the user associated with each course
router.get("/", async (req, res, next) => {
  try {
    const courses = await Course.findAll({
      include: [
        {
          model: User,
          as: "user"
        }
      ]
    });
    res.status(200).json({ courses });
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

// get course by id
router.get("/:id", async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "user"
        }
      ]
    });
    if (!course) {
      res.status(400).json({ message: "No Course Found" });
    } else {
      res.status(200).json({ course });
    }
  } catch (error) {
    console.log(error);
  }
});

// create course
router.post("/", authenticateUser, async (req, res, next) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).location(`/courses/${course.id}`).end();
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

// update course
router.put("/:id", authenticateUser, async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "user"
        }
      ]
    });

    if (!course) {
      res.status(400).json({ message: "No Course Found" });
    }
    if (course.userId === req.currentUser.id) {
      course.set({
        title: req.body.title,
        description: req.body.description,
        userId: req.body.userId
      });
      await course.save();
      res.status(204).end();
    } else {
      res.status(400).json({ message: "Not Authorized To Update Course" });
    }
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

// delete course
router.delete("/:id", authenticateUser, async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "user"
        }
      ]
    });
    if (!course) {
      res.status(400).json({ message: "No Course Found" });
    }
    // check allowed to destory
    if (course.userId === req.currentUser.id) {
      await course.destroy();
      res.status(204).end();
    } else {
      res.status(400).json({ message: "Not Authorized To Delete Course" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
