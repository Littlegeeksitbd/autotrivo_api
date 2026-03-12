const pool = require("../config/db");

exports.getServices = async (req, res) => {

    try {

        const services = await pool.query(
            "SELECT * FROM services ORDER BY id DESC"
        );

        res.json(services.rows);

    } catch (error) {
        res.status(500).json(error.message);
    }

};