const pool = require("./pool");
async function getEverySkill() {
  const { rows } = await pool.query("SELECT * FROM skills ORDER BY id LIMIT 1");
  console.log(rows);
  return rows;
}

module.exports = {
  getEverySkill,
};
