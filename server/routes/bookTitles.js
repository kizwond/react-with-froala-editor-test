const router = require('express').Router();
const { BookTitle } = require('../models/BookTitle');
const { User } = require("../models/User");

router.post('/naming', async (req, res) => {
  const useremail = await User.findOne({_id: req.body.userId}).exec();
  const bookExist = await BookTitle.findOne({user_email: useremail.email, book_title: req.body.book_title})
  const bookListOrder = await BookTitle.findOne({user_id: req.body.userId, category:req.body.category}).sort({ 'list_order' : -1 }).exec();

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
        like: 'false',
        like_order: 0,
        list_order: listOrder + 1,
        hide_or_show: 'true',
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
  const likeTitle = await BookTitle.find({user_id: req.query.userId}).sort({ 'like_order': 1 }).exec();
  try{
    res.send({bookTitle,likeTitle})
  }catch(err){
    res.status(400).send(err)
  }
})

router.post('/like', async (req, res) => {
  const bookLikeOrder = await BookTitle.findOne({user_id: req.body.userId}).sort({ 'like_order' : -1 }).exec();
  const currentOrder = await BookTitle.findOne({_id: req.body.bookId}).exec(); //현재 선택된 책
  if (!bookLikeOrder) {
    var likeOrder = 1
  } else {
    var likeOrder = bookLikeOrder.like_order + 1
  }

  if (req.body.like === 'false') {
    const likes = await BookTitle.find({user_id: req.body.userId, like:'true', like_order : {$gt : currentOrder.like_order}}).exec()
    .then((result) => {
      {result.map((value, index) => {
        return BookTitle.updateMany({ like_order: value.like_order }, { like_order: value.like_order - 1 }).exec();
      })}
    })
    .catch((err) => {
      console.error(err);
    })
    const update = { like: req.body.like, like_order: 0 };
    let doc = await BookTitle.findOneAndUpdate({_id: req.body.bookId}, update, {
      new: true
    })
  } else {
    const update = { like: req.body.like, like_order: likeOrder };
    let doc = await BookTitle.findOneAndUpdate({_id: req.body.bookId}, update, {
      new: true
    });
  }
 
  const bookTitle = await BookTitle.find({user_id: req.body.userId}).sort({ 'category' : 1,'list_order': 1 }).exec();
  const likeTitle = await BookTitle.find({user_id: req.body.userId}).sort({ 'like_order': 1 }).exec();
  try{
    res.send({bookTitle,likeTitle})
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
  const likeTitle = await BookTitle.find({user_id: req.body.userId}).sort({ 'like_order': 1 }).exec();
  try{
    res.send({bookTitle,likeTitle})
  }catch(err){
    res.status(400).send(err)
  }
})

router.post('/delete-book', async (req, res) => {
  const currentOrder = await BookTitle.findOne({_id: req.body.bookId}).exec();

  if (currentOrder.like === 'true'){
    const likes = await BookTitle.find({user_id: req.body.userId, like:'true', like_order : {$gt : currentOrder.like_order}}).exec()
    .then((result) => {
      {result.map((value, index) => {
        return BookTitle.updateMany({ like_order: value.like_order }, { like_order: value.like_order - 1 }).exec();
      })}
    })
    .catch((err) => {
      console.error(err);
    });
  }

  const others = await BookTitle.find({user_id: req.body.userId, category:currentOrder.category, list_order : {$gt : currentOrder.list_order}}).exec()
  .then((result) => {
    {result.map((value, index) => {
      return BookTitle.updateMany({ category:currentOrder.category, list_order: value.list_order }, { list_order: value.list_order - 1 }).exec();
    })}
  })
  .catch((err) => {
    console.error(err);
  });
  let doc = await BookTitle.deleteOne({_id: req.body.bookId});
  const bookTitle = await BookTitle.find({user_id: req.body.userId}).sort({ 'category' : 1,'list_order': 1 }).exec();
  const likeTitle = await BookTitle.find({user_id: req.body.userId}).sort({ 'like_order': 1 }).exec();
  try{
    res.send({bookTitle,likeTitle})
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
  const likeTitle = await BookTitle.find({user_id: req.body.userId}).sort({ 'like_order': 1 }).exec();
    try{
      res.send({bookTitle,likeTitle})
    }catch(err){
      res.status(400).send(err)
    }
  }
})

router.post('/change-list-order', async (req, res) => {
  const currentOrder = await BookTitle.findOne({_id: req.body.bookId}).exec(); //현재 선택된 책
  const lastBookOrder = await BookTitle.findOne({user_id: req.body.userId, category: currentOrder.category}).sort({ 'list_order' : -1 }).exec(); //현재 선택된 책 다음 책
  const lastLikeOrder = await BookTitle.findOne({user_id: req.body.userId}).sort({ 'like_order' : -1 }).exec(); //현재 선택된 책 다음 책
  if (req.body.from === 'list'){
    if(req.body.action === 'up') {
      if (currentOrder.list_order === 1){
        console.log('순서변경 불필요')
      } else {
        const updateBefore = { list_order : currentOrder.list_order };
        const beforeThis = await BookTitle.findOneAndUpdate({user_id: req.body.userId, category: currentOrder.category, list_order: currentOrder.list_order - 1}, updateBefore, {
          new: true
        })
        const updateThis = { list_order : currentOrder.list_order - 1 };
        let doc = await BookTitle.findOneAndUpdate({_id: req.body.bookId}, updateThis, {
          new: true
        })
      }
    } else if(req.body.action === 'down') {
      if (currentOrder.list_order === lastBookOrder.list_order){
        console.log('순서변경 불필요')
      } else {
        const updateAfter = { list_order : currentOrder.list_order };
        const afterThis = await BookTitle.findOneAndUpdate({user_id: req.body.userId, category: currentOrder.category, list_order: currentOrder.list_order + 1}, updateAfter, {
          new: true
        }) 
        const updateThis = { list_order : currentOrder.list_order + 1 };
        let doc = await BookTitle.findOneAndUpdate({_id: req.body.bookId}, updateThis, {
          new: true
        })
      }
    }
  } else if (req.body.from === 'like'){
    if(req.body.action === 'up') {
      if (currentOrder.like_order === 1){
        console.log('순서변경 불필요')
      } else {
        const updateBefore = { like_order : currentOrder.like_order };
        const beforeThis = await BookTitle.findOneAndUpdate({user_id: req.body.userId, like:'true', like_order: currentOrder.like_order - 1}, updateBefore, {
          new: true
        })
        const updateThis = { like_order : currentOrder.like_order - 1 };
        let doc = await BookTitle.findOneAndUpdate({_id: req.body.bookId}, updateThis, {
          new: true
        })
      }
    } else if(req.body.action === 'down') {
      if (currentOrder.like_order === lastLikeOrder.like_order){
        console.log('순서변경 불필요')
      } else {
        const updateAfter = { like_order : currentOrder.like_order };
        const afterThis = await BookTitle.findOneAndUpdate({user_id: req.body.userId, like:'true', like_order: currentOrder.like_order + 1}, updateAfter, {
          new: true
        }) 
        const updateThis = { like_order : currentOrder.like_order + 1 };
        let doc = await BookTitle.findOneAndUpdate({_id: req.body.bookId}, updateThis, {
          new: true
        })
      }
    }
  }

  const bookTitle = await BookTitle.find({user_id: req.body.userId}).sort({ 'category' : 1,'list_order': 1 }).exec();
  const likeTitle = await BookTitle.find({user_id: req.body.userId}).sort({ 'like_order': 1 }).exec();
    try{
      res.send({bookTitle,likeTitle})
    }catch(err){
      res.status(400).send(err)
    }
})

module.exports = router;
