const dataStore = require('../shared/dataStore')
const search = require('../shared/search')

const doc = window.document

const init = () => {
  doc.removeEventListener('DOMContentLoaded', init)

  // set up elements on the page
  const form = doc.createElement('form')
  const input = doc.createElement('input')
  const button = doc.createElement('button')
  const results = doc.createElement('div')

  // subscribe to data changes
  dataStore.subscribe(() => {
    const {search} = dataStore.getState()

    if (search.isLoading) {
      results.innerHTML = 'Fetching your results'
      return
    }

    console.log(search.data)
    const table = doc.createElement('table')

    // TODO map data and display

    results.innerHTML = ''
    results.appendChild(table)
  })

  // set up page
  button.innerHTML = 'Search'

  form.appendChild(input)
  form.appendChild(button)

  doc.body.appendChild(form)
  doc.body.appendChild(results)

  const handleSubmit = event => {
    event.preventDefault()

    search(input.value)
  }

  form.addEventListener('submit', handleSubmit)
}

doc.addEventListener('DOMContentLoaded', init)
