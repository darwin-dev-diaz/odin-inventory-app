const { Pool } = require("pg");
require("dotenv").config();

// local db
module.exports = new Pool({
  host: "localhost", // or wherever the db is hosted
  user: "darwindiaz",
  database: "exercise_db",
  password: process.env.ROLE_PASSWORD,
  port: 5432, // The default port
});
