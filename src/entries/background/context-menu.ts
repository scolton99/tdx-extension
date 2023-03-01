import { contextMenus, tabs } from "webextension-polyfill";

async function init() {
  await contextMenus.removeAll();

  contextMenus.create({
    id: "tdxTicket",
    title: "Jump to TDx ticket",
    type: "normal",
    contexts: ["selection"],
  });

  contextMenus.onClicked.addListener(
    (
      { selectionText },
      { id: tabId, index: tabIndex, windowId: tabWindowId }
    ) => {
      const ticketNum = selectionText.trim();

      tabs.create({
        windowId: tabWindowId,
        index: tabIndex + 1,
        openerTabId: tabId,
        url: `https://services.northwestern.edu/TDNext/Apps/31/Tickets/TicketDet.aspx?TicketID=${ticketNum}`,
        active: true,
      });
    }
  );
}

export const contextMenu = {
  init,
};
