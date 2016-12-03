const dataStore = require('../shared/dataStore')
const search = require('../shared/search')

const doc = window.document

const init = () => {
  doc.removeEventListener('DOMContentLoaded', init)

  dataStore.subscribe(() => {
    console.log(dataStore.getState())
  })

  const form = doc.createElement('form')
  const input = doc.createElement('input')
  const button = doc.createElement('button')

  button.innerHTML = 'Search'

  form.appendChild(input)
  form.appendChild(button)

  doc.body.appendChild(form)

  const handleSubmit = event => {
    event.preventDefault()

    search(input.value)
  }

  form.addEventListener('submit', handleSubmit)
}

doc.addEventListener('DOMContentLoaded', init)
