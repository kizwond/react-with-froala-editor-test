const router = require('express').Router();
const { BookTitle } = require('../models/BookTitle');
const { User } = require("../models/User");
const { Category } = require("../models/Category");

//카테고리 불러오기
router.get('/get-all-category', async (req, res) => {
  const category = await Category.find({user_id: req.query.userId}).sort({ 'category_order': 1 }).exec();
  try{
    res.send({category})
  }catch(err){
    res.status(400).send(err)
  }
})
//카테고리 추가
router.post('/add-category', async (req, res) => {
  console.log('add-category clicked')
  console.log(req.body)
  const useremail = await User.findOne({_id: req.body.userId}).exec();
  const categoryExist = await Category.findOne({user_id: req.body.userId, category_name: req.body.newCategory})
  const categoryListOrder = await Category.findOne({_id: req.body.prevCategoryId}).exec();

  if (categoryExist) {return res.send({'error':'동일한 이름의 카테고리명이 이미 존재합니다.'})}
  else {
    const newCategory = new Category({
      category_name: req.body.newCategory,
      category_order: categoryListOrder.category_order + 1,
      contents_quantity: 0,
      user_email: useremail.email,
      user_id: req.body.userId,
      user_nick: useremail.name,
    })

        const likes = await Category.find({user_id: req.body.userId, category_order : {$gt : categoryListOrder.category_order}}).exec()
        .then((result) => {
          {result.map((value, index) => {
            return Category.updateMany({ _id: value._id }, { category_order: value.category_order + 1 }).exec();
          })}
        })
        .catch((err) => {
          console.error(err);
        })

        const saveCategory = await newCategory.save()
        const category = await Category.find({user_id: req.body.userId}).sort({ 'category_order': 1 }).exec();
        try{
          res.send({category})
        }catch(err){
          res.status(400).send(err)
        }
    }
  
})

//카테고리 이름변경
router.post('/change-category-name', async (req, res) => {
  const update = { category_name: req.body.newName };
  const bookExist = await Category.findOne({user_id: req.body.userId, category_name: req.body.newName})
  const categoryCurrent = await Category.findOne({_id:req.body.categoryId})
  if (bookExist) {return res.send({'error':'동일한 카테고리명이 존재합니다.'})}
  else {
    let doc = await Category.findOneAndUpdate({_id: req.body.categoryId}, update)
    const lists = await BookTitle.find({user_id: req.body.userId, category:categoryCurrent.category_name}).exec()
    .then((result) => {
      console.log(result)
      {result.map((value, index) => {
        return BookTitle.updateMany({ _id: value._id }, { category: req.body.newName }).exec();
      })}
    })
    .catch((err) => {
      console.error(err);
    })

    const bookTitle = await BookTitle.find({user_id: req.body.userId}).sort({ 'category' : 1,'list_order': 1 }).exec();
    const likeTitle = await BookTitle.find({user_id: req.body.userId}).sort({ 'like_order': 1 }).exec();
    const category = await Category.find({user_id: req.body.userId}).sort({ 'category_order': 1 }).exec();
    try{
      res.send({bookTitle,likeTitle,category})
    }catch(err){
      res.status(400).send(err)
    }
  }
})
//카테고리 순서변경
router.post('/category-order-change', async (req, res) => {
  console.log('category-order-change clicked')
  console.log(req.body)
})

//카테고리 삭제
router.post('/delete-category', async (req, res) => {
  const currentOrder = await Category.findOne({_id: req.body.categoryId}).exec();
  const willAddHere = await BookTitle.findOne({user_id: req.body.userId, category : req.body.moveTo}).sort({ 'list_order' : -1 }).exec(); 

  if (req.body.moveTo === '') {
    console.log('category not selected')
    const books = await BookTitle.deleteMany({user_id : req.body.userId, category:currentOrder.category_name}).exec()
  } else {
    const books = await BookTitle.find({user_id : req.body.userId, category:currentOrder.category_name}).exec()
    .then((result) => {
      {result.map((value, index) => {
        return BookTitle.updateMany({ _id: value._id }, { category: req.body.moveTo, list_order: value.list_order + willAddHere.list_order }).exec();
      })}
    })
    .catch((err) => {
      console.error(err);
    });
  }
  const others = await Category.find({user_id: req.body.userId, category_order : {$gt : currentOrder.category_order}}).exec()
  .then((result) => {
    {result.map((value, index) => {
      return Category.updateMany({ _id: value._id }, { category_order: value.category_order - 1 }).exec();
    })}
  })
  .catch((err) => {
    console.error(err);
  });

  let doc = await Category.deleteOne({_id: req.body.categoryId});
  const bookTitle = await BookTitle.find({user_id: req.body.userId}).sort({ 'category' : 1,'list_order': 1 }).exec();
  const likeTitle = await BookTitle.find({user_id: req.body.userId}).sort({ 'like_order': 1 }).exec();
  const category = await Category.find({user_id: req.body.userId}).sort({ 'category_order': 1 }).exec();
  try{
    res.send({bookTitle,likeTitle,category})
  }catch(err){
    res.status(400).send(err)
  }
})

module.exports = router;
