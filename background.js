chrome.webNavigation.onCommitted.addListener(({ tabId, url }) => {
  console.log(url);
  if (!url.startsWith("https://services.northwestern.edu/TDNext"))
    return;

  chrome.storage.sync.get({
    darkMode: true
  }, async ({ darkMode }) => {
    if (darkMode)
      chrome.scripting.insertCSS({ files: ['assets/stylesheets/dark.css'], target: { allFrames: true, tabId: tabId } });
  });  
});

chrome.omnibox.onInputEntered.addListener(text => {
  const ticketNum = text.trim();
  chrome.tabs.query({ active: true, currentWindow: true }, ([ { id: tabId } ]) => {
    chrome.tabs.update(tabId, {
      url: `https://services.northwestern.edu/TDNext/Apps/31/Tickets/TicketDet.aspx?TicketID=${ticketNum}`
    });
  });
});

chrome.contextMenus.removeAll();

chrome.contextMenus.create({
  id: "tdxTicket",
  title: "Jump to TDx ticket",
  type: 'normal',
  contexts: ['selection']
});

chrome.contextMenus.onClicked.addListener(({ selectionText }, { id: tabId, index: tabIndex, windowId: tabWindowId }) => {
  const ticketNum = selectionText.trim();

  chrome.tabs.create({
    windowId:    tabWindowId,
    index:       tabIndex + 1,
    openerTabId: tabId,
    url:         `https://services.northwestern.edu/TDNext/Apps/31/Tickets/TicketDet.aspx?TicketID=${ticketNum}`,
    active:      true
  });
});