const moment = require('moment')

const dataStore = require('../shared/dataStore')
const search = require('../shared/search')

const doc = window.document

const init = () => {
  doc.removeEventListener('DOMContentLoaded', init)

  // set up elements on the page
  const h1 = doc.createElement('h1')
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

    const table = doc.createElement('table')
    const thead = doc.createElement('thead')
    const tbody = doc.createElement('tbody')

    const mappings = [
      {key: 'original_title', value: 'Title'},
      {key: 'release_date', value: 'Release date'},
      {key: 'popularity', value: 'Popularity'}
    ]

    search.data.results.forEach((result, index) => {
      if (index === 0) {
        const tr = doc.createElement('tr')

        mappings.map(field => {
          const th = doc.createElement('th')
          th.innerHTML = field.value
          tr.appendChild(th)
        })

        thead.appendChild(tr)
        table.appendChild(thead)
      }

      const tr = doc.createElement('tr')

      mappings.map(field => {
        let value = result[field.key]

        const td = doc.createElement('td')
        td.setAttribute('data-type', field.value)

        if (/date/.test(field.key)) {
          value = moment(value, 'YYYY-MM-DD').format('Do MMMM YYYY')
        }

        if (field.key === 'popularity') {
          value = value.toFixed(2)
        }

        td.innerHTML = value

        tr.appendChild(td)
      })

      tbody.appendChild(tr)
    })

    table.appendChild(tbody)

    results.removeChild(results.childNodes[0])
    results.appendChild(table)
  })

  // set up page
  h1.innerHTML = 'Movie Search'
  button.innerHTML = 'Search'

  document.title = 'Movie Search'

  form.appendChild(input)
  form.appendChild(button)

  doc.body.appendChild(h1)
  doc.body.appendChild(form)
  doc.body.appendChild(results)

  const handleSubmit = event => {
    event.preventDefault()

    search(input.value)
  }

  form.addEventListener('submit', handleSubmit)
}

doc.addEventListener('DOMContentLoaded', init)
