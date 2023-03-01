import { get } from "svelte/store";
import { extensionConfig } from "$lib/store";
import Options from "./Options.svelte";
import { StorageDriver } from "$lib/util";

async function bootstrap() {
  await loadConfig();

  new Options({
    target: document.getElementById("app"),
  });
}

export async function loadConfig() {
  const config: ExtensionConfig = (await StorageDriver.get("config")).config;

  if (!config) {
    await StorageDriver.set({ config: get(extensionConfig) });

    return get(extensionConfig);
  } else {
    extensionConfig.set(config);
    extensionConfig.subscribe((config) => StorageDriver.set({ config }));
  }

  return config;
}

bootstrap();
