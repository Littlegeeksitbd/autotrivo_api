const pool = require("../config/db");

exports.testDB = async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createTables = async (req, res) => {
    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        // 🔴 Drop existing tables first
        await client.query(`
            DROP TABLE IF EXISTS
                transactions,
                order_items,
                orders,
                services,
                payment_info,
                users
                CASCADE;
        `);

        // USERS
        await client.query(`
            CREATE TABLE users (
                                   id SERIAL PRIMARY KEY,
                                   email VARCHAR(255) UNIQUE NOT NULL,
                                   password TEXT NOT NULL,
                                   name VARCHAR(150) NOT NULL,
                                   phone VARCHAR(20),
                                   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // SERVICES
        await client.query(`
            CREATE TABLE services (
                                      id SERIAL PRIMARY KEY,
                                      name VARCHAR(255) NOT NULL,
                                      subtitle VARCHAR(255) NOT NULL,
                                      description TEXT,
                                      icon VARCHAR(255) NOT NULL,
                                      genre VARCHAR(255) NOT NULL,
                                      price NUMERIC(10,2) NOT NULL,
                                      type VARCHAR(50) NOT NULL,
                                      games_count INTEGER NOT NULL,
                                      games_control VARCHAR(255) NOT NULL,
                                      payments VARCHAR(255) NOT NULL,
                                      support VARCHAR(255) NOT NULL,
                                      live_demo_link VARCHAR(255) NOT NULL,
                                      extra_data JSONB,
                                      status VARCHAR(50) DEFAULT 'active',
                                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // ORDERS
        await client.query(`
            CREATE TABLE orders (
                                    id SERIAL PRIMARY KEY,
                                    user_id INT NOT NULL,
                                    total_amount NUMERIC(10,2) NOT NULL,
                                    service_ids INT[],
                                    status VARCHAR(50) DEFAULT 'pending',
                                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // ORDER ITEMS
        await client.query(`
            CREATE TABLE order_items (
                                         id SERIAL PRIMARY KEY,
                                         order_id INT NOT NULL,
                                         service_id INT NOT NULL,
                                         amount NUMERIC(10,2),
                                         status VARCHAR(50) DEFAULT 'pending',
                                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // TRANSACTIONS
        await client.query(`
            CREATE TABLE transactions (
                id SERIAL PRIMARY KEY,
                user_id INT NOT NULL,
                order_id INT,
                amount NUMERIC(10,2),
                trxid VARCHAR(150) UNIQUE,
                merchant_id VARCHAR(150),
                status VARCHAR(50) DEFAULT 'pending',
                note TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // PAYMENT INFO
        await client.query(`
            CREATE TABLE payment_info (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50),
                method VARCHAR(50),
                merchant_id VARCHAR(50),
                channel VARCHAR(150),
                status VARCHAR(50) DEFAULT 'active',
                note TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await client.query("COMMIT");

        res.json({
            success: true,
            message: "Database reset and tables created successfully"
        });

    } catch (error) {

        await client.query("ROLLBACK");

        res.status(500).json({
            success: false,
            error: error.message
        });

    } finally {
        client.release();
    }
};