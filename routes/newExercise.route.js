const express = require("express");
const router = express.Router();
const newExerciseController = require("../controllers/newExercise.controller");

router.get("/", newExerciseController.getNewExercise);
router.post("/", newExerciseController.postNewExercise);

module.exports = router;
