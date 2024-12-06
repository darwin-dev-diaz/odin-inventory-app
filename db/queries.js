const pool = require("./pool");
const capitalize = require("../util/capitalize");
const ytToImg = require("../util/ytToImg");

async function getEveryExercise() {
  let { rows } = await pool.query("SELECT * FROM skills ORDER BY id DESC");
  rows = rows.map((row) => ({ ...row, image_url: ytToImg(row.video_url) }));
  return rows;
}
async function searchExercisesByName(str) {
  const query = "SELECT * FROM skills WHERE lower(name) LIKE $1";
  const arr = ["%" + str.toLowerCase() + "%"];
  let { rows } = await pool.query(query, arr);
  rows = rows.map((row) => ({ ...row, image_url: ytToImg(row.video_url) }));
  return rows;
}
async function filterExercisesByDifficulty(arr) {
  const query =
    "SELECT * FROM skills WHERE difficulty IN (" +
    arr.map((_, i) => `$${i + 1}`).join(", ") +
    ")";
  let { rows } = await pool.query(query, arr);
  rows = rows.map((row) => ({ ...row, image_url: ytToImg(row.video_url) }));
  return rows;
}
async function filterExercisesByCategory(arr) {
  const query =
    "SELECT DISTINCT s.* FROM skills AS s INNER JOIN skills_category AS sc ON s.id = sc.skill_id WHERE sc.category_id IN (" +
    arr.map((_, i) => `$${i + 1}`).join(", ") +
    ")";
  let { rows } = await pool.query(query, arr);
  rows = rows.map((row) => ({ ...row, image_url: ytToImg(row.video_url) }));
  return rows;
}
async function getExerciseByID(exerciseID) {
  const { rows } = await pool.query("SELECT * FROM skills WHERE id = $1", [
    exerciseID,
  ]);
  return rows[0];
}
async function getDifficulties(arr) {
  const { rows } = arr
    ? await pool.query(
        "SELECT name FROM difficulty WHERE id IN (" +
          arr.map((_, i) => `$${i + 1}`).join(", ") +
          ")",
        arr
      )
    : await pool.query("SELECT * FROM difficulty");
  return rows;
}
async function getCategories(arr) {
  const { rows } = arr
    ? await pool.query(
        "SELECT * FROM category WHERE id IN (" +
          arr.map((_, i) => `$${i + 1}`).join(", ") +
          ")",
        arr
      )
    : await pool.query("SELECT * FROM category");
  return rows;
}
async function getExerciseCategories(exerciseID) {
  let rows = (
    await pool.query(
      "SELECT category_id FROM skills_category WHERE skill_id = $1",
      [exerciseID]
    )
  ).rows.map((catObj) => catObj.category_id);

  const query =
    "SELECT name FROM category WHERE id = " +
    rows.map((_, index) => `$${index + 1}`).join(" OR id = ");

  const categories = (await pool.query(query, rows)).rows.map((catObj) =>
    capitalize(catObj.name)
  );

  return categories;
}
async function getExerciseDifficulty(difficulty_id) {
  const difficulty = (
    await pool.query("SELECT name FROM difficulty WHERE id = $1", [
      difficulty_id,
    ])
  ).rows[0].name;

  return capitalize(difficulty);
}
async function getAllProgressions() {
  let { rows } = await pool.query(
    "SELECT array_agg(json_build_object('name', skills.name, 'end_skill_id', progression.end_skill_id, 'video_url', skills.video_url)) AS progression_details FROM progression INNER JOIN skills ON progression.skill_id = skills.id  GROUP BY progression.end_skill_id ORDER BY end_skill_id ASC"
  );
  rows = rows
    .map((row) => row.progression_details)
    .map((row) =>
      row.map((exercise) => ({
        ...exercise,
        image_url: ytToImg(exercise.video_url),
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
  let { rows } = await pool.query(
    "SELECT * FROM progression LEFT JOIN skills ON progression.skill_id = skills.id WHERE end_skill_id = $1 ORDER BY progression_order DESC",
    [end_skill_id]
  );
  rows = rows.map((exercise) => ({
    ...exercise,
    image_url: ytToImg(exercise.video_url),
  }));
  return rows;
}
async function createExercise(params) {
  // check user input one more time before accessing db
  const checks = () => {
    return (
      typeof params.exerciseName === "string" &&
      typeof params.exerciseDescription === "string" &&
      typeof params.exerciseVideoUrl === "string" &&
      typeof Number(params.difficultyFilter) === "number" &&
      Number(params.difficultyFilter) > 0 &&
      typeof Number(params.prerequisite) === "number" &&
      Number(params.prerequisite) > -1 &&
      typeof params["categoryFilter[]"] === "object" &&
      !!params["categoryFilter[]"].length
    );
  };

  // enter data into skills table
  const query1 =
    "INSERT INTO skills(name, description, difficulty, prerequisite, video_url) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const arr1 = [
    params.exerciseName,
    params.exerciseDescription,
    params.difficultyFilter,
    params.prerequisite,
    params.exerciseVideoUrl,
  ];
  const res1 = checks() ? await pool.query(query1, arr1) : false;

  // get next row entry
  const exerciseID = Number(
    (await pool.query("SELECT id AS exact_count FROM skills ORDER BY id DESC"))
      .rows[0].exact_count
  );

  // enter data into skills_category table
  const query2 =
    "INSERT INTO skills_category (skill_id, category_id) VALUES " +
    params["categoryFilter[]"]
      .map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`)
      .join(", ") +
    " RETURNING *";
  const arr2 = params["categoryFilter[]"].flatMap((c) => [exerciseID, c]);
  const res2 = checks() ? await pool.query(query2, arr2) : false;
}
async function deleteExerciseByID(exerciseID) {
  const { rows } = pool.query("DELETE FROM skills WHERE id = $1 RETURNING *", [
    exerciseID,
  ]);
  return rows;
}
async function editExercise(params) {
  // check user input one more time before accessing db
  const checks = () => {
    return (
      typeof params.exerciseName === "string" &&
      typeof params.exerciseDescription === "string" &&
      typeof params.exerciseVideoUrl === "string" &&
      typeof Number(params.difficultyFilter) === "number" &&
      Number(params.difficultyFilter) > 0 &&
      typeof Number(params.prerequisite) === "number" &&
      Number(params.prerequisite) > -1 &&
      typeof params["categoryFilter[]"] === "object" &&
      !!params["categoryFilter[]"].length &&
      Number(params.prerequisite) !== Number(params.id)
    );
  };

  // update data on the skills table by the exercise id
  const query1 =
    "UPDATE skills SET name = $1, description = $2, difficulty = $3, prerequisite = $4, video_url = $5 WHERE id = $6";
  const arr1 = [
    params.exerciseName,
    params.exerciseDescription,
    params.difficultyFilter,
    params.prerequisite,
    params.exerciseVideoUrl,
    params.id,
  ];
  const res1 = checks() ? await pool.query(query1, arr1) : false;

  // category skills wipe
  const query2 = "DELETE FROM skills_category WHERE skill_id = $1";
  const arr2 = [params.id];
  const res2 = checks() ? await pool.query(query2, arr2) : false;

  // insert int
  const query3 =
    "INSERT INTO skills_category (skill_id, category_id) VALUES " +
    params["categoryFilter[]"]
      .map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`)
      .join(", ") +
    " RETURNING *";
  const arr3 = params["categoryFilter[]"].flatMap((c) => [params.id, c]);
  const res3 = checks() ? await pool.query(query3, arr3) : false;

  return { res1, res2, res3 };
}
module.exports = {
  getEveryExercise,
  getExerciseByID,
  getExerciseCategories,
  getExerciseDifficulty,
  getAllProgressions,
  getProgressionByID,
  getDifficulties,
  getCategories,
  filterExercisesByDifficulty,
  filterExercisesByCategory,
  searchExercisesByName,
  createExercise,
  deleteExerciseByID,
  editExercise,
};
