const router = require('express').Router();
const { BookTitle } = require('../models/BookTitle');
const { User } = require("../models/User");
const { Category } = require("../models/Category");
const { ContentsTable } = require("../models/ContentsTable");


//목차 추가
router.post('/add-table', async (req, res) => {
  console.log(req.body)
  // const useremail = await User.findOne({_id: req.body.userId}).exec();
  // const categoryExist = await Category.findOne({user_id: req.body.userId, category_name: req.body.newCategory})
  // const categoryListOrder = await Category.findOne({_id: req.body.prevCategoryId}).exec();

  // const newCategory = new Category({
  //   category_name: req.body.newCategory,
  //   category_order: categoryListOrder.category_order + 1,
  //   contents_quantity: 0,
  //   user_email: useremail.email,
  //   user_id: req.body.userId,
  //   user_nick: useremail.name,
  // })
  //     const likes = await Category.find({user_id: req.body.userId, category_order : {$gt : categoryListOrder.category_order}}).exec()
  //     .then((result) => {
  //       {result.map((value, index) => {
  //         return Category.updateMany({ _id: value._id }, { category_order: value.category_order + 1 }).exec();
  //       })}
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     })

  //     const saveCategory = await newCategory.save()
  //     const category = await Category.find({user_id: req.body.userId}).sort({ 'category_order': 1 }).exec();
  //     try{
  //       res.send({category})
  //     }catch(err){
  //       res.status(400).send(err)
  //     }
})

module.exports = router;