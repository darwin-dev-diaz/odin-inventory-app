const asyncHandler = require("express-async-handler");

const query = require("../db/queries");
const ytToImg = require("../util/ytToImg");
const capitalize = require("../util/capitalize");
const getAllDiffsAndCats = require("../util/getAllDiffsAndCats");

const getExercises = asyncHandler(async (req, res) => {
  let exercises;
  let filterPhrase;
  let filterSettings;

  // if a key of filterMap is in req.query, use that filter
  // if not, set the default values for exercise and filterPhrase
  const filterMap = {
    difficultyFilter: async () => {
      exercises = await query.filterExercisesByDifficulty(
        req.query.difficultyFilter
      );
      filterPhrase = "Filtering by difficulties";
      filterSettings = (await query.getDifficulties(req.query.difficultyFilter))
        .map((x) => capitalize(x.name))
        .join(", ");
    },
    categoryFilter: async () => {
      exercises = await query.filterExercisesByCategory(
        req.query.categoryFilter
      );
      filterPhrase = "Filtering by categories";
      filterSettings = (await query.getCategories(req.query.categoryFilter))
        .map((x) => capitalize(x.name))
        .join(", ");
    },
    searchQuery: async () => {
      exercises = await query.searchExercisesByName(req.query.searchQuery);
      filterPhrase = "Showing search results for";
      filterSettings = `"${req.query.searchQuery}"`;
    },
  };
  const applyFilters = async () => {
    for (const key in filterMap) {
      if (req.query[key]) {
        await filterMap[key]();
        return;
      }
    }
    exercises = await query.getEveryExercise();
    filterPhrase = "All exercises";
  };
  await applyFilters();

  const { allDifficulties, allCategories } = await getAllDiffsAndCats();
  console.log(exercises);

  res.render("exercises", {
    exercises,
    exercisesLength: exercises.length,
    allDifficulties,
    allCategories,
    filterPhrase,
    filterSettings,
  });
});

module.exports = {
  getExercises,
};
