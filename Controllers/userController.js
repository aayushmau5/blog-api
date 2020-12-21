const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../Models/User");
const Blog = require("../Models/Blogs");

exports.getUser = async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.userId)) {
    return res.json({
      error: "Enter a valid User ID",
    });
  }
  try {
    let { page, data } = req.query;
    page = +page || 1;
    data = +data || undefined;
    const user = await User.find({ _id: req.params.userId }).select(
      "-password"
    );
    if (!user) return res.json({ error: "No user found" });
    const blog = await Blog.find({ author: user[0]._id })
      .select("-author")
      .sort({ createdAt: -1 })
      .skip((page - 1) * data)
      .limit(data);
    res.json({
      user: user[0],
      blogs: blog,
    });
  } catch (err) {
    next(err);
  }
};

exports.postLogin = async (req, res, next) => {
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
};

exports.postSignup = async (req, res, next) => {
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
};
