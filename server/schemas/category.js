const mongoose = require("mongoose")
const categoreSchema = new mongoose.Schema({
    // //分类名称
    id: { type: Number, default: 1 },
    pid: { type: Number, default: 0 },
    seq: { type: String, default: 'entityId' },
    catname: String,
    cateDes: String,
    cateContent: String,
    cateImg: String,
    addTime: String,
})

module.exports = categoreSchema;