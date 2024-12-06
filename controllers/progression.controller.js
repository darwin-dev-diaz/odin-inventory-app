const asyncHandler = require("express-async-handler");
const query = require("../db/queries");

const getProgression = asyncHandler(async (req, res) => {
  const rows = await query.getProgressionByID(req.params.progressionID);

  res.render("progression", {
    name: rows[0].name,
    progressionArr: rows,
  });
});

module.exports = {
  getProgression,
};
