import { type FastifyInstance, type FastifyRequest } from 'fastify'

import { getApi } from '../service'

const ROUTE_PATH = `${process.env.API_BASE_URL}/lol/match/v5/matches`

interface ByPuuid { puuid: any, numberMatches: any }
interface Participant {
  teamId: number
  puuid: string
}

interface RelatedPlayers {
  allies: string[]
  enemies: string[]
  players: string[]
}

export const matchesRoutes = async (server: FastifyInstance): Promise<any> => {
  server.get('/by-puuid', async function handler (request: FastifyRequest, reply) {
    const { puuid, numberMatches } = request.query as ByPuuid
    let apiUrl = `${ROUTE_PATH}/by-puuid/${puuid}/ids`

    if (!puuid) {
      return await reply.code(400).send({ error: 'The gameName property is required' })
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
  })

  server.get('/related-players', async function handler (request: FastifyRequest, reply) {
    const { puuid, numberMatches } = request.query as ByPuuid
    let apiUrl = `${ROUTE_PATH}/by-puuid/${puuid}/ids`

    if (!puuid) {
      return await reply.code(400).send({ error: 'The gameName property is required' })
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

    const relatedPlayers: RelatedPlayers = { players: [], allies: [], enemies: [] }

    participantMatchesInformation.forEach((match) => {
      const { info } = match

      const actualPlayer = match.info.participants.find((participant: any) => {
        return participant.puuid === puuid
      })

      info.participants.forEach((participant: Participant) => {
        if (participant.puuid !== puuid) {
          if (participant.teamId === actualPlayer.teamId) {
            relatedPlayers.allies.push(participant.puuid)
          } else {
            relatedPlayers.enemies.push(participant.puuid)
          }

          relatedPlayers.players.push(participant.puuid)
        }
      })
    })

    const playersSet = new Set(relatedPlayers.players)

    const results = Array.from(playersSet).map((player) => {
      let countEnemy = 0
      let countAlly = 0

      for (const innerPlayer of relatedPlayers.enemies) {
        if (innerPlayer === player) {
          countEnemy++
        }
      }

      for (const inner of relatedPlayers.allies) {
        if (inner === player) {
          countAlly++
        }
      }

      const count = countEnemy + countAlly

      return { player, count, countAlly, countEnemy }
    })

    return results
  })

  server.get('/by-puuid/matches/resume', async function handler (request: FastifyRequest, reply) {
    const { puuid, numberMatches } = request.query as ByPuuid
    let apiUrl = `${ROUTE_PATH}/by-puuid/${puuid}/ids`

    if (!puuid) {
      return await reply.code(400).send({ error: 'The gameName property is required' })
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
  })

  server.get('/by-puuid/players', async function handler (request: FastifyRequest, reply) {
    const { puuid, numberMatches } = request.query as ByPuuid
    let apiUrl = `${ROUTE_PATH}/by-puuid/${puuid}/ids`

    if (!puuid) {
      return await reply.code(400).send({ error: 'The gameName property is required' })
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
  })
}
