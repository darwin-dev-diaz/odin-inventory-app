const pool = require("./pool");
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

module.exports = {
  getEverySkill,
  getExerciseByID,
};
