const pool = require("../config/dbConfig");

class InterestController {
    static async getInterestsForAllUsers(req, res) {
        try {
            const interests = await pool.query("SELECT * FROM interests");
            return res.status(200).json(interests.rows);
        } catch (error) {
            console.error(error);
            return res.status(500).json("server error");
        }
    } 
    static async getMyIntersts(req, res) {
        try {
            const myInterests = await pool.query("SELECT * FROM intersts WHERE user_id = $1", [req.user]);
            return res.status(200).json(myInterests.rows);
        } catch (error) {
            console.error(error);
            return res.status(500).json("Server error");
        }
    } 
    static async addInterest(req, res) {
        try {
            const {interest} = req.body;
            const newInterest = await pool.query("INSERT INTO interests (user_id, interest) VALUES ($1, $2) RETURNING *", [req.user, interest]);
            return res.status(200).json(newInterest.rows);
        } catch (error) {
            console.error(error);
            return res.status(500).json("server error");
        }
    } 
    static async removeInterest() {
        try {
            const {interest} = req.body;
            const removedInterests = await pool.query("DELETE FROM interests WHERE interest = $1 AND user_id = $2 RETURNING *", [interest, req.user]);
            return res.status(500).json("Server error");
        } catch (error) {
            console.error(error);
            return res.status(200).json("Server error");
        }
    } 
}

module.exports = InterestController;