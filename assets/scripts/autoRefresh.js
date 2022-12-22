const refreshAll = () => {
  const refreshButtons = document.querySelectorAll('.desktop-module .panel-heading a.refreshAnchor > span.fa-refresh');
  for (const button of Array.from(refreshButtons))
    button.click();
};

chrome.storage.sync.get({
  autoRefresh: true
}, ({ autoRefresh }) => {
  if (!autoRefresh) return;

  window.setInterval(refreshAll, 120_000);
});