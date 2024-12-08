const { Pool } = require("pg");
require("dotenv").config();

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