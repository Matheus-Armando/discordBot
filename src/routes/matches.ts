import { type FastifyInstance, type FastifyRequest } from 'fastify'

import { getApi } from '../service'

const ROUTE_PATH = 'lol/match/v5/matches'

interface ByPuuid { puuid: any, numberMatches: any }

export const matchesRoutes = async (server: FastifyInstance): Promise<any> => {
  server.get('/by-puuid', async function handler (request: FastifyRequest, reply) {
    const { puuid, numberMatches } = request.query as ByPuuid
    let apiUrl = `${process.env.API_BASE_URL}/${ROUTE_PATH}/by-puuid/${puuid}/ids`

    if (!puuid) {
      return await reply.code(400).send({ error: 'The gameName property is required' })
    }

    if (numberMatches) {
      apiUrl = `${apiUrl}?count=${numberMatches}`
    }

    const api = await getApi()

    const playerMatches = await api.get(apiUrl)

    return playerMatches.data
  })

  server.get('/by-uuid/players', async function handler (request: FastifyRequest, reply) {
    const { puuid, numberMatches } = request.query as ByPuuid
    let apiUrl = `${process.env.API_BASE_URL}/${ROUTE_PATH}/by-puuid/${puuid}/ids`

    if (!puuid) {
      return await reply.code(400).send({ error: 'The gameName property is required' })
    }

    if (numberMatches) {
      apiUrl = `${apiUrl}?count=${numberMatches}`
    }

    const api = await getApi()
    const playerMatches = await api.get(apiUrl)

    if (playerMatches.length === 0) {
      return await reply.code(400).send({ error: 'This player has no matches' })
    }

    const matchesInformationPromises = await playerMatches.data.map(async (matchId: string) => {
      const matchInformation = await api.get(`${process.env.API_BASE_URL}/${ROUTE_PATH}/${matchId}`)
      return matchInformation.data.info.participants
    })

    const matchesInformation = await Promise.all(matchesInformationPromises)

    return matchesInformation
  })
}
