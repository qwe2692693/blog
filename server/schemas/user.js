const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  _id:{
    type:mongoose.Schema.Types.ObjectId,
    default:mongoose.Types.ObjectId
  },
  nickname:String,
  email:String,
  username:String,
  password:String,
  isAdmin: {
    type: Boolean,
    default: false
  }
})
