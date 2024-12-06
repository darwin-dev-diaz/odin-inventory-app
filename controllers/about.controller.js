const asyncHandler = require("express-async-handler");
// const store = require("store2");

const getAbout = asyncHandler(async (req, res) => {
  res.render("about");
});

module.exports = {
  getAbout,
};
