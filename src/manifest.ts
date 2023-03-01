const sharedManifest = {
  icons: {
    16: "icons/16.png",
    32: "icons/32.png",
    48: "icons/48.png",
    128: "icons/128.png",
  },
  permissions: [
    "storage",
    "scripting",
    "activeTab",
    "webNavigation",
    "contextMenus",
  ],
  options_ui: {
    page: "src/entries/options/index.html",
  },
  omnibox: {
    keyword: "tdx",
  },
  content_scripts: [
    {
      js: ["src/entries/content-scripts/main.ts"],
      matches: ["https://services.northwestern.edu/TDNext/*"],
      run_at: "document_start",
      all_frames: true,
    },
  ],
};

const browserAction = {
  default_icon: {
    16: "icons/16.png",
    32: "icons/32.png",
    48: "icons/48.png",
  },
  default_popup: "src/entries/popup/index.html",
};

export const ManifestV2 = {
  ...sharedManifest,
  manifest_version: 2,
  browser_action: browserAction,
  background: {
    scripts: ["src/entries/background/main.ts"],
    persistent: true,
  },
  permissions: [
    ...sharedManifest.permissions,
    "https://services.northwestern.edu/*",
  ],
  web_accessible_resources: ["icons/*", "background.css"],
};

export const ManifestV3 = {
  ...sharedManifest,
  manifest_version: 3,
  action: browserAction,
  background: {
    service_worker: "src/entries/background/main.ts",
  },
  host_permissions: ["https://services.northwestern.edu/*"],
  web_accessible_resources: [
    {
      resources: ["icons/*", "main.css"],
      matches: ["https://services.northwestern.edu/*"],
    },
  ],
};
