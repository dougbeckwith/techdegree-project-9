const express = require("express");
const router = express.Router();

const Courses = require("../models").Course;
const User = require("../models").User;

// get all courses including the user associated with each course
router.get("/", async (req, res, next) => {
  try {
    const courses = await Courses.findAll({
      include: [
        {
          model: User,
          as: "user"
        }
      ]
    });
    console.log(JSON.stringify(courses, null, 2));
    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// get one course and user associated with it
router.get("/:id", async (req, res, next) => {
  try {
    // const courses = await Course.findAll();
    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// post to create course
router.post("/", async (req, res, next) => {
  try {
    // Find all users
    // console.log(req.body);
    // const { title, description, estimatedTime, materialsNeeded } = req.body;
    // const course = await course.create({
    //   title,
    //   description,
    //   estimatedTime,
    //   materialsNeeded
    // });
    // console.log(user);
    // res.location("/");
    // res.status(201).end();
    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// update course
router.put("/:id", async (req, res, next) => {
  try {
    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// delete course
router.delete("/:id", async (req, res, next) => {
  try {
    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
