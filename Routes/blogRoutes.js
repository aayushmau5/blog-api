const router = require("express").Router();
const apiController = require("../Controllers/apiController");

router.get("/", apiController.getRoot);

module.exports = router;
