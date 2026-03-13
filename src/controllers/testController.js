const pool = require("../config/db");

exports.testDB = async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};