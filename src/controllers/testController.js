const pool = require("../config/db");

exports.testDB = async (req, res) => {

    try {
        const res = await pool.query("SELECT NOW()");
       // console.log(res.rows)
        res.json({response:res.rows ,
        url: process.env.DATABASE_URL});

    } catch (error) {
        res.status(500).json(error.message);
    }

};