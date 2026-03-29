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


exports.insertService = async (req, res) => {
    try {

        const {
            name,
            sub,
            description,
            emoji,
            color,
            tag,
            price,
            type,
            games_count,
            games_control,
            payments,
            support,
            live_demo_link,
            extra_data,
            status
        } = req.body;

        // validation
        if (!name || !sub || !emoji || !color || !tag || !price || !type) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing"
            });
        }

        const result = await pool.query(
            `INSERT INTO services
             (name, sub, description, emoji, color, tag, price, type,
              games_count, games_control, payments, support, live_demo_link, extra_data, status)
             VALUES
                 ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
                 RETURNING *`,
            [
                name,
                sub,
                description,
                emoji,
                color,
                tag,
                price,
                type,
                games_count,
                games_control,
                payments,
                support,
                live_demo_link,
                extra_data || null,
                status || "active"
            ]
        );

        res.json({
            success: true,
            message: "Service created successfully",
            data: result.rows[0]
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }
};

exports.getServices = async (req, res) => {
    try {

        const result = await pool.query(
            `SELECT * FROM services ORDER BY id DESC`
        );

        res.json({
            success: true,
            total: result.rows.length,
            data: result.rows
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }
};

exports.getServiceById = async (req, res) => {
    try {

        const { id } = req.params;

        const result = await pool.query(
            `SELECT * FROM services WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }

        res.json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }
};