const refreshAll = () => {
  [
    ...document.querySelectorAll(
      ".desktop-module .panel-heading a.refreshAnchor > span.fa-refresh"
    ),
  ].forEach((button: HTMLElement) => button.click());
};

export default function autoRefresh() {
  window.setInterval(refreshAll, 120_000);
}
