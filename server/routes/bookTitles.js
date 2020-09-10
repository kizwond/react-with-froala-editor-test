const router = require('express').Router();
const { BookTitle } = require('../models/BookTitle');
// const {registerValidation,loginValidation}= require('../validation')


router.post('/naming', async (req, res) => {

  //validate the data before save
  // const{ error } = registerValidation(req.body)
  // if (error) return res.status(400).send(error.details[0].message)

  //checking if the user is already in the database
  // const emailExist = await User.findOne({email: req.body.email})
  // if (emailExist) return res.status(400).send('Email already exists')

  //create a new user
  const bookTitle = new BookTitle({
    book_title: req.body.book_title,
    category: req.body.category,
  })
  try{
    const saveBookTitle = await bookTitle.save()
    res.send({book_title:bookTitle.book_title})
  }catch(err){
    res.status(400).send(err)
  }
})

module.exports = router;
