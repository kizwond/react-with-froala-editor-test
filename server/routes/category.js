const router = require('express').Router();
const { BookTitle } = require('../models/BookTitle');
const { User } = require("../models/User");
const { Category } = require("../models/Category");


//카테고리 추가
router.post('/add-category', async (req, res) => {
  console.log('add-category clicked')
  console.log(req.body)
  const useremail = await User.findOne({_id: req.body.userId}).exec();
  const categoryExist = await Category.findOne({user_id: req.body.userId, category_name: req.body.category_name})
  const categoryListOrder = await BookTitle.findOne({user_id: req.body.userId, category:req.body.category}).sort({ 'category_order' : -1 }).exec();

  if (!categoryExist) {
    var categoryOrder = 0
  } else {
    var categoryOrder = categoryListOrder.category_order
  }

  if (categoryExist) {return res.status(400).json({'error':'동일한 이름의 카테고리명이 이미 존재합니다.'})}
  else {
    const category = new Category({
      category_name: req.body.category_name,
      category_order: categoryOrder,
      contents_quantity: 0,
      user_email: useremail.email,
      user_id: req.body.userId,
      user_nick: useremail.name,
    })
      try{
        const saveCategory = await category.save()
        res.send({category_name:category.category_name, user_nick:category.user_nick})
      }catch(err){
        res.status(400).send(err)
      }
    }
})

//카테고리 이름변경
router.post('/category-name-change', async (req, res) => {
  console.log('category-name-change clicked')
  console.log(req.body)
})

//카테고리 순서변경
router.post('/category-order-change', async (req, res) => {
  console.log('category-order-change clicked')
  console.log(req.body)
})

//카테고리 삭제
router.post('/delete-category', async (req, res) => {
  console.log('delete-category clicked')
  console.log(req.body)
})

module.exports = router;
