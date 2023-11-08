import { ROUTE_PATH } from '../constants'
import { getApi } from '../service'
import { type Participant, type RelatedPlayers } from '../types'

export const handleFindRelatedPlayers = async (playerMatches: any, puuid: string): Promise<any> => {
  const api = await getApi()

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
}
