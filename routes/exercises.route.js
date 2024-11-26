const asyncHandler = require("express-async-handler");

const getExercises = asyncHandler(async (req, res) => {
  res.render("exercises");
});

module.exports = {
  getExercises,
};
