const mongoose = require('mongoose')
const CategorySchemas = require('../schemas/category')

CategorySchemas.pre('save', function(next) {
    CategoryModel.updateMany({
        seq: 'entityId'
    }, { $inc: { id: 1 } }, function(err, ps) {
        this.id = ps.id
    })
    next()
})

const CategoryModel = mongoose.model('Category', CategorySchemas)
module.exports = CategoryModel;