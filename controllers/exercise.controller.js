const asyncHandler = require("express-async-handler");
const query = require("../db/queries");
const capitalize = require("../util/capitalize");
const ytToEmbed = require("../util/ytToEmbed");

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
    prereqName: prerequisteExercise
      ? capitalize(prerequisteExercise.name)
      : null,
    embed: ytToEmbed(exercise.video_url),
    exercise: exercise,
    prereqID: prerequisteExercise ? prerequisteExercise.id : null,
    categories: exerciseCategories,
    difficulty: exerciseDifficulty,
  });
});

module.exports = {
  getExerciseByID,
};
