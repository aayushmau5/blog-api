const router = require("express").Router();

const userController = require("../Controllers/userController");

// GET /:userId
router.get("/:userId", userController.getUser);

// POST /user/signup
router.post("/signup", userController.postSignup);

// POST /user/login
router.post("/login", userController.postLogin);

module.exports = router;
