import { type Participant, type RelatedPlayers } from '../types'

export const handleMatchesResume = (participantMatchesInformation: [], playerMatches: any, puuid: string): any => {
  let win = 0
  let lose = 0
  let deaths = 0
  let kills = 0
  let assists = 0

  if (participantMatchesInformation.length === 0) {
    throw new Error('there is no participant matches information')
  }

  if (!playerMatches.data) {
    throw new Error('there is no playerMatches information')
  }

  if (!puuid || puuid === '') {
    throw new Error('there is no puuid information')
  }

  participantMatchesInformation.forEach((match: any) => {
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
}

export const handleFindRelatedPlayers = (participantMatchesInformation: any, puuid: string): any => {
  const relatedPlayers: RelatedPlayers = { players: [], allies: [], enemies: [] }

  if (participantMatchesInformation.length === 0) {
    throw new Error('there is no participant matches information')
  }

  if (!puuid || puuid === '') {
    throw new Error('there is no puuid information')
  }

  participantMatchesInformation.forEach((match: any) => {
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

export const handleResumeChampions = (participantMatchesInformation: any, puuid: string): any => {
  const heroes: string[] = []

  if (participantMatchesInformation.length === 0) {
    throw new Error('there is no participant matches information')
  }

  if (!puuid || puuid === '') {
    throw new Error('there is no puuid information')
  }

  participantMatchesInformation.forEach((match: any) => {
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
}
