declare global {
  import { configHandler } from "$lib/store";

  type FeatureKey = keyof typeof configHandler;

  interface FeatureDetails {
    name: string;
    description: string;
    category: Category;
    exec(): void;
  }

  type ExtensionConfig = {
    [key in FeatureKey]: boolean;
  };
}

export {};
