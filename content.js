chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == 'extractText') {
    var pageText = window.getSelection().toString();
    sendResponse({ text: pageText });
    return true; // indicates that sendResponse will be called asynchronously
  }
});
