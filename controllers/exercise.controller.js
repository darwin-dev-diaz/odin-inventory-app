const asyncHandler = require("express-async-handler");
const query = require("../db/queries");
const capitalize = require("../util/capitalize");
const ytToEmbed = require("../util/ytToEmbed");
const ytToImg = require("../util/ytToImg");
require("dotenv").config();

const getEditFormData = async () => {
  const allExercises = await query.getEverySkill();
  const allCategories = (await query.getCategories()).map((c) => ({
    ...c,
    name: capitalize(c.name),
  }));
  const allDifficulties = (await query.getDifficulties()).map((d) => ({
    ...d,
    name: capitalize(d.name),
  }));

  return { allExercises, allCategories, allDifficulties };
};
const getExerciseByID = asyncHandler(async (req, res) => {
  const exercise = await query.getExerciseByID(req.params.exerciseID);

  let prerequisteExercise = await query.getExerciseByID(exercise.prerequisite);
  const categories = await query.getExerciseCategories(req.params.exerciseID);
  const difficulty = await query.getExerciseDifficulty(exercise.difficulty);
  const error = Number(req.query.error) === 1 ? true : false;
  const editAuth = Number(req.query.editAuth) === 1 ? true : false;

  const { allExercises, allCategories, allDifficulties } =
    await getEditFormData();

  res.render("exercise", {
    error,
    editAuth,
    allExercises,
    allCategories,
    allDifficulties,
    index: exercise.id,
    exercise,
    categories,
    difficulty,
    prereqID: prerequisteExercise ? prerequisteExercise.id : null,
    videoUrl: exercise.video_url,
    name: capitalize(exercise.name),
    embed: ytToEmbed(exercise.video_url),
    imgUrl: ytToImg(exercise.video_url),
    prereqName: prerequisteExercise
      ? capitalize(prerequisteExercise.name)
      : null,
    prereqImgUrl: prerequisteExercise
      ? ytToImg(prerequisteExercise.video_url)
      : null,
  });
});

const postDeleteExercise = asyncHandler(async (req, res) => {
  if (req.body.adminPassword === process.env.ADMIN_PASSWORD) {
    const row = await query.deleteExerciseByID(req.params.exerciseID);
    res.redirect("/exercises/");
  } else {
    res.redirect("./?error=1");
  }
});

const postEditExerciseAuth = asyncHandler(async (req, res) => {
  if (req.body.adminPassword === process.env.ADMIN_PASSWORD) {
    res.redirect("./?editAuth=1");
  } else {
    res.redirect("./?error=1");
  }
});
const postEditExercise = asyncHandler(async (req, res) => {
  // clean data
  if (typeof req.body["categoryFilter[]"] === "string")
    req.body["categoryFilter[]"] = [req.body["categoryFilter[]"]];
  req.body.exerciseName = capitalize(req.body.exerciseName.trim());
  if (!Number(req.body.prerequisite)) req.body.prerequisite = null;
  req.body.id = req.params.exerciseID;

  if (req.body.adminPassword === process.env.ADMIN_PASSWORD) {
    await query.editExercise(req.body);
    res.redirect("./");
  } else {
    console.log("wrong password");
    res.redirect("./?error=1");
  }
});

module.exports = {
  getExerciseByID,
  postDeleteExercise,
  postEditExerciseAuth,
  postEditExercise,
};
