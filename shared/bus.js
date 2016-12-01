const isRequired = require('./isRequired')

const createBus = ({
  reducers = isRequired({
    category: 'createBus',
    property: 'reducers'
  }),
  defaultState = {}
} = {}) => {
  const state = defaultState

  const getState = () => state

  const subscribe = () => {
    const id = Math.random().toString(36).substring(12)
    return id
  }

  const dispatch = (action) => {
    if (!action || !action.type) {
      throw new Error('dispatch requires an object with a type property')
    }
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
