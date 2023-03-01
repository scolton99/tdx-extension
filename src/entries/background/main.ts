import {
  scripting,
  webNavigation,
  tabs,
  omnibox,
  runtime,
} from "webextension-polyfill";
import { extensionConfig } from "$lib/store";
import { get } from "svelte/store";
import { contextMenu } from "./context-menu";
import { StorageDriver, featureIsEnabled } from "$lib/util";
import "$styles/dark.scss";

runtime.onInstalled.addListener(async () => {
  StorageDriver.set({ config: get(extensionConfig) });
});

webNavigation.onCommitted.addListener(async ({ tabId, url }) => {
  if (!url.startsWith("https://services.northwestern.edu/TDNext")) return;

  if (await featureIsEnabled("darkTheme")) {
    const manifestVersion = runtime.getManifest().manifest_version;
    const file = manifestVersion === 3 ? "main.css" : "background.css";
    scripting.insertCSS({
      files: [file],
      target: { allFrames: true, tabId: tabId },
    });
  }

  omnibox.onInputEntered.addListener(async (text) => {
    const ticketNumber = text.trim();

    const [tab] = await tabs.query({ active: true, currentWindow: true });
    await tabs.update(tab.id, {
      url: `https://services.northwestern.edu/TDNext/Apps/31/Tickets/TicketDet.aspx?TicketID=${ticketNumber}`,
    });
  });

  contextMenu.init();
});
