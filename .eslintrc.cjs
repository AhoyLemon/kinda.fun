/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  // Never lint build output or generated/vendored trees. (The `lint` script also
  // passes --ignore-path .gitignore, but this keeps editor + any direct eslint
  // run consistent regardless.)
  ignorePatterns: ["dist/", ".output/", ".nuxt/", "node_modules/", "functions/lib/", "public/"],
  // The app runs in the browser; without this, `no-undef` fires on window,
  // document, console, etc. across src/ and app/ (node envs are set per-override
  // for scripts/tests/config below).
  env: {
    browser: true,
    es2021: true,
  },
  parser: "vue-eslint-parser",
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/eslint-config-prettier/skip-formatting"],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
    extraFileExtensions: [".vue"],
  },
  // Nuxt injects these composables/helpers as build-time auto-imports (they are
  // never explicitly imported), and Vue's reactivity APIs are auto-imported in
  // components too. Declare them as globals so `no-undef` matches what actually
  // resolves at build/runtime — keeping editor lint in sync with the Nuxt build.
  // (If we later adopt @nuxt/eslint, it generates this list automatically.)
  globals: {
    // Nuxt app / rendering
    defineNuxtConfig: "readonly",
    definePageMeta: "readonly",
    defineNuxtComponent: "readonly",
    defineNuxtPlugin: "readonly",
    defineNuxtRouteMiddleware: "readonly",
    useHead: "readonly",
    useHeadSafe: "readonly",
    useSeoMeta: "readonly",
    useServerSeoMeta: "readonly",
    // Local composable, auto-imported from app/composables/useGameHead.ts.
    useGameHead: "readonly",
    useRoute: "readonly",
    useRouter: "readonly",
    useRuntimeConfig: "readonly",
    useAppConfig: "readonly",
    useState: "readonly",
    useNuxtApp: "readonly",
    useNuxtData: "readonly",
    useCookie: "readonly",
    useRequestHeaders: "readonly",
    useRequestURL: "readonly",
    useError: "readonly",
    createError: "readonly",
    showError: "readonly",
    clearError: "readonly",
    useFetch: "readonly",
    useLazyFetch: "readonly",
    useAsyncData: "readonly",
    useLazyAsyncData: "readonly",
    refreshNuxtData: "readonly",
    navigateTo: "readonly",
    abortNavigation: "readonly",
    onNuxtReady: "readonly",
    // Vue reactivity / lifecycle (auto-imported in components)
    ref: "readonly",
    computed: "readonly",
    reactive: "readonly",
    readonly: "readonly",
    watch: "readonly",
    watchEffect: "readonly",
    toRef: "readonly",
    toRefs: "readonly",
    toValue: "readonly",
    unref: "readonly",
    isRef: "readonly",
    shallowRef: "readonly",
    nextTick: "readonly",
    provide: "readonly",
    inject: "readonly",
    onMounted: "readonly",
    onUnmounted: "readonly",
    onBeforeMount: "readonly",
    onBeforeUnmount: "readonly",
    onUpdated: "readonly",
    onActivated: "readonly",
    onDeactivated: "readonly",
    defineComponent: "readonly",
    defineAsyncComponent: "readonly",
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
      // Standalone TypeScript files parse with the TS parser directly (the
      // top-level parser is vue-eslint-parser, for .vue). The base
      // `no-unused-vars` rule is inaccurate for TS — it flags type-signature
      // parameter names (e.g. `shuffle: <T>(array: T[]) => T[]`) and type-only
      // imports as "unused" — so disable it here, matching the .vue treatment.
      // (Adopting @typescript-eslint/no-unused-vars later would restore accurate
      // unused detection without the false positives.)
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      rules: {
        "no-unused-vars": "off",
      },
    },
    {
      files: [
        "scripts/**/*.{js,ts,mjs}",
        "functions/**/*.js",
        "nuxt.config.ts",
        "*.config.{js,ts,mjs,cjs}",
        "tests/**/*.{js,ts}",
        "**/tests/**/*.{js,ts}",
        "**/*.spec.{js,ts}",
        "**/*.test.{js,ts}",
      ],
      env: {
        node: true,
      },
    },
    {
      files: ["src/views/guillotine/ts/parseFunctions.ts", "src/views/guillotine/ts/process.ts"],
      rules: {
        "no-duplicate-case": "off",
      },
    },
  ],
};
