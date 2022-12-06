const AuthModel = require("../models/authModel");

class AuthController {
  static async checkEmail(req, res) {
    try {
      const { email } = req.body;
      const isAvailable = await AuthModel.isEmailAvailable(email);
      if (isAvailable) {
        return res.status(200).json(true);
      } else return res.status(401).json(false);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server error");
    }
  }
  static async registerUser(req, res) {
    try {
      const { email, password, first_name, last_name } = req.body;
      const token = await AuthModel.register(
        email,
        password,
        first_name,
        last_name
      );
      if (token) {
        res.status(201).json({ token });
      } else {
        res.status(401).json("user already exists");
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server error");
    }
  }
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const token = await AuthModel.login(email, password);
      if(token) {
        return res.status(200).json({token})
      }
      else return res.status(401).json("password or email is incorrect")
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server Error");
    }
  }
  static async isVerified(req, res) {
    try {
      return res.status(200).json(true);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server Error");
    }
  }
}

module.exports = AuthController;
