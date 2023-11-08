export interface RelatedPlayers {
  allies: string[]
  enemies: string[]
  players: string[]
}

export interface ByPuuid { puuid: any, numberMatches: any }

export interface Participant {
  teamId: number
  puuid: string
}
