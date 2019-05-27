const mongoose = require('mongoose')
const ContentSchemas = require('../schemas/content')
//格式化时间
ContentSchemas.pre('save', function(next){
    var date = new Date();
    this.addTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    next()
});
module.exports = mongoose.model('Content', ContentSchemas)