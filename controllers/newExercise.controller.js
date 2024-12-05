const asyncHandler = require("express-async-handler");
const query = require("../db/queries");
const capitalize = require("../util/capitalize");
const getNewExercise = asyncHandler(async (req, res) => {
  const exercises = await query.getEverySkill();
  const categories = (await query.getCategories()).map((c) => ({
    ...c,
    name: capitalize(c.name),
  }));
  const difficulties = (await query.getDifficulties()).map((d) => ({
    ...d,
    name: capitalize(d.name),
  }));
  res.render("newExercise", { exercises, categories, difficulties });
});
const postNewExercise = asyncHandler(async (req, res) => {
  console.log(req.body);

  const exercises = await query.getEverySkill();
  const categories = (await query.getCategories()).map((c) => ({
    ...c,
    name: capitalize(c.name),
  }));
  const difficulties = (await query.getDifficulties()).map((d) => ({
    ...d,
    name: capitalize(d.name),
  }));
  res.render("newExercise", { exercises, categories, difficulties });
});

module.exports = {
  getNewExercise,
  postNewExercise,
};
