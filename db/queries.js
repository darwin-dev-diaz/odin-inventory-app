const pool = require("./pool");
const capitalize = require("../util/capitalize");
const ytToImg = require("../util/ytToImg");

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

async function getExerciseDifficulty(difficulty_id) {
  const output = (
    await pool.query("SELECT name FROM difficulty WHERE id = $1", [
      difficulty_id,
    ])
  ).rows[0].name;

  return capitalize(output);
}

async function getAllProgressions() {
  let { rows } = await pool.query(
    "SELECT array_agg(json_build_object('name', skills.name, 'end_skill_id', progression.end_skill_id, 'video_url', skills.video_url)) AS progression_details FROM progression INNER JOIN skills ON progression.skill_id = skills.id  GROUP BY progression.end_skill_id ORDER BY end_skill_id ASC"
  );
  rows = rows.map((row) => row.progression_details);
  rows = rows.map((row) =>
    row.map((exercise) => ({
      ...exercise,
      video_url: ytToImg(exercise.video_url),
    }))
  );

  const names = (
    await pool.query(
      "SELECT name FROM skills, (SELECT end_skill_id FROM progression GROUP BY end_skill_id ORDER BY end_skill_id ) AS end_table WHERE skills.id = end_table.end_skill_id ORDER BY id"
    )
  ).rows;

  return [rows, names];
}

async function getProgressionByID(end_skill_id) {
  const { rows } = await pool.query(
    "SELECT * FROM progression LEFT JOIN skills ON progression.skill_id = skills.id WHERE end_skill_id = $1 ORDER BY progression_order DESC",
    [end_skill_id]
  );
  return rows;
}

module.exports = {
  getEverySkill,
  getExerciseByID,
  getExerciseCategories,
  getExerciseDifficulty,
  getAllProgressions,
  getProgressionByID,
};
