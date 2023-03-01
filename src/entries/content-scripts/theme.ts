import { runtime } from "webextension-polyfill";
import descriptionColor from "./descriptionColor";

export default function enableDarkTheme() {
  /*
    Firefox has a flash of unstyled content issue with TDX before the background
    script is able to inject the CSS. This workaround manually injects it in the
    content script to avoid the bug.
  */
  const manifestVersion = runtime.getManifest().manifest_version;
  if (manifestVersion === 2) {
    const darkStyles = document.createElement("link");
    darkStyles.rel = "stylesheet";
    darkStyles.type = "text/css";
    darkStyles.href = runtime.getURL("background.css");
    document.documentElement.appendChild(darkStyles);
  }

  descriptionColor();
}
