import { describe, expect, it, beforeAll, afterAll } from '@jest/globals'

import { server } from '../src/server'
import { type FastifyInstance } from 'fastify'

describe('#Player Suite', () => {
  describe('#player information', () => {
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
        }, 2000)
      })
    }

    it('should return status 400 when gameName is not informed', async () => {
      const mockInvalidPlayer = {
        gameName: '',
        tagLine: '123'
      }

      const response = await makeDelayedRequest({
        method: 'GET',
        url: `/players/puuid?gameName=${mockInvalidPlayer.gameName}&tagLine=${mockInvalidPlayer.tagLine}`
      })

      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.body)).toEqual({ error: 'The gameName property is invalid' })
    })

    it('should return status 400 when tagLine is not informed', async () => {
      const mockInvalidPlayer = {
        gameName: 'playerGameName',
        tagLine: ''
      }

      const response = await makeDelayedRequest({
        method: 'GET',
        url: `/players/puuid?gameName=${mockInvalidPlayer.gameName}&tagLine=${mockInvalidPlayer.tagLine}`
      })

      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.body)).toEqual({ error: 'The tagLine property is invalid' })
    })

    it('should return status 200 when have tagline and gameName', async () => {
      const mockInvalidPlayer = {
        gameName: 'GaloPitapigas',
        tagLine: '1572'
      }

      const response = await makeDelayedRequest({
        method: 'GET',
        url: `/players/puuid?gameName=${mockInvalidPlayer.gameName}&tagLine=${mockInvalidPlayer.tagLine}`
      })

      expect(response.statusCode).toBe(200)

      expect(JSON.parse(response.body)).toEqual({
        gameName: 'GaloPitapigas', puuid: 'B3CUQPBJVMCo56zojiKz_uBgAJkV0CdzlLiGYJb_ziGimmKp-RReRleuR3Doy1yzxmiDHTq5-ykk1g', tagLine: '1572'
      })
    })
  })
})
