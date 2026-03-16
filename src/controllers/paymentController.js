const pool = require("../config/db");
const axios = require("axios");

exports.verifyPayment = async (req, res) => {

    try {

        const MERCHANT_WALLET = "TPex51P9LJ6yVzoUdxTdkj2zJzqjA9tdgH";

            const { orderId, txid, wallet } = req.body;

            if (!orderId || !txid || !wallet) {
                return res.status(400).json({ error: "Missing parameters" });
            }

            try {
                const url = `https://apilist.tronscanapi.com/api/transaction-info?hash=${txid}`;
                const response = await axios.get(url);
                const data = response.data;
                if (data.contractRet !== "SUCCESS") {
                    return res.json({ status: "failed", message: "Transaction failed" });
                }
                const transfer = data.trc20TransferInfo[0];
                const toAddress = transfer.to_address;
                const amount = parseFloat(transfer.amount_str) / 1000000;

                if (toAddress !== MERCHANT_WALLET) {
                    return res.json({ status: "failed", message: "Wrong wallet address" });
                }

                return res.json({
                    status: "success",
                    orderId,
                    amount,
                    txid
                });

            } catch (error) {
                return res.status(500).json({ error: "Verification failed" });
            }

    } catch (error) {
        res.status(500).json(error.message);
    }

};