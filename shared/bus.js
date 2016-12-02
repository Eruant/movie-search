const isRequired = require('./isRequired')

const createBus = ({
  reducers = isRequired({
    category: 'createBus',
    property: 'reducers'
  }),
  defaultState = {}
} = {}) => {
  let state = defaultState
  const subscriptions = []

  const getState = () => state

  const subscribe = (callback) => {
    const id = Math.random().toString(36).substring(12)
    subscriptions.push({id, callback})
    return id
  }

  const dispatch = (action) => {
    if (!action || !action.type) {
      throw new Error('dispatch requires an object with a type property')
    }

    state = reducers(state, action)

    subscriptions.forEach(subscription => {
      subscription.callback()
    })
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}

module.exports = {
  createBus
}
