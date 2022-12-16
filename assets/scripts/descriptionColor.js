const lighten = (color, bkgnd) => {
  while (!tinycolor.isReadable(color, bkgnd))
    color.lighten();

  return color;
};

const fixColors = (descendant, bkgnd) => {
  const style = getComputedStyle(descendant);
  if (!('color' in style))
    return;

  const currentColor = tinycolor(style.color);
  const grayColor    = tinycolor(style.color).greyscale();
  if (tinycolor.equals(currentColor, grayColor)) {
    descendant.style.color = '#ccc';
    return;
  }

  const light = lighten(tinycolor(currentColor.toHexString()), bkgnd);
  if (tinycolor.equals(currentColor, light))
    return;

  descendant.style.color = light.toHexString();
};

const fixDescription = async () => {
  const descriptionContainer = document.getElementById("ttDescription");
  if (!descriptionContainer || typeof(descriptionContainer.dataset.fixed) !== 'undefined')
    return;

  descriptionContainer.dataset.fixed = 'true';

  const descendants = descriptionContainer.getElementsByTagName("*");
  for (const descendant of Array.from(descendants)) {
    fixColors(descendant, '#202124');
  }
};

const fixFeedItems = async () => {
  const feedItems = document.querySelectorAll('.feed-body .feed-child-box:not([data-fixed="true"])');
  for (const item of Array.from(feedItems)) {
    item.dataset.fixed = 'true';
    const descendants = item.getElementsByTagName('*');
    for (const descendant of descendants)
      fixColors(descendant, '#33353a');
  }
};

const fixAll = () => {
  fixDescription();
  fixFeedItems();
};

(async () => {
  const { darkMode } = await chrome.storage.sync.get({ darkMode: true });
  if (!darkMode) return;
  
  const observer = new MutationObserver(fixAll);
  
  observer.observe(document.body, { subtree: true, childlist: true, attributes: true });
})();

window.addEventListener('load', fixAll);
