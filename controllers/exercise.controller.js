const asyncHandler = require("express-async-handler");
const query = require("../db/queries");
const capitalize = require("../util/capitalize");
const ytToEmbed = require("../util/ytToEmbed");
const ytToImg = require("../util/ytToImg");
require("dotenv").config();

const getEditFormData = async () => {
  const allCategories = (await query.getCategories()).map((c) => ({
    ...c,
    name: capitalize(c.name),
  }));
  const allDifficulties = (await query.getDifficulties()).map((d) => ({
    ...d,
    name: capitalize(d.name),
  }));

  return { allCategories, allDifficulties };
};
const getExerciseByID = asyncHandler(async (req, res) => {
  const exercise = await query.getExerciseByID(req.params.exerciseID);

  let prerequisteExercise = await query.getExerciseByID(exercise.prerequisite);
  const categories = await query.getExerciseCategories(req.params.exerciseID);
  const difficulty = await query.getExerciseDifficulty(exercise.difficulty);
  const error = Number(req.query.error) === 1 ? true : false;
  const editAuth = Number(req.query.editAuth) === 1 ? true : false;

  const { allCategories, allDifficulties } = await getEditFormData();

  res.render("exercise", {
    error,
    editAuth,
    allCategories,
    allDifficulties,
    index: exercise.id,
    exercise,
    categories,
    difficulty,
    prereqID: prerequisteExercise ? prerequisteExercise.id : null,
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
  console.log(req.body);
  console.log(req.params);
  if (req.body.adminPassword === process.env.ADMIN_PASSWORD) {
    const row = await query.deleteExerciseByID(req.params.exerciseID);
    res.redirect("/exercises/");
  } else {
    res.redirect("./?error=1");
  }
});

const postEditExerciseAuth = asyncHandler(async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  if (req.body.adminPassword === process.env.ADMIN_PASSWORD) {
    res.redirect("./?editAuth=1");
  } else {
    res.redirect("./?error=1");
  }
});

module.exports = {
  getExerciseByID,
  postDeleteExercise,
  postEditExerciseAuth,
};
