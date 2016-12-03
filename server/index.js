const {Server} = require('hapi')
const inert = require('inert')
const h2o2 = require('h2o2')
const path = require('path')

const isRequired = require('../shared/isRequired')

const server = new Server()

server.connection({
  port: process.env.PORT || isRequired({
    category: 'server connection',
    property: 'port'
  })
})

server.register([
  inert,
  h2o2
])

server.route([
  {
    method: 'GET',
    path: '/resources/{filename}',
    handler (request, reply) {
      return reply.file(path.join(__dirname, 'static', request.params.filename))
    }
  },
  {
    method: 'GET',
    path: '/api/search/{query}/{page?}',
    handler: {
      proxy: {
        mapUri (request, callback) {
          const domain = 'https://api.themoviedb.org'
          const path = '/3/search/movie'
          const query = '?' + [
            `api_key=${process.env.MOVIE_DB_API_KEY}`,
            'language=en-UK',
            `query=${encodeURIComponent(query)}`,
            `page=${encodeURIComponent(request.params.page) || 1}`,
            'include_adult=false'
          ].join('&')
          callback(null, domain + path + query)
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/',
    handler (request, reply) {
      return reply('Testing')
    }
  }
])

server.start()
  .then(error => {
    if (error) {
      throw error
    }

    console.log(`Server started on ${server.info.uri}`)
  })
