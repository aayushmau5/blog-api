const mongoose = require("mongoose");
const { validationResult, body } = require("express-validator");

const Blog = require("../Models/Blogs");

exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ isPublic: true }).populate("author", [
      "_id",
      "username",
    ]);
    if (blogs.length === 0) return res.json({ error: "No blogs found" });
    return res.status(200).json({
      blogs: blogs,
    });
  } catch (err) {
    next(err);
  }
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
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    const { title, post, public } = req.body;
    try {
      const blog = new Blog({
        title: title,
        post: post,
        isPublic: public,
        author: req.user._id,
        comments: [],
      });
      const blogDb = await blog.save();
      res.status(200).json({
        success: true,
        message: "Blog saved to the database",
      });
    } catch (err) {
      next(err);
    }
  },
];

exports.getSpecificBlog = async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.blogId)) {
    return res.json({
      error: "Enter a valid Blog ID",
    });
  }
  try {
    const blog = await Blog.find({ _id: req.params.blogId }).populate(
      "author",
      ["_id", "username"]
    );
    if (blog.length === 0) return res.json({ error: "No blogs found" });
    return res.status(200).json({
      blog: blog[0],
    });
  } catch (err) {
    next(err);
  }
};
