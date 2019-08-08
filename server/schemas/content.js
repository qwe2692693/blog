const mongoose = require("mongoose")

module.exports = new mongoose.Schema({
    //关联表字段--分类ID
    category: {
        type: mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'Category'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'User'
    },
    addTime: String,
    addView: {
        type: Number,
        default: 0
    },
    //标题
    title: String,
    //简介
    description: {
        type: String,
        default: ''
    },
    //内容
    content: {
        type: String,
        default: ''
    },
    contentImg: String,
    homePageTj: 0,
})