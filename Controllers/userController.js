const User = require("../Models/User");
const Blog = require("../Models/Blogs");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

exports.getUser = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.userId)) {
    return res.json({
      error: "Enter a valid User ID",
    });
  }
  User.find({ _id: req.params.userId })
    .select("-password")
    .exec((err, user) => {
      console.log(user);
      if (err) return next(err);
      if (!user) return res.json({ error: "No user found" });
      Blog.find({ author: user._id }, (err, blogs) => {
        console.log(blogs);
        if (err) return next(err);
        res.json({
          user: user[0],
          blogs: blogs,
        });
      });
    });
};

exports.postLogin = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please enter a valid username")
    .isAlphanumeric()
    .withMessage("Username must contain alphabet or numbers"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array(),
      });
    }
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) return next(err);
      if (!user) return res.json({ error: "Invalid username or password" });
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) return next(err);
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
      });
    });
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
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array(),
      });
    }
    bcrypt.hash(req.body.password, 16, (err, hashedPassword) => {
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });

      user.save((err) => {
        if (err) {
          if (err.code === 11000) {
            return res.json({
              error: "Username already present",
            });
          }
          return next(err);
        }
        return res.status(400).json({
          message: "Signed In",
        });
      });
    });
  },
];
