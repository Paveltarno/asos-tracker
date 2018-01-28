var port = chrome.runtime.connect()

window.addEventListener(
  'message',
  function(event) {
    if (event.source != window) return

    if (event.data.type && event.data.type == 'FROM_PAGE') {
      chrome.runtime.sendMessage({ sizes: event.data.sizes }, function(response) {
      })
    }
  },
  false
)
