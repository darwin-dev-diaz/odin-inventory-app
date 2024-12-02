const asyncHandler = require("express-async-handler");
const query = require("../db/queries");

const getProgressions = asyncHandler(async (req, res) => {
  const [progressionsArrs, namesArr] = await query.getAllProgressions();

  res.render("progressions", {
    progressionsArrs: progressionsArrs,
    namesArr: namesArr,
  });
});

module.exports = {
  getProgressions,
};
