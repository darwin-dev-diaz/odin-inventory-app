const pool = require("./pool");
const capitalize = require("../util/capitalize");

async function getEverySkill() {
  const { rows } = await pool.query("SELECT * FROM skills ORDER BY id");
  return rows;
}

async function getExerciseByID(exerciseID) {
  const { rows } = await pool.query("SELECT * FROM skills WHERE id = $1", [
    exerciseID,
  ]);
  return rows[0];
}

async function getExerciseCategories(exerciseID) {
  let rows = (
    await pool.query(
      "SELECT category_id FROM skills_category WHERE skill_id = $1",
      [exerciseID]
    )
  ).rows.map((catObj) => catObj.category_id);

  const placeholders = rows
    .map((_, index) => `$${index + 1}`)
    .join(" OR id = ");
  const query = "SELECT name FROM category WHERE id = " + placeholders;
  const output = (await pool.query(query, rows)).rows.map((catObj) =>
    capitalize(catObj.name)
  );

  return output;
}

module.exports = {
  getEverySkill,
  getExerciseByID,
  getExerciseCategories,
};
