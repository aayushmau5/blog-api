const router = require("express").Router();
const apiController = require("../Controllers/apiController");
const userController = require("../Controllers/userController");

router.get("/", apiController.getRoot);
router.post("/login", userController.postLogin);

module.exports = router;
