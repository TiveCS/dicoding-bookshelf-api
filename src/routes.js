const { newBook } = require('./bookshelf/handler')

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: newBook
  }
]

module.exports = routes
