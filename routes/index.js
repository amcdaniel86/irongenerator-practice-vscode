const express = require('express');
const router  = express.Router();
const Book = require('../models/Book.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/books', (req, res, next) => {
  Book.find()
    .then(books => {
      res.render("books", { books });
    })
    .catch(err => {
      console.log(err)
    })
});

router.get('/book/:id', (req, res, next) => {
  let bookId = req.params.id;
  Book.findOne({'_id': bookId})
      .then(book => {
        res.render("book-detail", { book })
      })
      .catch(err => {
        console.log(err)
      })
});

module.exports = router;
