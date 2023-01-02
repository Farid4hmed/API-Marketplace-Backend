const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const initDB = require("./config/db.js");
const express = require("express");
const app = express();

initDB();

app.get("/api/health", (req, res) => {
    res.send({
        time: new Date(),
        server: "Shuffle Backend",
        status: "Active",
    });
});




const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.listen(port, function(req, res){
    console.log(`Express server is up and running at http://${host}:${port}`);
});

