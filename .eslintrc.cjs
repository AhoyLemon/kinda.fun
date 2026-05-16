/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/eslint-config-prettier/skip-formatting"],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
    extraFileExtensions: [".vue"],
  },
  overrides: [
    {
      files: ["**/*.vue"],
      rules: {
        // Many Vue views use external Pug templates, which can make setup symbols
        // appear unused to ESLint even when used in template bindings.
        "no-unused-vars": "off",
        "vue/multi-word-component-names": "off",
      },
    },
    {
      files: ["scripts/**/*.js", "functions/**/*.js", "tests/**/*.js", "vite.config.js"],
      env: {
        node: true,
      },
    },
  ],
};
