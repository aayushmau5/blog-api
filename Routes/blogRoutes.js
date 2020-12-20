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

// GET /blogs/blog/:blogId
router.get("/blog/:blogId", blogController.getSpecificBlog);

// PUT /blogs/blog/:blogId
router.put(
  "/blog/:blogId",
  passport.authenticate("jwt", { session: false }),
  blogController.updateBlog
);

router.delete(
  "/blog/:blogId",
  passport.authenticate("jwt", { session: false }),
  blogController.deleteBlog
);

module.exports = router;
