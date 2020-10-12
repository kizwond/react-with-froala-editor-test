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
    level: tableListOrder.level + 1,
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

module.exports = router;
