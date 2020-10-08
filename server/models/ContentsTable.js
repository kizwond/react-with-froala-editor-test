const mongoose = require('mongoose')

const ContentsTableSchema = new mongoose.Schema({
  book_title:{
    type:String,
    required:true,
    min:1
  },
  level:{
    type:Number,
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

const ContentsTable =  mongoose.model('ContentsTable', ContentsTableSchema)

module.exports = { ContentsTable }