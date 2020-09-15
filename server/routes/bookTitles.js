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
  const update = { like: req.body.like };
  let doc = await BookTitle.findOneAndUpdate({_id: req.body.bookId}, update, {
    new: true
  });
  const bookTitle = await BookTitle.find({user_id: req.body.userId}).sort({ 'category' : 1,'list_order': 1 }).exec();
  try{
    res.send({bookTitle})
  }catch(err){
    res.status(400).send(err)
  }
})

router.post('/hide-or-show', async (req, res) => {
  const update = { hide_or_show: req.body.hide_or_show };
  let doc = await BookTitle.findOneAndUpdate({_id: req.body.bookId}, update, {
    new: true
  });
  const bookTitle = await BookTitle.find({user_id: req.body.userId}).sort({ 'category' : 1,'list_order': 1 }).exec();
  try{
    res.send({bookTitle})
  }catch(err){
    res.status(400).send(err)
  }
})

router.post('/delete-book', async (req, res) => {
  const currentOrder = await BookTitle.findOne({_id: req.body.bookId}).exec();
  console.log(currentOrder.list_order, currentOrder.like, currentOrder.like_order)

  if (currentOrder.like === true){
    const likes = await BookTitle.find({user_id: req.body.userId, like_order : {$gt : currentOrder.like_order}}).exec()
    .then((result) => {
      {result.map((value, index) => {
        console.log('result.like_order : ', index ,value.like_order)
        return BookTitle.updateMany({ like_order: value.like_order }, { like_order: value.like_order - 1 }).exec();
      })}
    })
    .catch((err) => {
      console.error(err);
    });
  }

  const others = await BookTitle.find({user_id: req.body.userId, list_order : {$gt : currentOrder.list_order}}).exec()
  .then((result) => {
    {result.map((value, index) => {
      console.log('result.list_order : ', index ,value.list_order)
      return BookTitle.updateMany({ list_order: value.list_order }, { list_order: value.list_order - 1 }).exec();
    })}
  })
  .catch((err) => {
    console.error(err);
  });
  let doc = await BookTitle.deleteOne({_id: req.body.bookId});
  const bookTitle = await BookTitle.find({user_id: req.body.userId}).sort({ 'category' : 1,'list_order': 1 }).exec();
  try{
    res.send({bookTitle})
  }catch(err){
    res.status(400).send(err)
  }
})

router.post('/change-book-title', async (req, res) => {
  const update = { book_title: req.body.newName };
  const bookExist = await BookTitle.findOne({user_id: req.body.userId, book_title: req.body.newName})
  if (bookExist) {return res.send({'error':'동일한 이름의 책이 이미 존재합니다.'})}
  else {
    let doc = await BookTitle.findOneAndUpdate({_id: req.body.bookId}, update, {
      new: true
    })
  const bookTitle = await BookTitle.find({user_id: req.body.userId}).sort({ 'category' : 1,'list_order': 1 }).exec();
    try{
      res.send({bookTitle})
    }catch(err){
      res.status(400).send(err)
    }
  }
})

router.post('/change-list-order', async (req, res) => {
  const currentOrder = await BookTitle.findOne({_id: req.body.bookId},'list_order').exec();
  console.log('현재순서 : ', currentOrder)
  // if (currentOrder) {return res.send({'error':'동일한 이름의 책이 이미 존재합니다.'})}
  // else {
  //   let doc = await BookTitle.findOneAndUpdate({_id: req.body.bookId}, update, {
  //     new: true
  //   })
  // const bookTitle = await BookTitle.find({user_id: req.body.userId}).sort({ 'category' : 1,'list_order': 1 }).exec();
  //   try{
  //     res.send({bookTitle})
  //   }catch(err){
  //     res.status(400).send(err)
  //   }
  // }
})

module.exports = router;
