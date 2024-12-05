const asyncHandler = require("express-async-handler");
const query = require("../db/queries");
const capitalize = require("../util/capitalize");
const ytToEmbed = require("../util/ytToEmbed");
const ytToImg = require("../util/ytToImg");

const getExerciseByID = asyncHandler(async (req, res) => {
  const exercise = await query.getExerciseByID(req.params.exerciseID);

  let prerequisteExercise = await query.getExerciseByID(exercise.prerequisite);
  const exerciseCategories = await query.getExerciseCategories(
    req.params.exerciseID
  );
  const exerciseDifficulty = await query.getExerciseDifficulty(
    exercise.difficulty
  );

  res.render("exercise", {
    name: capitalize(exercise.name),
    index: exercise.id,
    prereqName: prerequisteExercise
      ? capitalize(prerequisteExercise.name)
      : null,
    embed: ytToEmbed(exercise.video_url),
    exercise: exercise,
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
  res.redirect("/exercises/");
});

module.exports = {
  getExerciseByID,
};
