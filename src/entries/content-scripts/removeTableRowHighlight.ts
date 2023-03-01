export default function removeTableRowHighlight() {
  const observer = new MutationObserver(() => {
    document.querySelectorAll('[onclick*="hilite"]').forEach((it) => {
      it.removeAttribute("onclick");
      const newNode = it.cloneNode(true);
      it.parentNode.replaceChild(newNode, it);
    });
  });

  observer.observe(document, {
    attributes: true,
    subtree: true,
    childList: true,
  });
}
