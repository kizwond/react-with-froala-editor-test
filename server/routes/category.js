const router = require('express').Router();
const { BookTitle } = require('../models/BookTitle');
const { User } = require("../models/User");
const { Category } = require("../models/Category");


//카테고리 추가
router.post('/add-category', async (req, res) => {
  console.log('add-category clicked')
  console.log(req.body)
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
