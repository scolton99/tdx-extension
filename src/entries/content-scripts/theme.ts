import { runtime } from "webextension-polyfill";
import descriptionColor from "./descriptionColor";

export default function enableDarkTheme() {
  document.documentElement.classList.add("dark");

  const darkStyles = document.createElement("link");
  darkStyles.rel = "stylesheet";
  darkStyles.type = "text/css";
  darkStyles.href = runtime.getURL("background.css");
  document.documentElement.appendChild(darkStyles);

  descriptionColor();
}
