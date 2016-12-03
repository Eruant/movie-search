const init = () => {
  window.document.removeEventListener('DOMContentLoaded', init)

  console.log('page loaded')
}

window.document.addEventListener('DOMContentLoaded', init)
