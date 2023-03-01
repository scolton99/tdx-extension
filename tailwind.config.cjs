const plugin = require("tailwindcss/plugin");

module.exports = {
  theme: {
    extend: {
      colors: {
        purple: "#4e2a84",
        "purple-light": "#b6acd1",
        "purple-dark": "#3e226a",
        "purple-dark-hover": "#3e2369",
        dark: "#23212a",
      },
    },
  },
  content: ["./src/**/*.{html,js,svelte,ts}"],
  plugins: [require("@tailwindcss/typography")],
};
