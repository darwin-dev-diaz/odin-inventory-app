const asyncHandler = require("express-async-handler");
const query = require("../db/queries");
const capitalize = require("../util/capitalize");
const ytToEmbed = require("../util/ytToEmbed");
const ytToImg = require("../util/ytToImg");
require("dotenv").config();
const url = require("url");

const getExerciseByID = asyncHandler(async (req, res) => {
  const exercise = await query.getExerciseByID(req.params.exerciseID);

  let prerequisteExercise = await query.getExerciseByID(exercise.prerequisite);
  const exerciseCategories = await query.getExerciseCategories(
    req.params.exerciseID
  );
  const exerciseDifficulty = await query.getExerciseDifficulty(
    exercise.difficulty
  );
  const error = Number(req.query.error) === 1 ? true : false;

  res.render("exercise", {
    error,
    name: capitalize(exercise.name),
    index: exercise.id,
    prereqName: prerequisteExercise
      ? capitalize(prerequisteExercise.name)
      : null,
    embed: ytToEmbed(exercise.video_url),
    exercise,
    prereqID: prerequisteExercise ? prerequisteExercise.id : null,
    categories: exerciseCategories,
    difficulty: exerciseDifficulty,
    imgUrl: ytToImg(exercise.video_url),
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

module.exports = {
  getExerciseByID,
  postDeleteExercise,
};
