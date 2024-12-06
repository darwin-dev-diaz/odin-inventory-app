const asyncHandler = require("express-async-handler");
const query = require("../db/queries");
const capitalize = require("../util/capitalize");
const getAllDiffsAndCats = require("../util/getAllDiffsAndCats");

const getData = async () => {
  const allExercises = await query.getEveryExercise();
  const allDiffsAndCats = await getAllDiffsAndCats();
  return { allExercises, ...allDiffsAndCats };
};

const getNewExercise = asyncHandler(async (req, res) => {
  const { allExercises, allDifficulties, allCategories } = await getData();
  res.render("newExercise", { allExercises, allDifficulties, allCategories });
});

const postNewExercise = asyncHandler(async (req, res) => {
  // clean user data
  if (typeof req.body["categoryFilter[]"] === "string")
    req.body["categoryFilter[]"] = [req.body["categoryFilter[]"]];
  req.body.exerciseName = capitalize(req.body.exerciseName.trim());
  if (!Number(req.body.prerequisite)) req.body.prerequisite = null;

  await query.createExercise(req.body);
  res.redirect("/exercises/");
});

module.exports = {
  getNewExercise,
  postNewExercise,
};
