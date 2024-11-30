const pool = require("./pool");
async function getEverySkill() {
  const { rows } = await pool.query("SELECT * FROM skills ORDER BY id");
  return rows;
}

module.exports = {
  getEverySkill,
};
