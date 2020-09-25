const mongoose = require('mongoose')

const ContentsSchema = new mongoose.Schema({
  contents:{
    type:String,
    required:true,
    min:1
  },
  book_title:{
    type:String,
    required:true,
    min:1
  },
  category:{
    type:String,
    required:true,
    min:1
  },
  user_email:{
    type:String,
    required:true,
    min:1,
    max:255,
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

const Contents =  mongoose.model('Contents', ContentsSchema)

module.exports = { Contents }