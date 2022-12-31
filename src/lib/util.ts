import { runtime, storage } from "webextension-polyfill";
import { get } from "svelte/store";
import { extensionConfig } from "$lib/store";

export const StorageDriver = runtime.id.includes("temporary-addon")
  ? storage.local
  : storage.sync;

export async function loadConfig(): Promise<ExtensionConfig> {
  const config: ExtensionConfig = (await StorageDriver.get("config")).config;

  if (!config) {
    await StorageDriver.set({ config: get(extensionConfig) });
    extensionConfig.set(config);

    return get(extensionConfig);
  }

  return config;
}

export async function featureIsEnabled(feature: FeatureKey): Promise<boolean> {
  const config: ExtensionConfig = (await StorageDriver.get("config")).config;

  return config[feature];
}
