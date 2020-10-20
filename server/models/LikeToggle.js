const mongoose = require('mongoose')

const LikeToggleSchema = new mongoose.Schema({
  toggle:{
    type:Boolean,
    required:true,
    min:1,
    max:255,
    default:true
  },
  user_id:{
    type:String,
    required:true,
    min:1,
    max:255,
  },
  date:{
    type:Date,
    default:Date.now
  },
  update_date:{
    type:Date,
    default:Date.now
  }
})

const LikeToggle =  mongoose.model('LikeToggle', LikeToggleSchema)

module.exports = { LikeToggle }