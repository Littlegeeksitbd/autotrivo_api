const pool = require("../config/db");

exports.testDB = async (req, res) => {

    try {
        const res = await pool.query("SELECT NOW()");
       // console.log(res.rows)
        res.json(res.rows);

    } catch (error) {
        res.status(500).json(error.message);
    }

};