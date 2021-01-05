import { EVENT_PROPERTY } from '../src/constants'

describe('constants', () => {
  describe('EVENT_PROPERTY', () => {
    it('is a "Symbol"', () => {
      expect(typeof EVENT_PROPERTY).toBe('symbol')
    })
  })
})
