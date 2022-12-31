import path from "path";
import { defineConfig, loadEnv, type Plugin } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import webExtension from "@samrum/vite-plugin-web-extension";
import zip from "./scripts/zipExtension";
import { ManifestV2, ManifestV3 } from "./src/manifest";
import pkg from "./package.json";

export default defineConfig(({ mode }) => {
  const configEnv = loadEnv(mode, process.cwd(), "");

  const manifest = configEnv.MANIFEST_VERSION === "3" ? ManifestV3 : ManifestV2;

  switch (mode) {
    case "chromium": {
      // @ts-ignore
      if (configEnv.EXTENSION_KEY) manifest.key = configEnv.EXTENSION_KEY;
      break;
    }
    case "firefox": {
      if (configEnv.EXTENSION_KEY)
        // @ts-ignore
        manifest.browser_specific_settings = {
          gecko: { id: configEnv.EXTENSION_KEY },
        };
      break;
    }
  }

  return {
    build: {
      outDir: `dist/${mode}`,
      chunkSizeWarningLimit: undefined,
      rollupOptions: {
        output: {
          assetFileNames: `[name].[ext]`,
          // assetFileNames: (assetInfo) => {
          //   if (
          //     assetInfo.name?.includes("background.css") ||
          //     assetInfo.name?.includes("serviceWorker.css")
          //   ) {
          //     return "dark.css";
          //   }
          //   return assetInfo.name!;
          // },
        },
      },
    },
    optimizeDeps: {
      exclude: ["svelte-navigator"],
    },
    plugins: [
      svelte(),
      webExtension({
        manifest: {
          author: pkg.author,
          description: pkg.description,
          name: pkg.displayName,
          version: pkg.version,
          ...manifest,
        },
      }),
      {
        ...zip({
          dir: `dist/${mode}`,
          outputName: `../${pkg.name}-${pkg.version}-${mode}`,
        }),
        apply: () => configEnv.zip !== undefined,
      } as Plugin,
    ],
    resolve: {
      alias: {
        $lib: path.resolve(__dirname, "./src/lib"),
        $styles: path.resolve(__dirname, "./src/styles"),
        "~": path.resolve(__dirname, "./src"),
      },
    },
  };
});
