const asyncHandler = require("express-async-handler");
const query = require("../db/queries");

const getProgression = asyncHandler(async (req, res) => {
  const test = await query.getProgressionByID(req.params.progressionID);
  console.log(test);
  res.render("progression");
});

module.exports = {
  getProgression,
};
  