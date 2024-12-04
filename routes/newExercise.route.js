const express = require("express");
const router = express.Router();
const newExerciseController = require("../controllers/newExercise.controller");

router.get("/", newExerciseController.getCreateNewExercise);

module.exports = router;
