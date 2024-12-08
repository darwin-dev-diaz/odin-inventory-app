const { Pool } = require("pg");
require("dotenv").config();

// if the DATABASE_URL file exists, that means the we are in railway. So use the railway db
// if not, we are in my PC so use the local db
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    })
  : new Pool({
      host: "localhost",
      user: "darwindiaz",
      database: "exercise_db",
      password: process.env.ROLE_PASSWORD,
      port: 5432,
    });

module.exports = pool;
