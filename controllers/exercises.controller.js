const asyncHandler = require("express-async-handler");
const query = require("../db/queries");
const ytToImg = require("../util/ytToImg");

const getExercises = asyncHandler(async (req, res) => {
  const exercises = await query.getEverySkill();
  console.log(exercises);
  res.render("exercises", { exercises: exercises, ytToImg: ytToImg });
});

module.exports = {
  getExercises,
};
