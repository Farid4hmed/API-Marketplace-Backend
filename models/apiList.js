const mongoose = require("mongoose");

const apiListModel = new mongoose.Schema(
    {apiName:{type:String, required:true}},
    {apiDesc:{type:String, required:true}},
    {apiImageUrl:{type:String, required:true}},
    {apiLink:{type:String, required:true}},
    {timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }}
);

module.exports = mongoose.model("apiListModel", apiListModel);
