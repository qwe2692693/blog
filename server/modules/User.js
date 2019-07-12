const mongoose = require('mongoose')
const usersSchemas = require('../schemas/user')
let date = new Date();

usersSchemas.pre('save', (next) => {
    this.addTime = date();
    next()
})
module.exports = mongoose.model('User', usersSchemas)