const moment = require('moment')

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

    const table = doc.createElement('table')

    search.data.results.forEach((result, index) => {
      if (index === 0) {
        const thead = doc.createElement('thead')
        const tr = doc.createElement('tr')

        ;['Title', 'Released', 'Popularity'].map(field => {
          const th = doc.createElement('th')
          th.innerHTML = field
          tr.appendChild(th)
        })

        thead.appendChild(tr)
        table.appendChild(thead)
      }

      const tbody = doc.createElement('tbody')
      const tr = doc.createElement('tr')

      ;[
        'original_title',
        'release_date',
        'popularity'
      ].map(field => {
        let value = result[field]

        const td = doc.createElement('td')

        if (/date/.test(field)) {
          value = moment(value, 'YYYY-MM-DD').format('Do MMMM YYYY')
        }

        if (field === 'popularity') {
          value = value.toFixed(2)
        }

        td.innerHTML = value

        tr.appendChild(td)
      })

      tbody.appendChild(tr)
      table.appendChild(tbody)
    })

    results.removeChild(results.childNodes[0])
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
