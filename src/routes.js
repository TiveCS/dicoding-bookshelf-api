const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hello world'
    }
  }
]

module.exports = routes
