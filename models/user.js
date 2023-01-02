const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
    {username:{type:String, required:true, unique:true}},
    {password:{type:String, required:true}},
    {timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }}
);

module.exports = mongoose.model("userModel", userModel);