const { Pool } = require("pg");
require("dotenv").config();

// local db
module.exports = new Pool({
  host: "localhost", 
  user: "darwindiaz",
  database: "exercise_db",
  password: process.env.ROLE_PASSWORD,
  port: 5432, 
});
