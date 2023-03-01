export default function openInTabs() {
  const applicableLinks = [
    "TicketDet",
    "ContactInfo.aspx",
    "PersonDet.aspx",
    "AccountDetail.aspx",
    "TicketSLAHistory",
    "Tickets/New",
    "Edit.aspx",
  ];

  const observer = new MutationObserver(() => {
    document
      .querySelectorAll(
        applicableLinks
          .map((it) => `a[href*="${it}"]:not([data-fixed="true"])`)
          .join(", ")
      )
      .forEach((it) => {
        if (it.parentElement.parentElement.classList.contains("nav-tabs"))
          return;

        it.removeAttribute("onclick");
        const newNode = <HTMLElement>it.cloneNode(true);
        it.parentNode.replaceChild(newNode, it);
        newNode.setAttribute("target", "_blank");
        newNode.dataset.fixed = "true";
      });

    const fixOnClick = (listElement: Element, sub: boolean) => {
      const match = listElement
        .getAttribute("onclick")
        .match(/openWin\('(.*?)'/);
      if (match.length < 2) return;

      const [_, path] = match;
      const link = sub ? listElement : listElement.querySelector("a");

      if (!link) return;

      listElement.removeAttribute("onclick");
      const newEl = <HTMLElement>listElement.cloneNode(true);
      listElement.parentNode.replaceChild(newEl, listElement);

      if (!sub) {
        newEl.firstElementChild.removeAttribute("onclick");
        newEl.firstElementChild.setAttribute("href", path);

        if (path.includes("Tickets/Update"))
          newEl.firstElementChild.setAttribute("target", "_blank");
      } else {
        newEl.setAttribute("href", path);
      }
    };

    const fixMenu = (id: string, sub: boolean) => {
      const btnActions = document.getElementById(id);
      if (!btnActions) return;

      const dropdown = btnActions.nextElementSibling;
      if (!dropdown) return;

      const sel = `${sub ? "a" : "li"}[onclick*="openWin"]`;
      const listElements = dropdown.querySelectorAll(sel);
      for (const listElement of listElements) {
        fixOnClick(listElement, sub);
      }
    };

    fixMenu("btnActions", false);
    fixMenu("dropdownMenu1", true);
  });

  observer.observe(document, {
    subtree: true,
    childList: true,
    attributes: true,
  });
}
