const saveOptions = () => {
  const darkMode = document.getElementById('darkMode').checked;
  const tabs = document.getElementById('tabs').checked;
  const favicon = document.getElementById('favicon').checked;
  
  chrome.storage.sync.set({
    darkMode,
    tabs,
    favicon
  }, () => {
    // Update status to let user know options were saved.
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    darkMode: true,
    tabs: true, 
    favicon: true
  }, ({ darkMode, tabs, favicon }) => {
    document.getElementById('darkMode').checked = darkMode;
    document.getElementById('tabs').checked     = tabs;
    document.getElementById('favicon').checked  = favicon;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);