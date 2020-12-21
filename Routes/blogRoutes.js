const router = require("express").Router();
const passport = require("passport");

const {
  postBlogValidator,
  validate,
} = require("../helpers/validationAndSanitization");
const blogController = require("../Controllers/blogController");

// GET /blogs/
router.get("/", blogController.getBlogs);

// POST /blogs/
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postBlogValidator,
  validate,
  blogController.postBlog
);

// GET /blogs/blog/:blogId
router.get("/blog/:blogId", blogController.getSpecificBlog);

// PUT /blogs/blog/:blogId
router.put(
  "/blog/:blogId",
  passport.authenticate("jwt", { session: false }),
  postBlogValidator,
  validate,
  blogController.updateBlog
);

router.delete(
  "/blog/:blogId",
  passport.authenticate("jwt", { session: false }),
  blogController.deleteBlog
);

module.exports = router;
