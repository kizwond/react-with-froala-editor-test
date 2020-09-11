const router = require('express').Router();
const { BookTitle } = require('../models/BookTitle');
const { User } = require("../models/User");
// const {registerValidation,loginValidation}= require('../validation')


router.post('/naming', async (req, res) => {
  const useremail = await User.findOne({_id: req.body.userId}, 'email').exec();

  const bookExist = await BookTitle.findOne({user_email: useremail.email, book_title: req.body.book_title})
  console.log(bookExist)
  if (bookExist) {return res.status(400).json({'error':'동일한 이름의 책이 이미 존재합니다.'})}
  else {
      const bookTitle = new BookTitle({
        book_title: req.body.book_title,
        category: req.body.category,
        user_email: useremail.email,
        user_id: req.body.userId,
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
  console.log("start")
  console.log(req.query.userId)
  console.log("end")
  const bookTitle = await BookTitle.findOne({user_id: req.query.userId}, 'book_title').sort({ 'date' : -1 }).exec();
  console.log(bookTitle)
  try{
    res.send({book_title:bookTitle.book_title})
  }catch(err){
    res.status(400).send(err)
  }

})

module.exports = router;
