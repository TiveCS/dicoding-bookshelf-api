const routes = require('./routes')
const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: 5000
  })

  server.route(routes)

  await server.start()
  console.log(`Server berjalan pada ${server.info.uri}`)
}

init()
