// background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'extractText') {
    var pageText = document.body.innerText;
    sendResponse({text: pageText});
  }
});

chrome.contextMenus.create({
  id: "myContextMenu",
  title: "My Extension",
  contexts: ["all"],
  onclick: function(info, tab) {
    chrome.tabs.sendMessage(tab.id, {action: "runExtension"});
  }
});