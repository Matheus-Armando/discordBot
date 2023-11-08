import { type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify'

import { getApi } from '../service'
import { type ByPuuid } from '../types'
import { ROUTE_PATH } from '../constants'
import { handleFindRelatedPlayers } from '../shared/matches'

export const matchesRoutes = async (server: FastifyInstance): Promise<any> => {
  server.get('/by-puuid', async function handler (request: FastifyRequest, reply) {
    try {
      const { puuid, numberMatches } = request.query as ByPuuid
      let apiUrl = `${ROUTE_PATH}/by-puuid/${puuid}/ids`

      if (!puuid) {
        return await reply.code(400).send({ error: 'The puuid property is required' })
      }

      if (numberMatches) {
        apiUrl = `${apiUrl}?count=${numberMatches}`
      }

      const api = await getApi()

      const playerMatches = await api.get(apiUrl)

      if (playerMatches.data.length === 0) {
        return await reply.code(400).send({ error: 'This player has no matches' })
      }

      return playerMatches.data
    } catch (err) {
      return await reply.code(500).send({ err, error: 'Internal server error' })
    }
  })

  server.get('/by-puuid/played-today', async function handler (request: FastifyRequest, reply) {
    try {
      const { puuid } = request.query as ByPuuid

      if (!puuid) {
        return await reply.code(400).send({ error: 'The puuid property is required' })
      }

      const api = await getApi()

      const now = new Date()

      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)

      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)

      const startDate = Math.floor(startOfDay.getTime() / 1000)
      const endDate = Math.floor(endOfDay.getTime() / 1000)

      const playerMatches = await api.get(`${ROUTE_PATH}/by-puuid/${puuid}/ids?startTime=${startDate}&endTime=${endDate}`)

      if (playerMatches.data.length === 0) {
        return await reply.code(400).send({ error: 'This player has no matches' })
      }

      return playerMatches.data
    } catch {
      return await reply.code(500).send({ error: 'Internal server error' })
    }
  })

  server.get('/related-players', async function handler (request: FastifyRequest, reply) {
    try {
      const { puuid, numberMatches } = request.query as ByPuuid
      let apiUrl = `${ROUTE_PATH}/by-puuid/${puuid}/ids`

      if (!puuid) {
        return await reply.code(400).send({ error: 'The puuid property is required' })
      }

      if (numberMatches) {
        apiUrl = `${apiUrl}?count=${numberMatches}`
      }

      const api = await getApi()

      const playerMatches = await api.get(apiUrl)

      if (playerMatches.data.length === 0) {
        return await reply.code(400).send({ error: 'This player has no matches' })
      }

      const results = await handleFindRelatedPlayers(playerMatches, puuid)

      return results
    } catch {
      return await reply.code(500).send({ error: 'Internal server error' })
    }
  })

  server.get('/matches-information', async function handler (request: FastifyRequest, reply) {
    try {
      const { puuid, numberMatches } = request.query as ByPuuid
      let apiUrl = `${ROUTE_PATH}/by-puuid/${puuid}/ids`

      if (!puuid) {
        return await reply.code(400).send({ error: 'The puuid property is required' })
      }

      if (numberMatches) {
        apiUrl = `${apiUrl}?count=${numberMatches}`
      }

      const api = await getApi()

      const playerMatches = await api.get(apiUrl)

      if (playerMatches.data.length === 0) {
        return await reply.code(400).send({ error: 'This player has no matches' })
      }

      const matchesInformationPromises = await playerMatches.data.map(async (matchId: string) => {
        const matchInformation = await api.get(`${ROUTE_PATH}/${matchId}`)
        return matchInformation.data
      })

      const participantMatchesInformation = await Promise.all(matchesInformationPromises)

      return participantMatchesInformation
    } catch (err) {
      console.log(err)
      return await reply.code(500).send({ err, error: 'Internal server error' })
    }
  })

  server.get('/by-puuid/matches/resume', async function handler (request: FastifyRequest, reply) {
    try {
      const { puuid, numberMatches } = request.query as ByPuuid
      let apiUrl = `${ROUTE_PATH}/by-puuid/${puuid}/ids`

      if (!puuid) {
        return await reply.code(400).send({ error: 'The puuid property is required' })
      }

      if (numberMatches) {
        apiUrl = `${apiUrl}?count=${numberMatches}`
      }

      const api = await getApi()
      const playerMatches = await api.get(apiUrl)

      if (playerMatches.data.length === 0) {
        return await reply.code(400).send({ error: 'This player has no matches' })
      }

      const matchesInformationPromises = await playerMatches.data.map(async (matchId: string) => {
        const matchInformation = await api.get(`${ROUTE_PATH}/${matchId}`)
        return matchInformation.data
      })

      const participantMatchesInformation = await Promise.all(matchesInformationPromises)

      let win = 0
      let lose = 0
      let deaths = 0
      let kills = 0
      let assists = 0

      participantMatchesInformation.forEach((match) => {
        const actualPlayer = match.info.participants.find((participant: any) => {
          return participant.puuid === puuid
        })

        deaths = deaths + actualPlayer.deaths
        kills = kills + actualPlayer.kills
        assists = assists + actualPlayer.assists

        const playerTeam = match.info.teams.find((team: any) => team.teamId === actualPlayer.teamId)

        if (playerTeam.win) {
          win++
        } else {
          lose++
        }
      })

      const deathAvg = deaths / playerMatches.data.length
      const killAvg = kills / playerMatches.data.length
      const assistAvg = assists / playerMatches.data.length

      return { win, lose, deathAvg, killAvg, assistAvg }
    } catch {
      return await reply.code(500).send({ error: 'Internal server error' })
    }
  })

  server.get('/by-puuid/champions', async function handler (request: FastifyRequest, reply: FastifyReply) {
    try {
      const { puuid, numberMatches } = request.query as ByPuuid
      let apiUrl = `${ROUTE_PATH}/by-puuid/${puuid}/ids`

      if (!puuid) {
        return await reply.code(400).send({ error: 'The puuid property is required' })
      }

      if (numberMatches) {
        apiUrl = `${apiUrl}?count=${numberMatches}`
      }

      const api = await getApi()
      const playerMatches = await api.get(apiUrl)

      if (playerMatches.data.length === 0) {
        return await reply.code(400).send({ error: 'This player has no matches' })
      }

      const matchesInformationPromises = await playerMatches.data.map(async (matchId: string) => {
        const matchInformation = await api.get(`${ROUTE_PATH}/${matchId}`)
        return matchInformation.data
      })

      const participantMatchesInformation = await Promise.all(matchesInformationPromises)
      const heroes: string[] = []

      participantMatchesInformation.forEach((match) => {
        const actualPlayer = match.info.participants.find((participant: any) => {
          return participant.puuid === puuid
        })

        heroes.push(actualPlayer.championName)
      })

      const heroesWithCount = Array.from(new Set(heroes)).map(hero => {
        let count = 0

        for (const innerHero of heroes) {
          if (innerHero === hero) {
            count++
          }
        }

        return { hero, count }
      })

      return heroesWithCount
    } catch {
      return await reply.code(500).send({ error: 'Internal server error' })
    }
  })

  server.get('/by-puuid/players', async function handler (request: FastifyRequest, reply) {
    try {
      const { puuid, numberMatches } = request.query as ByPuuid
      let apiUrl = `${ROUTE_PATH}/by-puuid/${puuid}/ids`

      if (!puuid) {
        return await reply.code(400).send({ error: 'The puuid property is required' })
      }

      if (numberMatches) {
        apiUrl = `${apiUrl}?count=${numberMatches}`
      }

      const api = await getApi()
      const playerMatches = await api.get(apiUrl)

      if (playerMatches.data.length === 0) {
        return await reply.code(400).send({ error: 'This player has no matches' })
      }

      const matchesInformationPromises = await playerMatches.data.map(async (matchId: string) => {
        const matchInformation = await api.get(`${ROUTE_PATH}/${matchId}`)
        return matchInformation.data.metadata
      })

      const participantMatchesInformation = await Promise.all(matchesInformationPromises)

      return participantMatchesInformation
    } catch {
      return await reply.code(500).send({ error: 'Internal server error' })
    }
  })
}
