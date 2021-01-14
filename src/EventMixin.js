import { EVENT_PROPERTY } from './constants'
import handleEventProxies from './handleEventProxies'

const EventMixin = Class => class extends Class {
  constructor () {
    super()

    Object.defineProperty(this, EVENT_PROPERTY, {
      value: new Map(),
      writable: true
    })
  }

  subscribe (expression, callback) {
    const subscription = Symbol('event-subscription')

    this[EVENT_PROPERTY].set(subscription, { expression, callback })

    return subscription
  }

  unsubscribe (subscription) {
    return this[EVENT_PROPERTY].delete(subscription)
  }

  trigger (type, data, thisObject) {
    const selectedThisObject = thisObject !== undefined ? thisObject : this

    for (const [subscription, { expression, callback }] of this[EVENT_PROPERTY]) {
      const matchArray = (typeof expression === 'string')
        ? expression === type
        : type.match(expression)

      if (!matchArray) continue

      callback.call(
        selectedThisObject,
        data,
        { subscription, ...(Array.isArray(matchArray) ? { matchArray } : {}) }
      )
    }

    handleEventProxies(this.eventProxies, this, type, data, selectedThisObject)

    return this
  }
}

export default EventMixin
