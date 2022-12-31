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

enum Category {
  APPEARANCE = "appearance",
  IMPROVEMENTS = "improvements",
  FEATURES = "features",
}
