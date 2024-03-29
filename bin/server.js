const app = require('../src/app')
const debug = require('debug')('balta:server')
const http = require('http')

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

const server = http.createServer(app)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
console.log(`API rodando na porta ${port}`)

function normalizePort (val) {
  const port = parseInt(val, 10)
  if (isNaN(val)) return val
  if (port >= 0) return port
  return false
}

function onListening () {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug(`Listening on ${bind}`)
}

function onError (error) {
  if (error.syscall !== 'listen') throw error

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} precisa de privilégios elevados`)
      process.exit(1)

    case 'EADDRINUSE':
      console.error(`${bind} esta em uso neste momento`)
      process.exit(1)

    default:
      throw error
  }
}
