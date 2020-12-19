const mongoose = require("mongoose");
const { validationResult, body, param } = require("express-validator");

const Blog = require("../Models/Blogs");

exports.getBlogs = (req, res, next) => {
  Blog.find({ isPublic: true }, (err, blogs) => {
    if (err) return next(err);
    if (blogs.length === 0) return res.json({ error: "No blogs found" });
    return res.json({
      blogs: blogs,
    });
  });
};

exports.postBlog = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage(
      "Title should be atleast 1 character long and maximum of 200 characters long"
    )
    .escape(),
  body("post")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Post should be atleast 1 character long")
    .escape(),
  body("public").isBoolean().withMessage("public must be either true or false"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        errors: errors.array(),
      });
    }
    console.log(req.user);
    //TODO Authentication and Saving the blog
    return res.json({ message: "Blog Posted" });
  },
];

exports.getSpecificBlog = [
  // param('blogId').custom(value => {
  //   return mongoose.isValidObjectId(blogId)
  // })
  (req, res, next) => {
    res.json({
      message: "to be implemented",
    });
  },
];
