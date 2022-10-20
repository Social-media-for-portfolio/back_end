const pool = require("../config/dbConfig");
const bcryt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

class AuthController {
  static async checkEmail(req, res) {
    try {
      const { email } = req.body;
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      if (user.rows.length !== 0) {
        res.status(401).json(false);
      } else res.status(200).json(true);
    } catch (error) {
      console.error(error);
      res.status(500).json("Server error");
    }
  }
  static async registerUser(req, res) {
    try {
      const { email, password, first_name, last_name } = req.body;
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (user.rows.length !== 0) {
        return res.status(401).send("user already exists");
      }

      const saltRounds = 10;
      const salt = await bcryt.genSalt(saltRounds);
      const bcrytPassword = await bcryt.hash(password, salt);

      const newUser = await pool.query(
        "INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *",
        [email, bcrytPassword, first_name, last_name]
      );
      const id = newUser.rows[0].id;
      const token = jwtGenerator(id);
      return res.json({ token, id });
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server error");
    }
  }
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const user = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (user.rows.length === 0) {
        return res.status(401).json("password or email is incorrect");
      }

      const validPassword = await bcryt.compare(
        password,
        user.rows[0].password
      );

      if (!validPassword) {
        return res.status(401).json("password or email is incorrect");
      }
      const id = user.rows[0].id;
      const token = jwtGenerator(id);

      return res.json({ token, id });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server Error");
    }
  }
  static async isVerified(req, res) {
    try {
      return res.json(true);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server Error");
    }
  }
}

module.exports = AuthController;
