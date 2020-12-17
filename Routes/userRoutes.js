const router = require("express").Router();
const userController = require("../Controllers/userController");

router.post("/signup", userController.postSignup);
router.post("/login", userController.postLogin);

module.exports = router;
