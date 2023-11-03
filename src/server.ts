import { fastify } from 'fastify'

import { playerRoutes } from './routes/player'

import 'dotenv/config'
import { matchesRoutes } from './routes/matches'

export const server = fastify()

server.register(playerRoutes, { prefix: 'players' })
server.register(matchesRoutes, { prefix: 'matches' })

server.listen({ port: 3000 }, (err, address) => {
  if (err !== null) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
