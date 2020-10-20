const router = require('express').Router();
const { BookTitle } = require('../models/BookTitle');
const { User } = require("../models/User");
const { Category } = require("../models/Category");
const { ContentsTable } = require("../models/ContentsTable");


//목차 추가
router.post('/add-table', async (req, res) => {
  console.log(req.body)
  const useremail = await User.findOne({_id: req.body.userId}).exec();
  const tableListOrder = await ContentsTable.findOne({_id: req.body.prevTableId}).exec();

  const contentsTable = new ContentsTable({
    book_id: tableListOrder.book_id,
    table_name:req.body.newTable,
    order: tableListOrder.order + 1,
    level: tableListOrder.level,
    level_in_order: 1,
    parent: 'default',
    user_email: useremail.email,
    user_id: req.body.userId,
    user_nick: useremail.name,
  })
      const orderChange = await ContentsTable.find({user_id: req.body.userId, order : {$gt : tableListOrder.order}}).exec()
      .then((result) => {
        {result.map((value, index) => {
          return ContentsTable.updateMany({ _id: value._id }, { order: value.order + 1 }).exec();
        })}
      })
      .catch((err) => {
        console.error(err);
      })

      const saveContentsTable = await contentsTable.save()
      const table_of_contents = await ContentsTable.find({user_id: req.body.userId, book_id:tableListOrder.book_id}).sort({ 'order': 1 }).exec();
      try{
        res.send({table_of_contents})
      }catch(err){
        res.status(400).send(err)
      }
})

//목차 이름 변경
router.post('/change-table-name', async (req, res) => {
  console.log(req.body)
  const update = { table_name: req.body.newName };
  const thisTable = await ContentsTable.findOne({_id: req.body.tableId}).exec();

  let doc = await ContentsTable.findOneAndUpdate({_id: req.body.tableId}, update)

  const table_of_contents = await ContentsTable.find({user_id: req.body.userId, book_id:thisTable.book_id}).sort({ 'order': 1 }).exec();
    try{
      res.send({table_of_contents})
    }catch(err){
      res.status(400).send(err)
    }
  
})

//목차 레벨 변경
router.post('/change-table-level', async (req, res) => {
  console.log(req.body)

  if(req.body.action === 'minus'){
    if(req.body.presentLevel === 1){
      console.log('변경불가')
    } else {
      var update = { level: req.body.presentLevel - 1 };
    }
  } else {
    if(req.body.presentLevel === 5) {
      console.log('변경불가')
    } else {
      var update = { level: req.body.presentLevel + 1 };
    }
  }
  
  
  const thisTable = await ContentsTable.findOne({_id: req.body.tableId}).exec();

  let doc = await ContentsTable.findOneAndUpdate({_id: req.body.tableId}, update)

  const table_of_contents = await ContentsTable.find({user_id: req.body.userId, book_id:thisTable.book_id}).sort({ 'order': 1 }).exec();
    try{
      res.send({table_of_contents})
    }catch(err){
      res.status(400).send(err)
    }
  
})

//목차 순서 변경
router.post('/change-table-order', async (req, res) => {
  console.log(req.body)
  // const lastTableOrder = await ContentsTable.findOne({user_id: req.body.userId,book_id:req.body.bookId}).sort({ 'order' : -1 }).exec(); //현재 선택된 책 다음 책
  const selectedTable = await ContentsTable.findOne({_id: req.body.tableId}).exec(); //현재 선택된 책 
  const selectedDownTableSameLevel = await ContentsTable.findOne({user_id: req.body.userId,book_id:req.body.bookId, level:selectedTable.level, order:{$gt: selectedTable.order}}).sort({order:1}).exec(); //현재 선택된 책 동일레벨 다음 순서
  const selectedDownTableUpperLevel = await ContentsTable.findOne({user_id: req.body.userId,book_id:req.body.bookId, level:{$lt:selectedTable.level}, order:{$gt: selectedTable.order}}).sort({order:1}).exec(); //현재 선택된 책 상위레벨 다음 순서
  console.log('다음 동일레벨 : ',selectedDownTableSameLevel)
  console.log('다음 상위레벨 : ',selectedDownTableUpperLevel)
  if(req.body.action === 'down') { //순서 down 이동시
   
  } else if(req.body.action === 'up') { //순서 up 이동시

  }
  
  console.log("end")
  // if(req.body.action === 'up') { 
  //   if (req.body.presentOrder === 1){
  //     console.log('순서변경 불필요')
  //   } else {
  //     const updateBefore = { order : req.body.presentOrder }; //이전 순서의 목차를 선택 목차 순서로 업데이트
  //     const beforeThis = await ContentsTable.findOneAndUpdate({user_id: req.body.userId,book_id:req.body.bookId, order: req.body.presentOrder - 1}, updateBefore, {
  //       new: true
  //     })
  //     const updateThis = { order : req.body.presentOrder - 1 }; //선택 목차 순서를 -1 
  //     let doc = await ContentsTable.findOneAndUpdate({_id: req.body.tableId}, updateThis, {
  //       new: true
  //     })
  //   }
  // } else if(req.body.action === 'down') {
  //   if (req.body.presentOrder === lastTableOrder.order){
  //     console.log('순서변경 불필요')
  //   } else {
  //     const updateAfter = { order : req.body.presentOrder }; //이후 순서의 목차를 선택 목차 순서로 업데이트
  //     const afterThis = await ContentsTable.findOneAndUpdate({user_id: req.body.userId,book_id:req.body.bookId, order: req.body.presentOrder + 1}, updateAfter, {
  //       new: true
  //     }) 
  //     const updateThis = { order : req.body.presentOrder + 1 }; //선택 목차 순서를 + 1
  //     let doc = await ContentsTable.findOneAndUpdate({_id: req.body.tableId}, updateThis, {
  //       new: true
  //     })
  //   }
  // }

  const table_of_contents = await ContentsTable.find({user_id: req.body.userId, book_id:selectedTable.book_id}).sort({ 'order': 1 }).exec();
    try{
      res.send({table_of_contents})
    }catch(err){
      res.status(400).send(err)
    }
  
})

//목차 삭제 및 순서재조정
router.post('/delete-table', async (req, res) => {
  console.log(req.body)
  let doc = await ContentsTable.deleteOne({_id: req.body.tableId}).exec();

  //삭제된 카테고리 이후 순서 카테고리들 순서 재조정, 카테고리 순서 소트 후 인덱스 + 1로 재조정
  const others = await ContentsTable.find({user_id: req.body.userId, book_id:req.body.bookId}).sort({order: 1 }).exec()
  .then((result) => {
    console.log(result)
    {result.map((value, index) => {
      return ContentsTable.updateMany({ _id: value._id }, { order: index + 1 }).exec();
    })}
  })
  .catch((err) => {
    console.error(err);
  });

  const table_of_contents = await ContentsTable.find({user_id: req.body.userId, book_id:req.body.bookId}).sort({ 'order': 1 }).exec();
    try{
      res.send({table_of_contents})
    }catch(err){
      res.status(400).send(err)
    }
  
})


module.exports = router;


