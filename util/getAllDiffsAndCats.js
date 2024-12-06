const query = require("../db/queries");
const capitalize = require("./capitalize");

const getAllDiffsAndCats = async () => {
  const allDifficulties = (await query.getDifficulties()).map((difficulty) => ({
    ...difficulty,
    name: capitalize(difficulty.name),
  }));
  const allCategories = (await query.getCategories()).map((category) => ({
    ...category,
    name: capitalize(category.name),
  }));

  return { allDifficulties, allCategories };
};

module.exports = getAllDiffsAndCats;
