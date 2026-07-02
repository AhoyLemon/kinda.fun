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
      files: ["scripts/**/*.js", "scripts/**/*.ts", "functions/**/*.js", "tests/**/*.js", "nuxt.config.ts"],
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
