import handleEventProxies from '../src/handleEventProxies'

describe('handleEventProxies', () => {
  const origin = {}
  const type = 'state.change'
  const data = {}
  const thisObject = {}

  describe('when "proxies" argument is "null" or "undefined"', () => {
    it('returns "undefined"', () => {
      expect(handleEventProxies(null, origin, type, data, thisObject)).toBeUndefined()
      expect(handleEventProxies(undefined, origin, type, data, thisObject)).toBeUndefined()
    })
  })

  describe('when "proxies" argument is a single object', () => {
    const proxies = { trigger: jest.fn() }

    it('calls "proxy"`s "trigger" method with the proper arguments', () => {
      expect(handleEventProxies(proxies, origin, type, data, thisObject)).toBeUndefined()
      expect(proxies.trigger).toBeCalledWith(type, expect.objectContaining({ data, origin }), thisObject)
    })
  })

  describe('when "proxies" argument is an array', () => {
    const proxies = [{ trigger: jest.fn() }, { trigger: jest.fn() }]

    it('calls "trigger" method of each "proxy" with the proper arguments', () => {
      expect(handleEventProxies(proxies, origin, type, data, thisObject)).toBeUndefined()
      expect(proxies[0].trigger).toBeCalledWith(type, expect.objectContaining({ data, origin }), thisObject)
      expect(proxies[1].trigger).toBeCalledWith(type, expect.objectContaining({ data, origin }), thisObject)
    })
  })

  describe('when there is no "thisObject"', () => {
    const proxy = { trigger: jest.fn() }

    it('sends "origin" as an "thisObject"`s argument to the "proxy"`s "trigger" method', () => {
      handleEventProxies(proxy, origin, type, data, undefined)

      expect(proxy.trigger).toBeCalledWith(type, expect.objectContaining({ data, origin }), origin)
    })
  })
})
