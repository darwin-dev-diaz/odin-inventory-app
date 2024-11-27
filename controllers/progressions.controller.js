const asyncHandler = require("express-async-handler");

const getProgressions = asyncHandler(async (req, res) => {
  res.render("progressions");
});

module.exports = {
    getProgressions,
};
