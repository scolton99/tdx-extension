import { runtime } from "webextension-polyfill";

export default function updateFavicon() {
  const icons = [...document.querySelectorAll('link[rel~="icon"]')];

  if (icons.length > 0) {
    icons.forEach((icon) => icon.parentElement.removeChild(icon));
  }

  const favicon32 = runtime.getURL("icons/32.png");
  const favicon16 = runtime.getURL("icons/16.png");

  const favicon32Link = document.createElement("link");
  favicon32Link.setAttribute("rel", "icon");
  favicon32Link.setAttribute("type", "image/png");
  favicon32Link.setAttribute("sizes", "32x32");
  favicon32Link.setAttribute("href", favicon32);

  const favicon16Link = document.createElement("link");
  favicon16Link.setAttribute("rel", "icon");
  favicon16Link.setAttribute("type", "image/png");
  favicon16Link.setAttribute("sizes", "16x16");
  favicon16Link.setAttribute("href", favicon16);

  document.head.appendChild(favicon32Link);
  document.head.appendChild(favicon16Link);
}
