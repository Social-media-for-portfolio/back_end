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
            const myInterests = await pool.query("SELECT * FROM interests WHERE user_id = $1", [req.user]);
            return res.status(200).json(myInterests.rows);
        } catch (error) {
            console.error(error);
            return res.status(500).json("Server error");
        }
    } 
    static async addInterests(req, res) {
        try {
            const {interests} = req.body;
            const insertInterests = async(arr) => {
                for(let interest of arr) {
                    await pool.query("INSERT INTO interests (user_id, interest) VALUES ($1, $2)", [req.user, interest])
                }
            }
            insertInterests(interests);
            return res.status(200).json("success");
        } catch (error) {
            console.error(error);
            return res.status(500).json("server error");
        }
    } 
    static async removeInterest(req, res) {
        try {
            const {interest} = req.body;
            const removedInterest = await pool.query("DELETE FROM interests WHERE interest = $1 AND user_id = $2 RETURNING *", [interest, req.user]);
            return res.status(200).json(removedInterest.rows);
        } catch (error) {
            console.error(error);
            return res.status(200).json("Server error");
        }
    } 
    static async setOnboarding(req, res) {
        try {
            await pool.query("UPDATE users SET onboarding = false WHERE id = $1", [req.user]);
            return res.status(200).json("onboarding completed")
        } catch (error) {
            console.error(error);
            return res.status(500).json("server error");
        }
    }
    static async checkOnboarding(req, res) {
        try {
           const status =  await pool.query("SELECT onboarding FROM users WHERE id = $1", [req.user]);
            return res.status(200).json(status.rows[0])
        } catch (error) {
            console.error(error);
            return res.status(500).json("server error");
        }
    }
}

module.exports = InterestController;