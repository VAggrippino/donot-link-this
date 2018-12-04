chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({'file': 'ui.js'},
      () => chrome.tabs.insertCSS({'file': 'ui.css'},
          () => chrome.tabs.executeScript({'code': 'activate()'})
      )
  );
});
