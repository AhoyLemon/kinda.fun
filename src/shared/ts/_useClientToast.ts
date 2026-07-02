import { useToast } from "vue-toastification";

/**
 * Client-only toast helper.
 *
 * Toasts come from the client-only `vue-toastification` plugin. During
 * prerender/SSR there is no toast plugin, so return a callable no-op stub so
 * any accidental call is harmless. The stub is a *function* (some games call
 * `toast(...)` directly) with the `success/error/info/warning` methods used
 * across the games attached, matching `ToastInterface`'s shape closely enough
 * for every call site and for the strictly-typed megachurch helpers.
 *
 * This replaces the guard that was copy-pasted into each game:
 *   const toast = import.meta.client ? useToast() : Object.assign(...);
 */
export function useClientToast() {
  return import.meta.client
    ? useToast()
    : Object.assign(() => {}, { success() {}, error() {}, info() {}, warning() {} });
}
