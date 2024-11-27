const asyncHandler = require("express-async-handler");

const getExerciseByID = asyncHandler(async (req, res) => {
  res.render("exercise");
});

module.exports = {
  getExerciseByID,
};
