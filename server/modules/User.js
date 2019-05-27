const mongoose = require('mongoose')
const usersSchemas = require('../schemas/user')

module.exports = mongoose.model('User', usersSchemas)
