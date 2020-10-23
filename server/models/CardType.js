const mongoose = require('mongoose')

const cardTypeSchema = new mongoose.Schema({
  book_id:{
    type:String,
    required:true,
    min:1
  },
  card_type:{
    type:String,
    required:true,
    min:1,
    max:255,
  },
  card_nick:{
    type:String,
    required:true,
    max:255,
    default:0
  },
  card_star:{
    type:Boolean,
    required:true,
    max:255,
    default:0
  },
  face_1:{
    type:Number,
    required:true,
    min:1,
    max:255,
  },
  face_2:{
    type:Number,
    min:1,
    max:255,
  },
  face_3:{
    type:Number,
    min:1,
    max:255
  },
  annotation:{
    type:Boolean,
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

const CardType =  mongoose.model('CardType', cardTypeSchema)

module.exports = { CardType }