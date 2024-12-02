const express = require("express");
const router = express.Router();
const progressionController = require("../controllers/progression.controller");

router.get("/:progressionID", progressionController.getProgression);

module.exports = router;
