import { withPrevious } from "svelte-previous";
import {
  enableDarkTheme,
  openInTabs,
  updateFavicon,
  searchTabs,
  autoRefresh,
} from "~/entries/content-scripts";

const [currentExtensionConfig_, previousExtensionConfig_] = withPrevious<
  Record<FeatureKey, boolean>
>({
  darkTheme: true,
  tabs: true,
  favicon: true,
  searchTabs: false,
  autoRefresh: true,
});

enum Category {
  APPEARANCE = "appearance",
  IMPROVEMENTS = "improvements",
  FEATURES = "features",
}

export const configHandler: Record<FeatureKey, FeatureDetails> = {
  darkTheme: {
    name: "Dark Theme",
    description: "Enable a Northwestern-styled dark theme",
    category: Category.APPEARANCE,
    exec() {
      enableDarkTheme();
    },
  },
  tabs: {
    name: "Tabs",
    description: "Enable opening links in tabs instead of new windows",
    category: Category.IMPROVEMENTS,
    exec() {
      openInTabs();
    },
  },
  favicon: {
    name: "Favicon",
    description: "Enable a Northwestern-colored favicon",
    category: Category.APPEARANCE,
    exec() {
      updateFavicon();
    },
  },
  searchTabs: {
    name: "Search Tabs",
    description: "Enable opening in a new tab from the search bar",
    category: Category.IMPROVEMENTS,
    exec() {
      searchTabs();
    },
  },
  autoRefresh: {
    name: "Auto-Refresh",
    description: "Auto-refresh desktop search results",
    category: Category.FEATURES,
    exec() {
      autoRefresh();
    },
  },
};

export const extensionConfig = currentExtensionConfig_;
export const previousExtensionConfig = previousExtensionConfig_;
