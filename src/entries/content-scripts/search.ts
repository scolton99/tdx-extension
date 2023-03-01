export default async function searchTabs() {
  document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("btnSearch");
    searchButton.setAttribute("onclick", "searchTabs()");

    const searchTabs = document.createElement("script");
    searchTabs.type = "text/javascript";
    searchTabs.innerHTML = `
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

    document.head.appendChild(searchTabs);
  });
}
