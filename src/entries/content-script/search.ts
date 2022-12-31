export default async function searchTabs() {
  document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("btnSearch");
    searchButton.removeAttribute("onclick");

    const newSearchButton = <HTMLElement>searchButton.cloneNode(true);
    newSearchButton.setAttribute("onclick", "searchTabs()");
    searchButton.parentNode.replaceChild(newSearchButton, searchButton);

    const newScript = document.createElement("script");
    newScript.type = "text/javascript";
    newScript.innerHTML = `
    function searchTabs() {
      const searchText = $("#txtItemIDLookup").val().trim();
      const isInteger = /^\\d*$/.test(searchText);
      if (isInteger && searchText.length > 0) {
        window.open(
          'https://services.northwestern.edu/TDNext/Apps/31/Tickets/TicketDet.aspx?TicketID=' + searchText,
          '_blank'
        );
      } else {
        TeamDynamix.osjs.openApp(
          "appSearch",
          "Search",
          "/TDNext/Apps/Shared/Global/Search?searchText=" +
            encodeURIComponent(searchText)
        );
        $("#txtItemIDLookup").val("");
      }
    }
    `;

    document.head.appendChild(newScript);
  });
}
