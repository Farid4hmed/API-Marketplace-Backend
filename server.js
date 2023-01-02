const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const initDB = require("./config/db.js");
const express = require("express");
const app = express();
const user = require("./routes/public.js");
initDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/api/health", (req, res) => {
    res.send({
        time: new Date(),
        server: "Shuffle Backend",
        status: "Active",
    });
});

app.use("/api/user", user);

// route not found middleware
app.use((req, res, next) =>
    res.status(404).send("You are looking for something that we do not have!")
);

//error handler middleware
app.use((err, req, res, next) => {
    res.status(500).send("Something went wrong! Please try after some time.");
});





const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.listen(port, function(req, res){
    console.log(`Express server is up and running at http://${host}:${port}`);
});

