const asyncHandler = require("express-async-handler");
const query = require("../db/queries");
const capitalize = require("../util/capitalize");

const getData = async () => {
  const exercises = await query.getEverySkill();
  const categories = (await query.getCategories()).map((c) => ({
    ...c,
    name: capitalize(c.name),
  }));
  const difficulties = (await query.getDifficulties()).map((d) => ({
    ...d,
    name: capitalize(d.name),
  }));

  return { exercises, categories, difficulties };
};

const getNewExercise = asyncHandler(async (req, res) => {
  const { exercises, categories, difficulties } = await getData();
  res.render("newExercise", { exercises, categories, difficulties });
});

const postNewExercise = asyncHandler(async (req, res) => {
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
