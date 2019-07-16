const mongoose = require('mongoose')
const usersSchemas = require('../schemas/user')
const date = require('../config/date');

usersSchemas.pre('save', function(next) {
    this.addTime = date();
    next()
})
module.exports = mongoose.model('User', usersSchemas)