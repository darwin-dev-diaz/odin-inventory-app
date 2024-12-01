const asyncHandler = require("express-async-handler");
const query = require("../db/queries");
const capitalize = require("../util/capitalize");
const ytToEmbed = require("../util/ytToEmbed");

const getExerciseByID = asyncHandler(async (req, res) => {
  const exercise = await query.getExerciseByID(req.params.exerciseID);
  const prerequisteExercise = await query.getExerciseByID(
    exercise.prerequisite
  );
  res.render("exercise", {
    name: capitalize(exercise.name),
    prereqName: capitalize(prerequisteExercise.name),
    embed: ytToEmbed(exercise.video_url),
    exercise: exercise,
    prereqExercise: prerequisteExercise,
  });
});

module.exports = {
  getExerciseByID,
};
