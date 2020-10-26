const router = require('express').Router();
const { BookTitle } = require('../models/BookTitle');
const { User } = require("../models/User");
const { Category } = require("../models/Category");
const { ContentsTable } = require("../models/ContentsTable");
const { CardType } = require("../models/CardType");


//목차 추가
router.post('/add-card-type', async (req, res) => {
  console.log(req.body)

  const cardType = new CardType({
    book_id: req.body.book_id,
    card_type: req.body.card_type,
    card_nick: req.body.card_nick,
    card_star: req.body.card_star,
    face_1: req.body.face_1,
    face_2: req.body.face_2,
    face_3: req.body.face_3,
    user_id: req.body.userId,
    annotation: req.body.annotation,
  })
      
  const saveCardType = await cardType.save()
  const cardTypes = await CardType.find({user_id: req.body.userId, book_id:req.body.book_id}).sort({ 'date': 1 }).exec();
  try{
    res.send({cardTypes})
  }catch(err){
    res.status(400).send(err)
  }
})





module.exports = router;


