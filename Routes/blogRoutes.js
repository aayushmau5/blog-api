const router = require("express").Router();
const passport = require("passport");

const blogController = require("../Controllers/blogController");

// GET /blog/
router.get("/", blogController.getBlogs);

// POST /blog/
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  blogController.postBlog
);
router.get("/:blogId", blogController.getSpecificBlog);

module.exports = router;
