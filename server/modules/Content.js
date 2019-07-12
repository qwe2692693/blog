const mongoose = require('mongoose')
const ContentSchemas = require('../schemas/content')
const date = require('../config/date')
    //格式化时间
ContentSchemas.pre('save', function(next) {
    this.addTime = date();
    next()
});
module.exports = mongoose.model('Content', ContentSchemas)