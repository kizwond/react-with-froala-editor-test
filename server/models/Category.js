const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  category_name:{
    type:String,
    required:true,
    min:1,
    max:255,
  },
  category_order:{
    type:Number,
    required:true,
    max:255,
    default:0
  },
  contents_quantity:{
    type:Number,
    required:true,
    max:255,
    default:0
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
  user_nick:{
    type:String,
    required:true,
    min:1,
    max:255
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

const Category =  mongoose.model('Category', categorySchema)

module.exports = { Category }