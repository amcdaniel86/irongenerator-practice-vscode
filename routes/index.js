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



router.get('/books/add', (req, res, next) => {
        res.render("book-add");
});

router.post('/books/add', (req, res, next) => {
  const { name, author, description, rating } = req.body;
  const newBook = new Book({ name, author, description, rating});
  newBook.save()
  .then((book) =>{
    res.redirect('/books');
  })
  .catch((err) =>{
        cconsole.log(err);
    })
  });
  
  // Query String method below, notice req.query
  router.get('/books/edit', (req, res, next) =>{
    Book.findOne({_id: req.query.book_id})
  .then((book) => {
    res.render("book-edit", {book});
  })
  .catch((err)=>{
    console.log(err);
  })
});

router.post('/books/edit', (req, res, next) => {
  const { name, author, description, rating } = req.body;
  Book.update({_id: req.query.book_id}, { $set: {name, author, description, rating }}, { new: true} )
  .then((book)=>{
    res.redirect('/books');
  })
  .catch((err)=>{
    console.log(err);
  })
});

router.get('/authors/add', (req, res, next) =>{
  res.render("author-add")
});



router.post('/authors/add', (req, res, next) =>{
  const { name, lastName, nationality, birthday, pictureUrl } = req.body;
  const newAuthor = new Author ({name, lastName, nationality, birthday, pictureUrl})
  newAuthor.save()
  .then((book)=>{
    res.redirect('/books')
  })
  .catch((err)=>{
    console.log(err);
  })
});
router.post('/books/add', (req, res, next) => {
  const { name, author, description, rating } = req.body;
  const newBook = new Book({ name, author, description, rating});
  newBook.save()
  .then((book) =>{
    res.redirect('/books');
  })
  .catch((err) =>{
        cconsole.log(err);
    })

    router.get('/book/:id', (req, res, next) => {
      let bookId = req.params.id;
      if (!/^[0-9a-fA-F]{24}$/.test(bookId)) { 
        return res.status(404).render('not-found');
      }
      Book.findOne({'_id': bookId})
        .populate('author')
        .then(book => {
          if (!book) {
              return res.status(404).render('not-found');
          }
          res.render("book-detail", { book })
        })
        .catch(next)
    });

    router.post('/reviews/add', (req, res, next) => {
      const { user, comments } = req.body;
      Book.update({ _id: req.query.book_id }, { $push: { reviews: { user, comments }}})
      .then(book => {
        res.redirect('/books')
      })
      .catch((error) => {
        console.log(error)
      })
    });




module.exports = router;
