const asyncHandler = require("express-async-handler");
// const store = require("store2");

const getHome = asyncHandler(async (req, res) => {
  res.render("index");
});

module.exports = {
  getHome,
};
