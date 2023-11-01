import { fastify } from 'fastify'
import pino from 'pino'

import { playerRoutes } from './routes/player'

import 'dotenv/config'
import { matchesRoutes } from './routes/matches'

const server = fastify({
  logger: pino({ level: 'info' })
})

server.register(playerRoutes, { prefix: 'player' })
server.register(matchesRoutes, { prefix: 'matches' })

server.listen({ port: 3000 }, (err, address) => {
  if (err !== null) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
