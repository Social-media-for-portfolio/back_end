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
      const { email, password, username } = req.body;
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
        "INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *",
        [email, bcrytPassword, username]
      );

      const token = jwtGenerator(newUser.rows[0].id);
      return res.json({ token });
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
      const token = jwtGenerator(user.rows[0].id);

      return res.json({ token });
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
