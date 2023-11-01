import { type FastifyInstance, type FastifyRequest } from 'fastify'

import { getApi } from '../service'

const ROUTE_PATH = 'lol/match/v5/matches'

export const matchesRoutes = async (server: FastifyInstance): Promise<any> => {
  server.get('/by-puuid', async function handler (request: FastifyRequest, reply) {
    const { puuid } = request.query as { puuid: any }

    if (!puuid) {
      return await reply.code(400).send({ error: 'The gameName property is required' })
    }

    const api = await getApi()

    const playerMatches = await api.get(`${process.env.API_BASE_URL}/${ROUTE_PATH}/by-puuid/${puuid}/ids`)

    return playerMatches.data
  })
}
