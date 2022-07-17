const { newBook, getAllBooks, getBookById } = require('./bookshelf/handler')

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: newBook
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookById
  }
]

module.exports = routes
