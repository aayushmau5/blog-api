const router = require("express").Router();

const {
  userLoginValidator,
  userSignupValidator,
  validate,
} = require("../helpers/validationAndSanitization");
const userController = require("../Controllers/userController");

// GET /user/:userId
router.get("/:userId", userController.getUser);

// POST /user/signup
router.post(
  "/signup",
  userSignupValidator,
  validate,
  userController.postSignup
);

// POST /user/login
router.post("/login", userLoginValidator, validate, userController.postLogin);

module.exports = router;
