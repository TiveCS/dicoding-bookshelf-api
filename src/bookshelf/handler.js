const books = require('./books')
const { nanoid } = require('nanoid')

const newBook = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload

  const id = nanoid(16)
  const finished = pageCount === readPage
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  }

  books.push(newBook)

  const isSuccess = books.filter(b => b.id === newBook.id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    response.code(201)
    return response
  } else {
    const response = h.response({
      status: 'error',
      message: 'Gagal menambahkan buku'
    })
    response.code(500)
    return response
  }
}

const getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query

  let listBooks = books

  if (name) {
    listBooks = listBooks.filter(b => b.name.toLowerCase().includes(name.toLowerCase()))
  }
  if (reading) {
    const isReading = parseInt(reading) === 1
    listBooks = listBooks.filter(b => b.reading === isReading)
  }
  if (finished) {
    const isFinished = parseInt(finished) === 1
    listBooks = listBooks.filter(b => b.finished === isFinished)
  }

  listBooks = listBooks.map(b => {
    return { id: b.id, name: b.name, publisher: b.publisher }
  })

  const response = h.response({
    status: 'success',
    data: {
      books: listBooks
    }
  })
  response.code(200)
  return response
}

const getBookById = (request, h) => {
  const { bookId } = request.params

  const book = books.filter(book => book.id === bookId)[0]

  if (!book) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    })
    response.code(404)
    return response
  }

  const response = h.response({
    status: 'success',
    data: {
      book
    }
  })
  response.code(200)
  return response
}

const editBookById = (request, h) => {
  const { bookId } = request.params

  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  const updatedAt = new Date().toISOString()
  const finished = readPage === pageCount

  const index = books.findIndex(book => book.id === bookId)
  if (index !== -1) {
    if (!name) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku'
      })
      response.code(400)
      return response
    }
    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      })
      response.code(400)
      return response
    }

    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt
    }

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

const deleteBookById = (request, h) => {
  const { bookId } = request.params

  const index = books.findIndex(book => book.id === bookId)
  if (index !== -1) {
    books.splice(index, 1)

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = { newBook, getAllBooks, getBookById, editBookById, deleteBookById }
