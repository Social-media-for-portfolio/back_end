const Pool = require("pg").Pool;

const development = {
  user: "postgres",
  password: "secretpassword",
  host: "localhost",
  port: 5432,
  database: "social_media",
};

const production = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? production : development
);
module.exports = pool;
