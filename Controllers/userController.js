const User = require("../Models/User");
const Blog = require("../Models/Blogs");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

exports.getUser = async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.userId)) {
    return res.json({
      error: "Enter a valid User ID",
    });
  }
  try {
    const user = await User.find({ _id: req.params.userId }).select(
      "-password"
    );
    if (!user) return res.json({ error: "No user found" });
    const blog = await Blog.find({ author: user[0]._id }).select("-author");
    res.json({
      user: user[0],
      blogs: blog,
    });
  } catch (err) {
    next(err);
  }
};

exports.postLogin = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please enter a valid username")
    .isAlphanumeric()
    .withMessage("Username must contain alphabet or numbers"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array(),
      });
    }
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) return res.json({ error: "Invalid username or password" });
      const result = bcrypt.compare(req.body.password, user.password);
      if (!result) return res.json({ error: "Invalid username or password" });
      const payload = {
        id: user._id,
      };
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: "1d",
      });
      res.status(200).json({
        token: token,
      });
    } catch (err) {
      next(err);
    }
  },
];

exports.postSignup = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please enter a valid username")
    .isAlphanumeric()
    .withMessage("Username must contain alphabet or numbers"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Minimum Password length is 6 characters"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array(),
      });
    }
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 16);

      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });

      const dbUser = await user.save();

      return res.status(400).json({
        message: "Signed In",
      });
    } catch (err) {
      if (err.code === 11000) {
        return res.json({
          error: "Username already present",
        });
      }
      next(err);
    }
  },
];
