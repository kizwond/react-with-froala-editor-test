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
    editor1: req.body.editor1,
    editor2: req.body.editor2,
    editor3: req.body.editor3,
    editor4: req.body.editor4,
    editor5: req.body.editor5,
    editor6: req.body.editor6,
    editor7: req.body.editor7,
    editor8: req.body.editor8,
    editor9: req.body.editor9,
    editor10: req.body.editor10,
    editor11: req.body.editor11,
    editor12: req.body.editor12,
    editor13: req.body.editor13,
    editor14: req.body.editor14,
    editor15: req.body.editor15,
    book_title: req.body.bookTitle,
    category: req.body.category,
    user_email: req.body.userEmail,
    user_id: req.body.userId,
  })

  const saveContents = await newContents.save()
  const contents = await Contents.find({user_id: req.body.userId, book_title:req.body.bookTitle, category:req.body.category}).sort({ 'category_order': 1 }).exec();
  try{
    res.send({contents})
  }catch(err){
    res.status(400).send(err)
  }
})

module.exports = router;
 