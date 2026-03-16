const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].password
        );

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user.rows[0].id, email: user.rows[0].email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            token,
            user: {
                id: user.rows[0].id,
                name: user.rows[0].name,
                phone: user.rows[0].phone,
                email: user.rows[0].email
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */

exports.register = async (req, res) => {

    const { name, email, password, phone } = req.body;

    try {

        // Check existing user
        const userExists = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user
        const newUser = await pool.query(
            `INSERT INTO users (name,email,password,phone)
             VALUES ($1,$2,$3,$4)
             RETURNING id,name,email`,
            [name, email, hashedPassword,phone]
        );

        // Generate token
        const token = jwt.sign(
            {
                id: newUser.rows[0].id,
                email: newUser.rows[0].email
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: newUser.rows[0]
        });

    } catch (error) {
        console.log(error)

        res.status(500).json({
            error: error.message
        });

    }

};

exports.me = async (req, res) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Token required" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await pool.query(
            "SELECT id,name,email FROM users WHERE id=$1",
            [decoded.id]
        );

        if (user.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            user: user.rows[0]
        });

    } catch (error) {

        res.status(401).json({
            message: "Invalid token"
        });

    }

};