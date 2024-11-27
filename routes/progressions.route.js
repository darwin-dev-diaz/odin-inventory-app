const express = require("express");
const router = express.Router();
const progressionsController = require("../controllers/progressions.controller");

router.get("/", progressionsController.getProgressions);

module.exports = router;
