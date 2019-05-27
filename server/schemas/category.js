const mongoose = require("mongoose")

module.exports = new mongoose.Schema({
    //分类名称
    catname: String,
    cateShort: String,
})
