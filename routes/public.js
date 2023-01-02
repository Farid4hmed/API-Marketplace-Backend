const { Router } = require("express");
const route = Router();
const express = require("express");
const app = express();
const userModel = require("../models/user");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

var jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

route.post("/login", async (req, res, next) => {
    try{
        const username = req.body.username;
        const password = req.body.password;
        const payload = { username: username };

        if (!username || !password) {
            result = "Invalid credentials";
            return;
        }

        const registered = await userModel.findOne({username: username, password: password});

        if(!registered){
            const newUser = { username: username, password: password};
            await userModel.create(newUser);
        }

        const token = await generateAuthToken(payload);
        return token;
    }
    catch(err){
        console.log(err);
        next(err);
    }
});

async function generateAuthToken(payload) {
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        algorithm: "HS256"
    });
    return accessToken;
}

//User Authentication Middleware
async function verifyAuthToken(token, callback, next) {
    try {
        callback(null, jwt.verify(token, ACCESS_TOKEN_SECRET));
        next();
    } catch (err) {
        console.error(new Date(), "Invalid token! - ", token);
        return {};
    }
}

module.exports = route;