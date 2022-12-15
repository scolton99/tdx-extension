chrome.storage.sync.get({ favicon: true }, ({ favicon }) => {
  if (!favicon)
    return;

  const icons = document.querySelectorAll('link[rel~="icon"]');
  for (const icon of Array.from(icons)) 
    icon.parentElement.removeChild(icon);
  
  const favicon32 = chrome.runtime.getURL('assets/images/td-32.png');
  const favicon16 = chrome.runtime.getURL('assets/images/td-16.png');
  
  const favicon32Link = document.createElement('link');
  favicon32Link.setAttribute('rel',   'icon');
  favicon32Link.setAttribute('type',  'image/png');
  favicon32Link.setAttribute('sizes', '32x32');
  favicon32Link.setAttribute('href',  favicon32);
  
  const favicon16Link = document.createElement('link');
  favicon16Link.setAttribute('rel',   'icon');
  favicon16Link.setAttribute('type',  'image/png');
  favicon16Link.setAttribute('sizes', '16x16');
  favicon16Link.setAttribute('href',  favicon16);
  
  document.head.appendChild(favicon32Link);
  document.head.appendChild(favicon16Link);
});


