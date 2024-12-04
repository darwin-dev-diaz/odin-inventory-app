const asyncHandler = require("express-async-handler");
const query = require("../db/queries");
const ytToImg = require("../util/ytToImg");
const capitalize = require("../util/capitalize");

const getExercises = asyncHandler(async (req, res) => {
  let exercises;
  if (req.query.difficultyFilter) {
    exercises = await query.filterSkillsByDifficulty(
      req.query.difficultyFilter
    );
  } else {
    exercises = await query.getEverySkill();
  }

  const difficulties = (await query.getDifficulties()).map((difficulty) => ({
    ...difficulty,
    name: capitalize(difficulty.name),
  }));
  const categories = (await query.getCategories()).map((category) => ({
    ...category,
    name: capitalize(category.name),
  }));
  // const test = await query.filterSkillsByDifficulty();

  res.render("exercises", {
    exercises: exercises,
    ytToImg,
    difficulties,
    categories,
  });
});

module.exports = {
  getExercises,
};
