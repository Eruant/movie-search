const createBus = (defaultState = {}) => {
  const state = defaultState

  return {
    getState: () => state
  }
}

module.exports = {
  createBus
}
