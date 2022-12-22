const options = {
  darkMode:   {
    defaultValue: true,
    description:  'Enable Dark Mode'
  },
  tabs: {
    defaultValue: true,
    description:  'Enable Opening in Tabs'
  },
  favicon: {
    defaultValue: true,
    description:  'Enable Northwestern-colored Favicon'
  },
  searchTabs: {
    defaultValue: false,
    description:  'Enable Opening in New Tab from Search Bar'
  },
  autoRefresh: {
    defaultValue: true,
    description:  'Auto-refresh desktop search results'
  }
};

const optionDefaults = () => {
  const def = {};
  for (const [option, { defaultValue }] of Object.entries(options))
    def[option] = defaultValue;

  return def;
}

const saveOptions = () => {
  const opts = {};
  for (const option of Object.keys(options)) {
    const el = document.getElementById(option);
    if (!el) {
      console.error(`Couldn't find checkbox for ${option}`);
      continue;
    }

    opts[option] = el.checked;
  }
  
  chrome.storage.sync.set(opts, () => {
    // Update status to let user know options were saved.
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 750);
  });
}

const initializeHTML = () => {
  const optionsArea = document.getElementById('optionsArea');
  if (!optionsArea) {
    console.error('Couldn\'t find options area.');
    return;
  }

  let first = true;
  for (const [option, { description, defaultValue }] of Object.entries(options)) {
    if (first) {
      first = false;
    } else {
      optionsArea.appendChild(document.createElement('br'));
    }

    const label = document.createElement('label');

    const checkbox   = document.createElement('input');
    checkbox.type    = 'checkbox';
    checkbox.id      = option;
    checkbox.checked = defaultValue;

    const span       = document.createElement('span');
    span.textContent = description;

    label.appendChild(checkbox);
    label.appendChild(span);

    optionsArea.appendChild(label);
  }

  restoreOptions();
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    ...optionDefaults()
  }, defaults => {
    for (const [option, value] of Object.entries(defaults)) {
      const checkbox = document.getElementById(option);
      if (!checkbox) {
        console.error(`Couldn't find checkbox for ${option}`);
        continue;
      }

      checkbox.checked = value;
    }
  });
}

document.addEventListener('DOMContentLoaded', initializeHTML);
document.getElementById('save').addEventListener('click', saveOptions);