const router = require('express').Router();
const { BookTitle } = require('../models/BookTitle');
const { User } = require("../models/User");
const { Category } = require("../models/Category");
const { Contents } = require("../models/Contents");

//컨텐츠 불러오기
router.get('/get-contents', async (req, res) => {
  console.log(req.body)
})
//카테고리 추가
router.post('/add-contents', async (req, res) => {
  console.log(req.body)

  const newContents = new Contents({
    contents: req.body.content,
    book_title: req.body.bookTitle,
    category: req.body.category,
    user_email: req.body.userEmail,
    user_id: req.body.userId,
  })

  const saveContents = await newContents.save()
  const content = await Contents.find({user_id: req.body.userId, book_title:req.body.bookTitle, category:req.body.category}).sort({ 'category_order': 1 }).exec();
  try{
    res.send({content})
  }catch(err){
    res.status(400).send(err)
  }
})

module.exports = router;
