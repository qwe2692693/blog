const mongoose = require('mongoose')
const CategorySchemas = require('../schemas/category')

module.exports = mongoose.model('Category', CategorySchemas)
