const mongoose = require('mongoose')
const usersSchemas = require('../schemas/user')
usersSchemas.pre('save', (next) => {
    let date = new Date();
    this.addTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    next()
})
module.exports = mongoose.model('User', usersSchemas)