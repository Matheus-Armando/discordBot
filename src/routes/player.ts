import { type FastifyInstance } from 'fastify'

export const playerRoutes = async (server: FastifyInstance): Promise<any> => {
  server.get('/', async function handler (request, reply) {
    return { hello: 'world' }
  })
}
