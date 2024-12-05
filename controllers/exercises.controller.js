const asyncHandler = require("express-async-handler");
const query = require("../db/queries");
const ytToImg = require("../util/ytToImg");
const capitalize = require("../util/capitalize");

const getExercises = asyncHandler(async (req, res) => {
  let exercises;
  let filterPhrase;
  let filterSettings;
  if (req.query.difficultyFilter) {
    exercises = await query.filterSkillsByDifficulty(
      req.query.difficultyFilter
    );
    filterPhrase = "Filtering by difficulties:";
    filterSettings = (await query.getDifficulties(req.query.difficultyFilter))
      .map((x) => capitalize(x.name))
      .join(", ");
  } else if (req.query.categoryFilter) {
    exercises = await query.filterSkillsByCategory(req.query.categoryFilter);
    filterPhrase = "Filtering by categories:";
    filterSettings = (await query.getCategories(req.query.categoryFilter))
      .map((x) => capitalize(x.name))
      .join(", ");
  } else if (req.query.searchQuery) {
    exercises = await query.searchSkills(req.query.searchQuery);
    filterPhrase = "Showing search results for:";
    filterSettings = `"${req.query.searchQuery}"`;
  } else {
    exercises = await query.getEverySkill();
    filterPhrase = "All exercises:";
  }

  const difficulties = (await query.getDifficulties()).map((difficulty) => ({
    ...difficulty,
    name: capitalize(difficulty.name),
  }));
  const categories = (await query.getCategories()).map((category) => ({
    ...category,
    name: capitalize(category.name),
  }));

  res.render("exercises", {
    exercises,
    ytToImg,
    difficulties,
    categories,
    filterPhrase,
    filterSettings,
  });
});

module.exports = {
  getExercises,
};
