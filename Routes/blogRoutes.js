const router = require("express").Router();
const passport = require("passport");

const blogController = require("../Controllers/blogController");

// GET /blogs/
router.get("/", blogController.getBlogs);

// POST /blogs/
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  blogController.postBlog
);

// GET /blogs/blog/5fde31a206dbaa841509a76d
router.get("/blog/:blogId", blogController.getSpecificBlog);

module.exports = router;
