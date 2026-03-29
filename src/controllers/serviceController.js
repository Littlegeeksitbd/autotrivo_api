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


exports.seedServices = async (req, res) => {

    const PLATFORMS = [
        { name:"NextBaji", sub:"nextbaji.b2clive.shop", emoji:"🎰", color:"#F59E0B", tag:"CASINO & BETTING", description:"Next-gen casino and sports betting with 12,000+ games, live dealers, game control panel, and international payment gateway." },
        { name:"Krikiya", sub:"krikiya.b2clive.shop", emoji:"🎯", color:"#A855F7", tag:"SPORTS BETTING", description:"Complete sports betting solution with 12,000+ games, cricket focus, game control options, and international payments." },
        { name:"MCW Letest", sub:"mcwletest.b2clive.shop", emoji:"🎮", color:"#06B6D4", tag:"CASINO & BETTING", description:"Latest MCW edition with 12,000+ games, enhanced UI, game control dashboard, and international payment integration." },
        { name:"Crickex", sub:"crickex.b2clive.shop", emoji:"🏏", color:"#22C55E", tag:"SPORTS BETTING", description:"Premier cricket exchange with 12,000+ games, real-time match data, full game control, and international payment gateway." },
        { name:"SuperBaji", sub:"superbaji.b2clive.shop", emoji:"⚡", color:"#EF4444", tag:"CASINO & BETTING", description:"Premium casino platform with proven reliability, game control dashboard, and international payment support." },
        { name:"GrapWin", sub:"grapwin.b2clive.shop", emoji:"💎", color:"#A855F7", tag:"CASINO", description:"Fresh casino with 12,000+ games, crash games, instant wins, game control panel, and international payment gateway." },
        { name:"GrapWin Green", sub:"grapwingreen.b2clive.shop", emoji:"🍀", color:"#22C55E", tag:"CASINO", description:"Green edition with 12,000+ games, eco-themed design, game control dashboard, and international payment gateway." },
        { name:"DarazPlay White", sub:"darazplaywhite.b2clive.shop", emoji:"🤍", color:"#94A3B8", tag:"CASINO", description:"Clean white-label edition with 12,000+ games, game control panel, international payments, and 24/7 support." },
        { name:"MaleBet", sub:"malebet.b2clive.shop", emoji:"⚽", color:"#F59E0B", tag:"SPORTS BETTING", description:"Sports-first betting with 12,000+ games, deep football coverage, game control options, and international payments." },
        { name:"DarazPlay Black", sub:"darazplayblack.b2clive.shop", emoji:"🖤", color:"#475569", tag:"CASINO", description:"Dark-themed premium casino with 12,000+ games, game control, and full international payment integration." },
        { name:"BajiLive", sub:"bajilive.b2clive.shop", emoji:"🔴", color:"#EF4444", tag:"CASINO & BETTING", description:"Live-first platform with 12,000+ games, real-time sports, game control options, and international payment gateway." },
        { name:"Agun88", sub:"agun88.b2clive.shop", emoji:"🔥", color:"#F97316", tag:"SPORTS BETTING", description:"Sports betting powerhouse with 12,000+ games, international payment gateway, and 24/7 dedicated support." },
        { name:"BajiBD", sub:"bajibd.shop", emoji:"🏆", color:"#06B6D4", tag:"CASINO & BETTING", description:"Bangladesh's leading casino & sports betting with 12,000+ games, game control, and international payments." },
        { name:"CK444", sub:"ck444.b2clive.shop", emoji:"🎲", color:"#8B5CF6", tag:"CASINO", description:"Premium casino gaming hub with 12,000+ games, full game control panel, and international payment support." }
    ];

    try {

        for (const p of PLATFORMS) {

            await pool.query(
                `INSERT INTO services
                (name, sub, description, emoji, color, tag, price, type,
                 games_count, games_control, payments, support, live_demo_link, extra_data, status)
                 VALUES
                ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`,
                [
                    p.name,
                    p.sub,
                    p.description,
                    p.emoji,
                    p.color,
                    p.tag,
                    199.99, // default price
                    "lifetime",
                    12000,
                    "Full Panel",
                    "International Gateway",
                    "24/7 Dedicated",
                    `https://${p.sub}`,
                    null,
                    "active"
                ]
            );

        }

        res.json({
            success: true,
            message: "Platforms seeded successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

};