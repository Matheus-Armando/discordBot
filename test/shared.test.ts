import { describe, expect, it } from '@jest/globals'
import { handleFindRelatedPlayers, handleMatchesResume, handleResumeChampions } from '../src/shared/matches'
import { participantMatchesInformation, playerMatches } from './mocks'

const USER_PUUID = 'B3CUQPBJVMCo56zojiKz_uBgAJkV0CdzlLiGYJb_ziGimmKp-RReRleuR3Doy1yzxmiDHTq5-ykk1g'

describe('#Resume matches suite', () => {
  describe('Handle resume matches', () => {
    it('should return correct resume', () => {
      const expectedResumeResult = {
        win: 1,
        lose: 0,
        deathAvg: 12,
        killAvg: 8,
        assistAvg: 42
      }

      const resumeResults = handleMatchesResume(participantMatchesInformation as [], playerMatches, USER_PUUID)

      expect(resumeResults).toStrictEqual(expectedResumeResult)
    })

    it('should throw if the participantMatchesInformation is not present', () => {
      expect(() => handleMatchesResume([], playerMatches, USER_PUUID)).toThrow(new Error('there is no participant matches information'))
    })

    it('should throw if the playerMatches is not present', () => {
      expect(() => handleMatchesResume(participantMatchesInformation as [], {}, USER_PUUID)).toThrow(new Error('there is no playerMatches information'))
    })

    it('should throw if the puuid is not present', () => {
      expect(() => handleMatchesResume(participantMatchesInformation as [], playerMatches, '')).toThrow(new Error('there is no puuid information'))
    })
  })

  describe('Handle find related players', () => {
    it('should return correct related players', () => {
      const expectedResumeResult = [
        {
          player: '4dqrTvLlCVbDpoeUtPD47MXDOxgfvaCHyhBNYUHNAGDzE0yz3j08vM-uQO6Xyq37Zh-gxcK_vgIUXg',
          count: 1,
          countAlly: 1,
          countEnemy: 0
        },
        {
          player: 'wTfdJh7nK3mChk1D63Jbcy1deV2pfzY7yBH3M_S3yhnCyMb3YrD80acx9KjPNYYP9EuyI-RgpyMFbg',
          count: 1,
          countAlly: 1,
          countEnemy: 0
        },
        {
          player: 'JHbvovUeRKoOLdv21ncQCMTZczpr8SwgTaggFZzdaVXake0XfKXuDQ7PsZiIZ_Zxvk1tp-Osuhhngw',
          count: 1,
          countAlly: 1,
          countEnemy: 0
        },
        {
          player: '7YHjc-iC2JFvdLJvEnt4vaq-w7ntzkIU5pmCPbkulPcQrDOkKBlWHsZMQ07D4MmVB0krX7t1J70AXw',
          count: 1,
          countAlly: 1,
          countEnemy: 0
        },
        {
          player: 'EVgCmuBDNwNXvfhJ776T6hZxths4SJY_U1942uvNK-6PwZ0R4lf5Q8Li43zfLH7hCL0BE9oqLeXE9w',
          count: 1,
          countAlly: 0,
          countEnemy: 1
        },
        {
          player: 'J9eSy4L2WZDcnjED3tySrGXbSdI8MkviOC_vIqdBUexb-Th7pLISEmVkfyz5Rljw7spfkwrPu-8PSA',
          count: 1,
          countAlly: 0,
          countEnemy: 1
        },
        {
          player: 'dk7izjVuj1qv5SpuEDQOaYOImV68-rfgbHTuKh8PzVmKtMCEDeqz1I27koU2ewvmzv9aETHXvGFYsg',
          count: 1,
          countAlly: 0,
          countEnemy: 1
        },
        {
          player: 'g6LvlABnwwF554-0IOX4KXOx-7m9sHhTQLj67lw_3J7c5cltZGeqgdgbB6fCfMM7C8gR2Aidnk_z-g',
          count: 1,
          countAlly: 0,
          countEnemy: 1
        },
        {
          player: '_AjZ3taNn5-xuLTXlEyLtqet_eFDucrYaEZFOVqRo_8NH95z5svqNWu2I3_4g8nIbCor1aPPpMHjsA',
          count: 1,
          countAlly: 0,
          countEnemy: 1
        }
      ]

      const resumeResults = handleFindRelatedPlayers(participantMatchesInformation as [], USER_PUUID)

      expect(resumeResults).toStrictEqual(expectedResumeResult)
    })

    it('should throw if the participantMatchesInformation is not present', () => {
      expect(() => handleFindRelatedPlayers([], USER_PUUID)).toThrow(new Error('there is no participant matches information'))
    })

    it('should throw if the puuid is not present', () => {
      expect(() => handleFindRelatedPlayers(participantMatchesInformation as [], '')).toThrow(new Error('there is no puuid information'))
    })
  })

  describe('Handle resume champions', () => {
    it('should return correct champions relation', () => {
      const expectedResumeResult = [
        {
          hero: 'Singed',
          count: 1
        }
      ]

      const resumeResults = handleResumeChampions(participantMatchesInformation as [], USER_PUUID)

      expect(resumeResults).toStrictEqual(expectedResumeResult)
    })

    it('should throw if the participantMatchesInformation is not present', () => {
      expect(() => handleResumeChampions([], USER_PUUID)).toThrow(new Error('there is no participant matches information'))
    })

    it('should throw if the puuid is not present', () => {
      expect(() => handleResumeChampions(participantMatchesInformation as [], '')).toThrow(new Error('there is no puuid information'))
    })
  })
})
