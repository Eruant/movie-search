const reducerTypes = {
  SEARCH_REQUEST: 'SEARCH_REQUEST',
  SEARCH_FAILURE: 'SEARCH_FAILURE',
  SEARCH_SUCCESS: 'SEARCH_SUCCESS'
}

const reducers = (state, action) => {
  switch (action.type) {
    case reducerTypes.SEARCH_REQUEST:
      return Object.assign({}, state, {
        search: Object.assign({}, state.search, {
          isLoading: true
        })
      })

    case reducerTypes.SEARCH_FAILURE:
      return Object.assign({}, state, {
        search: Object.assign({}, state.search, {
          isLoading: false,
          error: action.error
        })
      })

    case reducerTypes.SEARCH_SUCCESS:
      return Object.assign({}, state, {
        search: Object.assign({}, state.search, {
          isLoading: false,
          data: action.data,
          error: null
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
