const mongoose = require("mongoose");
const { validationResult, body } = require("express-validator");

const Blog = require("../Models/Blogs");

exports.getBlogs = (req, res, next) => {
  Blog.find({ isPublic: true })
    .populate("author", ["_id", "username"])
    .exec((err, blogs) => {
      if (err) return next(err);
      if (blogs.length === 0) return res.json({ error: "No blogs found" });
      return res.status(200).json({
        blogs: blogs,
      });
    });
};

exports.postBlog = [
  body("title")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Title should not be empty")
    .bail()
    .isLength({ min: 1, max: 200 })
    .withMessage(
      "Title should be atleast 1 character long and maximum of 200 characters long"
    )
    .escape(),
  body("post")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Post should not be empty")
    .bail()
    .isLength({ min: 1 })
    .withMessage("Post should be atleast 1 character long")
    .escape(),
  body("public")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Public should not be empty")
    .bail()
    .isBoolean()
    .withMessage("Public must be either true or false"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    const { title, post, public } = req.body;
    const blog = new Blog({
      title: title,
      post: post,
      isPublic: public,
      author: req.user._id,
      comments: [],
    });
    blog.save((err, data) => {
      if (err) return next(err);
      res.status(200).json({
        success: true,
        message: "Blog saved to the database",
      });
    });
  },
];

exports.getSpecificBlog = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.blogId)) {
    return res.json({
      error: "Enter a valid Blog ID",
    });
  }
  Blog.find({ _id: req.params.blogId })
    .populate("author", ["_id", "username"])
    .exec((err, blog) => {
      if (err) return next(err);
      if (blog.length === 0) return res.json({ error: "No blogs found" });
      return res.status(200).json({
        blog: blog[0],
      });
    });
};
