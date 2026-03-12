const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/routes/authRoutes");
const serviceRoutes = require("./src/routes/serviceRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", (req,res)=>{
    res.json({
        status: "success",
        message: "Welcome to the AutoTrivo server"
    });
});

app.use("/api", authRoutes);
app.use("/api", serviceRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});