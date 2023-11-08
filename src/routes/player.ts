import { type FastifyInstance, type FastifyRequest } from 'fastify'

import { getApi } from '../service'

const ROUTE_PATH = 'riot/account/v1/accounts'

export const playerRoutes = async (server: FastifyInstance): Promise<any> => {
  server.get('/puuid', async function handler (request: FastifyRequest, reply) {
    try {
      const { gameName, tagLine } = request.query as { gameName: any, tagLine: any }

      if (!gameName) {
        return await reply.code(400).send({ error: 'The gameName property is invalid' })
      }

      if (!tagLine) {
        return await reply.code(400).send({ error: 'The tagLine property is invalid' })
      }

      const api = await getApi()

      const accountInformation = await api.get(`${process.env.API_BASE_URL}/${ROUTE_PATH}/by-riot-id/${gameName}/${tagLine}`)

      return accountInformation.data
    } catch (err) {
      return await reply.code(500).send({ err, error: 'Internal server error' })
    }
  })
}
