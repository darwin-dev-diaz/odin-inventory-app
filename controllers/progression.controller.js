const asyncHandler = require("express-async-handler");

const getProgression = asyncHandler(async (req, res) => {
  res.render("progression");
});

module.exports = {
  getProgression,
};
