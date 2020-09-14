const router = require('express').Router();
const { BookTitle } = require('../models/BookTitle');
const { User } = require("../models/User");

router.post('/naming', async (req, res) => {
  const useremail = await User.findOne({_id: req.body.userId}).exec();
  const bookExist = await BookTitle.findOne({user_email: useremail.email, book_title: req.body.book_title})
  const bookListOrder = await BookTitle.findOne({user_id: req.body.userId, category:req.body.category}).sort({ 'date' : -1 }).exec();

  if (!bookListOrder) {
    var listOrder = 0
  } else {
    var listOrder = bookListOrder.list_order
  }

  if (bookExist) {return res.status(400).json({'error':'동일한 이름의 책이 이미 존재합니다.'})}
  else {
      const bookTitle = new BookTitle({
        book_title: req.body.book_title,
        category: req.body.category,
        user_email: useremail.email,
        user_id: req.body.userId,
        division: '내자료',
        user_nick: useremail.name,
        total_pages: 0,
        recent_input: 0,
        single_cards: 0,
        dual_cards: 0,
        like: false,
        like_order: 0,
        list_order: listOrder + 1,
        hide_or_show: true,
      })
      try{
        const saveBookTitle = await bookTitle.save()
        res.send({book_title:bookTitle.book_title, category:bookTitle.category, user_email:bookTitle.user_email})
      }catch(err){
        res.status(400).send(err)
      }
    }
})

router.get('/get-book-title', async (req, res) => {
  const bookTitle = await BookTitle.findOne({user_id: req.query.userId}).sort({ 'date' : -1 }).exec();
  try{
    res.send({bookTitle})
  }catch(err){
    res.status(400).send(err)
  }
})

router.get('/get-all-title', async (req, res) => {
  const bookTitle = await BookTitle.find({user_id: req.query.userId}).sort({ 'category' : 1,'list_order': 1 }).exec();
  try{
    res.send({bookTitle})
  }catch(err){
    res.status(400).send(err)
  }
})

router.post('/like', async (req, res) => {
  const book = await BookTitle.findOne({_id: req.body.bookId})
  console.log(book)

  const update = { like: req.body.like };
  console.log(update)
  let doc = await BookTitle.findOneAndUpdate({_id: req.body.bookId}, update, {
    new: true
  });
  console.log(doc)

})

module.exports = router;
