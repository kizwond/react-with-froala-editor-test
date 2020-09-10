const router = require('express').Router();
const { BookTitle } = require('../models/BookTitle');
const { User } = require("../models/User");
// const {registerValidation,loginValidation}= require('../validation')


router.post('/naming', async (req, res) => {

  const useremail = await User.findOne({_id: req.body.userId}, 'email').exec();
  console.log(useremail)
  console.log("first")
  // User.findOne({_id: req.body.userId}, function(err, foundData) { 
  //   if(err) {
  //       console.log(err);
  //       return res.status(500).send();
  //   } else {
  //       console.log(foundData)
  //       var useremail = foundData.email
  //       console.log(useremail)
  //       console.log("done!!")
  //       return res.status(200).json({"success":"book_title saved!!"});
  //   }
  // });
  //validate the data before save
  // const{ error } = registerValidation(req.body)
  // if (error) return res.status(400).send(error.details[0].message)

  //checking if the user is already in the database
  // const emailExist = await User.findOne({email: req.body.email})
  // if (emailExist) return res.status(400).send('Email already exists')

  //create a new user
  console.log(useremail)
  const bookTitle = new BookTitle({
    book_title: req.body.book_title,
    category: req.body.category,
    user_email: useremail.email,
    user_id: req.body.userId,
  })
  try{
    const saveBookTitle = await bookTitle.save()
    res.send({book_title:bookTitle.book_title, category:bookTitle.category, userId:bookTitle.userId})
  }catch(err){
    res.status(400).send(err)
  }
})

module.exports = router;
