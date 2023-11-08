import { describe, expect, it, beforeAll, afterAll } from '@jest/globals'

import { server } from '../src/server'
import { type FastifyInstance } from 'fastify'

const USER_PUUID = 'B3CUQPBJVMCo56zojiKz_uBgAJkV0CdzlLiGYJb_ziGimmKp-RReRleuR3Doy1yzxmiDHTq5-ykk1g'
const NUMBER_MATCHES = 3

describe('#Matches suite', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = server
    await app.ready()
  })

  afterAll(() => {
    app.close()
  })

  async function makeDelayedRequest (options: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const response = await app.inject(options)
          resolve(response)
        } catch (error) {
          reject(error)
        }
      }, 1300)
    })
  }

  describe('#get matches by player puuid', () => {
    const BASE_URL = '/matches/by-puuid'

    it('should return status 400 when puuid is not informed', async () => {
      const mockInvalidPlayer = {
        puuid: ''
      }

      const response = await makeDelayedRequest({
        method: 'GET',
        url: `${BASE_URL}?puuid=${mockInvalidPlayer.puuid}`
      })

      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.body)).toEqual({ error: 'The puuid property is required' })
    })

    it('should return status 200 when puuid is informed', async () => {
      const mockPlayer = {
        puuid: USER_PUUID,
        numberMatches: NUMBER_MATCHES
      }

      const response = await makeDelayedRequest({
        method: 'GET',
        url: `${BASE_URL}?puuid=${mockPlayer.puuid}&numberMatches=${mockPlayer.numberMatches}`
      })

      expect(response.statusCode).toBe(200)
      expect(JSON.parse(response.body)).toBeInstanceOf(Array)

      const parsedData = JSON.parse(response.body)
      expect(parsedData).toBeInstanceOf(Array)
      expect(parsedData).toHaveLength(NUMBER_MATCHES)
    })
  })

  describe('#get matches played today', () => {
    const BASE_URL = '/matches/by-puuid/played-today'

    it('should return status 400 when puuid is not informed', async () => {
      const mockInvalidPlayer = {
        puuid: ''
      }

      const response = await makeDelayedRequest({
        method: 'GET',
        url: `${BASE_URL}?puuid=${mockInvalidPlayer.puuid}`
      })

      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.body)).toEqual({ error: 'The puuid property is required' })
    })

    it('should return status 200 when puuid is informed', async () => {
      const mockPlayer = {
        puuid: USER_PUUID
      }

      const response = await makeDelayedRequest({
        method: 'GET',
        url: `${BASE_URL}?puuid=${mockPlayer.puuid}`
      })

      expect(response.statusCode).toBe(200)
      expect(JSON.parse(response.body)).toBeInstanceOf(Array)
    })
  })

  describe('#get related players to a puuid', () => {
    const BASE_URL = '/matches/related-players'

    it('should return status 400 when puuid is not informed', async () => {
      const mockInvalidPlayer = {
        puuid: ''
      }

      const response = await makeDelayedRequest({
        method: 'GET',
        url: `${BASE_URL}?puuid=${mockInvalidPlayer.puuid}`
      })

      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.body)).toEqual({ error: 'The puuid property is required' })
    })
  })

  describe('#get matches-information to a puuid', () => {
    const BASE_URL = '/matches/matches-information'

    it('should return status 400 when puuid is not informed', async () => {
      const mockInvalidPlayer = {
        puuid: ''
      }

      const response = await makeDelayedRequest({
        method: 'GET',
        url: `${BASE_URL}?puuid=${mockInvalidPlayer.puuid}`
      })

      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.body)).toEqual({ error: 'The puuid property is required' })
    })
  })

  describe('#get by-puuid matches resume to a puuid', () => {
    const BASE_URL = '/matches/by-puuid/matches/resume'

    it('should return status 400 when puuid is not informed', async () => {
      const mockInvalidPlayer = {
        puuid: ''
      }

      const response = await makeDelayedRequest({
        method: 'GET',
        url: `${BASE_URL}?puuid=${mockInvalidPlayer.puuid}`
      })

      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.body)).toEqual({ error: 'The puuid property is required' })
    })

    it('should return status 200 when puuid and numbermatches is informed', async () => {
      const mockPlayer = {
        puuid: USER_PUUID,
        numberMatches: NUMBER_MATCHES
      }

      const response = await makeDelayedRequest({
        method: 'GET',
        url: `${BASE_URL}?puuid=${mockPlayer.puuid}`
      })

      expect(response.statusCode).toBe(200)
      expect(JSON.parse(response.body)).toBeInstanceOf(Object)
    })
  })

  describe('#get by-puuid champions to a puuid', () => {
    const BASE_URL = '/matches/by-puuid/champions'

    it('should return status 400 when puuid is not informed', async () => {
      const mockInvalidPlayer = {
        puuid: ''
      }

      const response = await makeDelayedRequest({
        method: 'GET',
        url: `${BASE_URL}?puuid=${mockInvalidPlayer.puuid}`
      })

      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.body)).toEqual({ error: 'The puuid property is required' })
    })
  })

  describe('#get by-puuid players to a puuid', () => {
    const BASE_URL = '/matches/by-puuid/players'

    it('should return status 400 when puuid is not informed', async () => {
      const mockInvalidPlayer = {
        puuid: ''
      }

      const response = await makeDelayedRequest({
        method: 'GET',
        url: `${BASE_URL}?puuid=${mockInvalidPlayer.puuid}`
      })

      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.body)).toEqual({ error: 'The puuid property is required' })
    })
  })
})
