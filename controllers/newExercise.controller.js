const asyncHandler = require("express-async-handler");
const query = require("../db/queries");
const getCreateNewExercise = asyncHandler(async (req, res) => {
  res.render("newExercise");
});

module.exports = {
  getCreateNewExercise,
};
