import { configHandler } from "$lib/store";
import { loadConfig } from "$lib/util";
import removeTableRowHighlight from "./removeTableRowHighlight";

async function init() {
  const config = await loadConfig();

  // Dynamically execute the `exec()` handler function for each enabled feature
  for (const feature in config) {
    config[feature] && configHandler[feature].exec();
  }

  // Execute remaining content scripts that aren't configurable
  removeTableRowHighlight();
}

init();
