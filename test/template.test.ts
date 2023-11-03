import { expect, it } from '@jest/globals'

function sum (a: number, b: number): number {
  return a + b
}

it('should sum two values', () => {
  expect(sum(2, 3)).toBe(5)
})
