const mongoose = require('mongoose');
const Schema =   mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    description: String,
    author: [ { type : _Id, ref: 'Author' } ],
    rating: Number
    reviews: [ 
  {
    user: String,
    comments: String
  } 
]
}, {
timestamps: {
  createdAt: "createdAt",
  updatedAt: "updatedAt"
}
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;