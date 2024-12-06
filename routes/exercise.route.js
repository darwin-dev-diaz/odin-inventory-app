const express = require("express");
const router = express.Router();
const exerciseController = require("../controllers/exercise.controller");

router.get("/:exerciseID", exerciseController.getExerciseByID);
router.post("/:exerciseID/delete", exerciseController.postDeleteExercise);
router.post("/:exerciseID/edit", exerciseController.postEditExerciseAuth);

module.exports = router;
