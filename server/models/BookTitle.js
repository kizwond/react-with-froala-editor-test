const mongoose = require('mongoose')


const bookTitleSchema = new mongoose.Schema({
  book_title:{
    type:String,
    required:true,
    min:1,
    max:255,
  },
  category:{
    type:String,
    required:true,
    min:1,
    max:255,
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
  }
})

const BookTitle =  mongoose.model('BookTitle', bookTitleSchema)

module.exports = { BookTitle }