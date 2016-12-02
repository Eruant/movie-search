const reducerTypes = {
  SEARCH_REQUEST: 'SEARCH_REQUEST'
}

const reducers = (state, action) => {
  switch (action.type) {
    case reducerTypes.SEARCH_REQUEST:
      return Object.assign({}, state, {
        search: Object.assign({}, state.search, {
          isLoading: true
        })
      })
    default:
      return Object.assign({}, state)
  }
}

module.exports = {
  reducerTypes,
  reducers
}
