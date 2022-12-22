window.setTimeout(() => {
  if (typeof(window.search) !== 'function')
    return;

  window.search = () => {
    const searchText = $('#txtItemIDLookup').val().trim();
    const isInteger = /^\d*$/.test(searchText);
    if (isInteger && searchText.length > 0) {
      window.open('/TDNext/Apps/Search/LookupItem?searchText=' + encodeURIComponent($('#txtItemIDLookup').val()));
    } else if (false === false) {
      TeamDynamix.osjs.openApp('appSearch', 'Search', '/TDNext/Apps/Shared/Global/Search?searchText=' + encodeURIComponent(searchText));
      $('#txtItemIDLookup').val('')
    }
  };
}, 100);