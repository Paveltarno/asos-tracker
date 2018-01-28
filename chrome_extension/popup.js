document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    let container = document.getElementById('container')

    for (var index = 0; index < request.sizes.length; index++) {
      let size = request.sizes[index]
      
      let div = document.createElement('div')
      
      const id = `size-checkbox-${index}`
      
      let checkbox = document.createElement('input')
      checkbox.type = "checkbox"
      checkbox.name = "name"
      checkbox.value = size
      checkbox.id = id
      
      let label = document.createElement('label')
      label.htmlFor = id
      label.appendChild(document.createTextNode(size))
      
      div.appendChild(checkbox)
      div.appendChild(label)
      container.appendChild(div)
    }
  })

  function modifyDOM() {
    let sizeSelector = document.body.querySelector("[data-id='sizeSelect']")

    const available = []

    for (var index = 0; index < sizeSelector.children.length; index++) {
      var element = sizeSelector.children[index]
      if (element.text !== 'Please select' && element.text.indexOf('Not available') !== -1)
        available.push(element.text)
    }

    window.postMessage({ type: 'FROM_PAGE', sizes: available }, '*')

    return document.body.innerHTML
  }

  chrome.tabs.executeScript({
    code: '(' + modifyDOM + ')();', 
  })
  console.log('URL', window.url)
})
