const pool = require("../config/dbConfig");
const jwtGenerator = require("../utils/jwtGenerator");
const bcrypt = require("bcrypt");

class AuthModel {
  static async isEmailAvailable(email) {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length > 0) {
      return false;
    } else return true;
  }
  static async register(email, password, first_name, last_name) {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      return false;
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, bcryptPassword, first_name, last_name]
    );
    const id = newUser.rows[0].id;
    const token = jwtGenerator(id);
    return token;
  }
  static async login(email, password) {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (user.rows.length < 1) {
        return false;
      }

      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );

      if (!validPassword) {
        return false;
      }
      const id = user.rows[0].id;
      const token = jwtGenerator(id);

      return token;
  }
}

module.exports = AuthModel;
