import { describe, expect, it, beforeAll, afterAll } from '@jest/globals'

import { server } from '../src/server'
import { type FastifyInstance } from 'fastify'

const USER_PUUID = 'B3CUQPBJVMCo56zojiKz_uBgAJkV0CdzlLiGYJb_ziGimmKp-RReRleuR3Doy1yzxmiDHTq5-ykk1g'
const NUMBER_MATCHES = 3

describe('#Matches suite', () => {
  describe('#get matches ids by puuid', () => {
    let app: FastifyInstance

    beforeAll(async () => {
      app = server
      await app.ready()
    })

    afterAll(() => {
      app.close()
    })

    it('should return status 400 when puuid is not informed', async () => {
      const mockInvalidPlayer = {
        puuid: ''
      }

      const response = await app.inject({
        method: 'GET',
        url: `/matches/by-puuid?puuid=${mockInvalidPlayer.puuid}`
      })

      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.body)).toEqual({ error: 'The puuid property is required' })
    })

    it('should return status 200 when puuid is informed', async () => {
      const mockPlayer = {
        puuid: USER_PUUID
      }

      const response = await app.inject({
        method: 'GET',
        url: `/matches/by-puuid?puuid=${mockPlayer.puuid}`
      })

      expect(response.statusCode).toBe(200)
      expect(JSON.parse(response.body)).toBeInstanceOf(Array)
    })

    it('should return an array with the size of the prop numberMatches', async () => {
      const mockInvalidPlayer = {
        puuid: USER_PUUID,
        numberMatches: NUMBER_MATCHES
      }

      const response = await app.inject({
        method: 'GET',
        url: `/matches/by-puuid?puuid=${mockInvalidPlayer.puuid}&numberMatches=${mockInvalidPlayer.numberMatches}`
      })

      expect(response.statusCode).toBe(200)

      const parsedData = JSON.parse(response.body)
      expect(parsedData).toBeInstanceOf(Array)
      expect(parsedData).toHaveLength(NUMBER_MATCHES)
    })
  })
})
