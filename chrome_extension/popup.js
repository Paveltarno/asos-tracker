document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    let sizesList = document.getElementById('sizes')

    for (var index = 0; index < request.sizes.length; index++) {
      let item = document.createElement('li')
      item.innerText = request.sizes[index]
      sizesList.appendChild(item)
    }
  })

  function modifyDOM() {
    let sizeSelector = document.body.querySelector("[data-id='sizeSelect']")

    const available = []

    for (var index = 0; index < sizeSelector.children.length; index++) {
      var element = sizeSelector.children[index]
      if (element.text !== 'Please select' && element.text.indexOf('Not available') === -1)
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
