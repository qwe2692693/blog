const mongoose = require('mongoose')
const CategorySchemas = require('../schemas/category')
const date = require('../config/date')

CategorySchemas.pre('save', function(next) {
    let doc = this;
    this.addTime = date();
    CategoryModel.findOneAndUpdate({
        seq: 'entityId'
    }, { $inc: { id: 1 } }, { new: true, upsert: true }, function(err, counter) {
        doc.id = counter.id;
        next()
    })
})
const CategoryModel = mongoose.model('Category', CategorySchemas)

module.exports = CategoryModel;