const express = require("express");
const router = express.Router();
const exerciseController = require("../controllers/exercise.controller");

router.get("/:exerciseID", exerciseController.getExerciseByID);

module.exports = router;
