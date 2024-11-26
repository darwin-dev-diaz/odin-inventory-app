const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
// const store = require("store2");
// const formatDate = require("../util/formateDate");

const getTest = asyncHandler(async (req, res) => {
  const skills = db.getEverySkill();
  res.send(skills);
});

module.exports = {
  getTest,
};
